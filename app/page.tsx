import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/hero";
import ProjectsGrid from "@/components/projects-grid";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <div className="container px-4 py-24 mx-auto" id="projects">
        <div className="flex flex-col items-start gap-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-[700px]">
            Check out some of my recent work. Each project showcases different
            skills and technologies.
          </p>
        </div>
        <ProjectsGrid />
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <Contact />
    </main>
  );
}
