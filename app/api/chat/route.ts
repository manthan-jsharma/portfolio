import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { CohereEmbeddings } from "@langchain/cohere";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  streamText,
  LanguageModel,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { toUIMessageStream } from "@ai-sdk/langchain";
const prompt = PromptTemplate.fromTemplate(`
You are a professional AI assistant representing the owner of this portfolio.
Answer the user's question based ONLY on the following context, Context Talks about his Work Experience with Adda 247 Co-Founder, Internship at Oddly AI and Freelancing Work about.
Be friendly, professional, and concise. If the context doesn't have the answer, say so.

Context:
{context}

Question:
{question}
`);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const googleApiKey = process.env.GEMINI_API_KEY;
const cohereApiKey = process.env.COHERE_API_KEY;

if (!supabaseUrl || !supabaseKey || !googleApiKey || !cohereApiKey) {
  console.error("API Route Error: Missing environment variables");
  throw new Error("Missing environment variables");
}

const client = createClient(supabaseUrl, supabaseKey);

const embeddings = new CohereEmbeddings({
  apiKey: cohereApiKey,
  model: "embed-english-v3.0",
});
const llm = new ChatGoogleGenerativeAI({
  apiKey: googleApiKey,
  model: "gemini-2.5-flash-lite",
  temperature: 0,
});

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});
const retriever = vectorStore.asRetriever();

const chain = RunnableSequence.from([
  {
    context: (input) => retriever.invoke(input.question),
    question: (input) => input.question,
  },
  (prevStep) => ({
    context: prevStep.context
      .map((doc: any) => doc.pageContent)
      .join("\n\n---\n\n"),
    question: prevStep.question,
  }),
  prompt,
  llm,
  new StringOutputParser(),
]);

export async function POST(req: any) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const ragModel: LanguageModel = {
      specificationVersion: "v2",
      provider: "custom",
      modelId: "my-rag-chain",

      supportedUrls: {},

      doGenerate: async () => {
        throw new Error(
          "doGenerate not implemented for this custom RAG model."
        );
      },

      doStream: async (options) => {
        const modelMessages = options.prompt;

        const lastUserMessage = [...modelMessages]
          .reverse()
          .find((msg) => msg.role === "user");

        let userQuestion = "No user question found";

        if (lastUserMessage) {
          if (typeof lastUserMessage.content === "string") {
            userQuestion = lastUserMessage.content;
          } else {
            const textPart = lastUserMessage.content.find(
              (part) => part.type === "text"
            );
            if (textPart && "text" in textPart) {
              userQuestion = textPart.text;
            }
          }
        }
        const stream = await chain.stream({
          question: userQuestion,
        });

        const uiMessageStream = toUIMessageStream(stream);

        return {
          stream: uiMessageStream,
        } as unknown as { stream: ReadableStream<any> };
      },
    };

    const result = streamText({
      model: ragModel,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error: Could not process chat.", {
      status: 500,
    });
  }
}
