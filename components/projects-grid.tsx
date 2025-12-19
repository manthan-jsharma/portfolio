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
    // FIXED: Removed query string (?height=...)
    image: "/image/Bookmark.png",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
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
    // FIXED: Removed query string
    image: "/dental.png",
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
    title: "Contest Tracker and solutions",
    description:
      "manages live contests at Leetcode/Codeforces and also fetches solution vidoes from youtube.",
    // FIXED: Removed query string
    image: "/image/contesttracker.png",
    tags: ["Vue.js", "Firebase", "Tailwind CSS", "Chart.js"],
    demoUrl: "https://example.com",
    githubUrl:
      "https://github.com/manthan-jsharma/Coding-Contest-Tracker-Frontend",
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
