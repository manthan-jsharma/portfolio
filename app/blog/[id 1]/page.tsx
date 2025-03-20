"use client";

import { useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPostById, getRecentPosts } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";

export default function BlogPostPage() {
  const params = useParams<{ id: string }>();
  const post = getPostById(params.id);
  const relatedPosts = getRecentPosts(3).filter((p) => p.id !== params.id);

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Content animation with scroll trigger
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      // Related posts animation
      if (relatedRef.current) {
        gsap.fromTo(
          relatedRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return notFound();
  }

  // If it's an external post, redirect to the external URL
  if (post.externalUrl) {
    if (typeof window !== "undefined") {
      window.location.href = post.externalUrl;
    }
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col pt-24 pb-12">
      <div className="container px-4 mx-auto max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <div ref={headerRef} className="mb-8 opacity-0">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="relative h-[400px] w-full overflow-hidden rounded-lg mb-12">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div
          ref={contentRef}
          className="prose prose-lg dark:prose-invert max-w-none opacity-0"
        >
          <Markdown>{post.content}</Markdown>
        </div>

        <div className="flex justify-center mt-12 mb-16">
          <Button variant="outline" className="group">
            <Share2 className="mr-2 h-4 w-4" />
            Share this article
          </Button>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div
              ref={relatedRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={relatedPost.coverImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <CardContent className="pt-4">
                    <Badge variant="outline" className="mb-2">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.id}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
