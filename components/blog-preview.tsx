"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedPosts } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function BlogPreview() {
  const featuredPosts = getFeaturedPosts().slice(0, 2);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const children = containerRef.current?.children;
      if (children) {
        gsap.fromTo(
          gsap.utils.toArray(children),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {featuredPosts.map((post) => {
        // FIXED: Clean the image URL by removing anything after '?'
        const cleanImage = post.coverImage?.split("?")[0] || "/placeholder.svg";

        return (
          <Card
            key={post.id}
            className="overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full opacity-0"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={cleanImage} // Using the sanitized URL here
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <Badge className="absolute top-4 left-4 z-10">
                {post.category}
              </Badge>
            </div>

            <CardContent className="pt-6 flex-grow">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>

            <CardFooter>
              {post.externalUrl ? (
                <Button asChild variant="outline" className="w-full group">
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read on External Site
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              ) : (
                <Button asChild className="w-full group">
                  {/* FIXED: Removed leading "/" so it goes to external site properly */}
                  <Link
                    href="https://medium.com/@manthan.jsharma"
                    target="_blank"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
