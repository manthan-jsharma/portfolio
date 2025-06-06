import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Extended project data for the projects page
const projects = [
  {
    id: 1,
    title: "Ed Tech Platform",
    description:
      "A full-stack edTech solution with Credit Buissness Logic, Schedule Management(Calendly), State management, Peer to peer Connect(Meet-Api), Search Filters.",
    longDescription:
      "This comprehensive edTech platform features user authentication, Dashboard for Management for Both Student and Teacher, Courses Form, Session Booking, Availability Selection, The application is built with Next.js for server-side rendering and optimized performance.",
    image: "/Edtech.png",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Google API",
      "PostgresSql",
      "Calendly API",
      "Redux",
    ],
    demoUrl: "https://www.teachyourpeer.com/",
    githubUrl: "https://github.com/yourusername/project",
  },
  {
    id: 2,
    title: "Smile Match Ai",
    description:
      "An Ai-Based Teeth analysis/Face Analysis, Dental Routine/Veneer Recommendation System With Report generation, Email to Doctor, Appointment Booking, integrated Dental Simulator with(Models: Overbite/Crossbite/Underbite and Treatments: Invisalign/veneers) .",
    longDescription:
      "This fitness application helps users track their Dental Routine , set Recommendations , monitoing and feedback With Doctor. It includes features like Email to Doctor, Dental Simulator, Veneer Recommendation, and Dental Journey Blogs. The app is built with Next,Prisma,Nodemailer, Calendly, Nanoid, Three.js, Computer Vision, Vortex Ai.",
    image: "/dental.png?height=600&width=800",
    tags: [
      "Next.js",
      "Next-auth.js",
      "Three.js",
      "Computer vision Apis",
      "Nodemailer",
    ],
    demoUrl: "https://www.loom.com/share/7fe991a520ef4e239896bba3c9ed5ce1",
    githubUrl: "https://github.com/manthan-jsharma/SmileMatch-ai",
  },
  {
    id: 3,
    title: "Travel-Itinarary-Recommendations and Browsing",
    description: "An MCP Powered Website that recommends Travel Itineraries.",
    longDescription:
      "User can filter out Itinaray based on Accomodation, Transport, Budget, Region. User can Created a personalized Itiranary, Store it and find with Filters, MCP server Recommends Suitable Itinarary, with Preferences, Budget, Number of nights Filters",
    image: "/itinerary.png?height=600&width=800",
    tags: ["Next.js", "FastAPi", "MCP Server", "SQLALCHEMY", "Alembic"],
    demoUrl: "https://www.loom.com/share/d3f3e78893f048ee8a5b753eb6fa5cec",
    githubUrl: "https://github.com/manthan-jsharma/itinerary-backend",
  },

  {
    id: 4,
    title: "Multilingual-AI-Note-Taking",
    description:
      "A Multilingual AI Agent That joins and Provides Note Formats for the meetings .",
    longDescription:
      "The AI Agent is made using Langchain LLM, Qwen, Whisper. It Generates Transcription, SUmmarization and Action Points woth Multilingual Support",
    image: "/note.png?height=600&width=800",
    tags: ["React", "LangChain", "Whisper", "SQLALCHEMY", "Python"],
    demoUrl: "https://holon-landing.vercel.app/",
    githubUrl: "https://github.com/manthan-jsharma/Holon-AI-Backend",
  },

  {
    id: 5,
    title: "Contest Tracker",
    description:
      "A Live Contest Tracker App that fetches Live, Past, and Upcoming Contests from Leetcode, Codechef, CodeForces.  .",
    longDescription:
      " manages live contests at Leetcode/ Codeforces and also fetches solution vidoes from youtube.",
    image: "/image/contesttracker.png?height=600&width=800",
    tags: ["React", "GRaphQL", "Youtube Data 3 API", "MongoDb"],
    demoUrl: "https://example.com",
    githubUrl:
      "https://github.com/manthan-jsharma/Coding-Contest-Tracker-Frontend",
  },

  {
    id: 6,
    title: "AI Content Generator",
    description:
      "An AI-powered application that generates content based on user prompts.",
    longDescription:
      "Using google authentication and Leveraging Google Speech to Text Api, this application helps users generate various types of content from blog posts to marketing copy, Allows multiple language support. It includes features like content history, export options, and customization settings to fine-tune the AI's output to match specific tones and styles.",
    image: "/Aicaption.png?height=600&width=800",
    tags: ["Next", "Node.js", "OpenAI", "Express"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/manthan-jsharma/AI-Captions-Generator",
  },
  {
    id: 7,
    title: "Hacker-x",
    description: "A Landing Page for The Worlds Largest Hackakthon",
    longDescription:
      "this website showcases animations using Three.js, CanvasElement, Gsap, Scrolltrigger, Showcases Amazing Experience with Home, About, Prizes, Judges, Sponsor section",
    image: "/hackerx.png?height=600&width=800",
    tags: ["NEXT.js", "WEBGL", "Tailwind CSS", "Three.js", "Gsap"],
    demoUrl: "https://hacker-x-pi.vercel.app/",
    githubUrl: "https://github.com/yourusername/project",
  },

  {
    id: 8,
    title: "Social Media Dashboard",
    description:
      "A dashboard to manage and analyze social media accounts and campaigns.",
    longDescription:
      "This dashboard allows users to manage multiple social media accounts in one place. It provides analytics on post performance, audience engagement, and growth trends. The application integrates with various social media APIs to fetch and display real-time data.",
    image: "/socialmedia.png?height=600&width=800",
    tags: ["React", "Node.js", "Express", "Chart.js", "Social Media APIs"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/manthan-jsharma/Social-Media-Manager",
  },
  {
    id: 9,
    title: "Solana-Wallet-Minting",
    description:
      "A dashboard to manage and visualize Solana accounts, Token mintings, Token sending and Transaction History.",
    longDescription:
      "Multi-Asset Support, Token Creation, Transaction History, User-Friendly Interface",
    image: "/Solana.png?height=600&width=800",
    tags: [
      ,
      "Node.js",
      "Solana-Wallets",
      "Keypair-Secret",
      "Phantom/SolfWare",
      "BlockChain",
    ],
    demoUrl:
      "https://www.loom.com/share/289cf74591b24e0d92ca7d6549512b19?sid=0c449d0a-d304-4a23-8b85-0d90c7c9ae91",
    githubUrl: "https://github.com/manthan-jsharma/Social-Media-Manager",
  },

  {
    id: 10,
    title: "AirBnb Listing Scraper",
    description:
      "AirBnb Listing Data Scraper, Scrapi(spider),Next,Django(python),Mysql .",

    image: "/image/Airbnb.png?height=600&width=800",

    tags: ["Next.js", "Scrapy", "Django", "Spider"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/manthan-jsharma/Airbnb-Scraper-Frontend",
  },
];

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container px-4 mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-4xl font-bold tracking-tight">All Projects</h1>
          <p className="mt-4 text-muted-foreground max-w-[700px]">
            A comprehensive collection of my work, showcasing various
            technologies and problem-solving approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="h-full flex flex-col hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">
                  {project.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
