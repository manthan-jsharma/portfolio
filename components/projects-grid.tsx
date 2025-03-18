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
    title: "Ed Tech platform",
    description:
      "A full-stack e-commerce solution with payment processing and inventory management.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
  },
  {
    id: 2,
    title: "AirBnb Listing Scraper",
    description:
      "An AI-powered application that generates content based on user prompts.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "OpenAI", "Express"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
  },
  {
    id: 3,
    title: "Contest Tracker and solutions",
    description:
      "manages live contests at Leetcode/Codeforces and also fetches solution vidoes from youtube.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "Firebase", "Tailwind CSS", "Chart.js"],
    demoUrl: "https://example.com",
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
                  Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
