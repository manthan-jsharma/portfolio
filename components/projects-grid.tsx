"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample project data
const projects = [
  {
    id: 1,
    title: "AI Sales Saas",
    description:
      "AI-powered sales automation platform that researches prospects, generates personalized outreach, provides real-time call coaching, and automates post-call workflows from prospecting to contract delivery",
    // FIXED: Removed query string (?height=...)
    image: "/image/Alphasales.png",
    tags: ["Node.js", "FastAPI", "Stripe", "Supabase"],
    demoUrl: "https://alphasalessaas.live/",
    githubUrl: "https://github.com/yourusername/project",
  },

  {
    id: 2,
    title: "Empire-Credit AI (Autonomous credit execution)",
    description:
      "Desktop-native credit automation software that bypasses web-based bot detection by injecting directly into browser DOM to autofill loan applications, featuring 150+ premium lender API integrations and advanced liquidity forecasting tools",
    // FIXED: Removed query string (?height=...)
    image: "/image/credit empire.png",
    tags: ["Express.js", "SOC2", "Stripe", "postgresSQL"],
    demoUrl: "https://empirecreditai.business/",
    githubUrl: "https://github.com/yourusername/project",
  },

  {
    id: 3,
    title: "Ed Tech platform",
    description:
      "An Ai-Based Teeth analysis/Face Analysis, Dental Routine/Veneer Recommendation System With Report generation, Email to Doctor, Appointment Booking, integrated Dental Simulator with(Models: Overbite/Crossbite/Underbite and Treatments: Invisalign/veneers).",
    // FIXED: Removed query string (?height=...)
    image: "/dental.png",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    demoUrl: "https://www.teachyourpeer.com/",
    githubUrl: "https://github.com/yourusername/project",
  },
];

export default function ProjectsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate each card when it comes into view
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => {
            if (el) {
              cardsRef.current[index] = el;
            }
          }}
          className="opacity-0"
        >
          <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
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
                  Live URL
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
