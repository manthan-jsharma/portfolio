"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { useState, useEffect } from "react";
import { Bot, Send, X, User, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState<string>("");

  const [showCallout, setShowCallout] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowCallout(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setShowCallout(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });

    setInput("");
  };

  const getMessageText = (m: UIMessage): string => {
    const parts = (m as any).parts ?? [];
    return parts
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showCallout && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg"
          >
            <p className="font-semibold text-sm">
              Ask me about Manthan's work!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.2,
            }}
            className="flex flex-col w-[350px] h-[60vh] max-h-[700px] bg-black bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400">
              <div className="flex items-center gap-2">
                <Bot className="text-white" size={20} />
                <h3 className="font-bold text-lg text-white">
                  Manthan's AI Agent
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow flex flex-col-reverse p-4 space-y-4 space-y-reverse overflow-y-auto">
              {[...(messages as UIMessage[])].reverse().map((m: UIMessage) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={(m as any).id}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role !== "user" && (
                    <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[75%] ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-lg"
                        : "bg-gray-800 text-white rounded-bl-lg"
                    }`}
                  >
                    <span className="text-sm whitespace-pre-wrap">
                      {getMessageText(m)}
                    </span>
                  </div>

                  {m.role === "user" && (
                    <div className="flex-shrink-0 p-2 bg-gray-600 rounded-full">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-white/10"
            >
              <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                <input
                  className="flex-grow p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  value={input}
                  placeholder="Ask anything about me..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput(e.target.value)
                  }
                />
                <button
                  type="submit"
                  className="p-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600"
                  disabled={!input.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by Manthan Custom Model.{" "}
                <CornerDownLeft size={10} className="inline" /> to send.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        animate={{
          boxShadow: [
            "0 0 0 0px rgba(96, 165, 250, 0.5)",
            "0 0 0 15px rgba(96, 165, 250, 0)",
          ],
        }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 text-white rounded-full shadow-2xl"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "x" : "bot"}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <Bot size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
