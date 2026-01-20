"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { TextScrambler } from "@/lib/scrambler";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  const phrases = [
    "HI, I AM MANTHAN",
    "A Problem Solver",
    "A Software Developer",
    "A Technospheric",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // 2. Button Animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
      );

      // 3. New Video Player Animation
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.out",
        }
      );

      // 4. Background Animation
      gsap.to(heroRef.current, {
        backgroundPosition: "100% 100%",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!scrambleRef.current) return;

    const scrambler = new TextScrambler(scrambleRef.current);
    let index = 0;

    const cycle = async () => {
      while (true) {
        await scrambler.setText(phrases[index]);
        await new Promise((r) => setTimeout(r, 2000));
        index = (index + 1) % phrases.length;
      }
    };

    cycle();
  });

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/dam6bdpzg/video/upload/f_auto,q_auto/v1766150379/portfolio1_vhijcw.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
      <div className="container relative z-10 px-4 py-32 mx-auto">
        <div ref={textRef} className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-lg">
            <span className="block">
              <span
                ref={scrambleRef}
                className="inline-block text-primary min-h-[2.5rem]"
              />
            </span>
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-md font-medium">
            I am a Software Engineer building innovative web applications with
            modern technologies and a focus on user experience.
          </p>
        </div>

        <div ref={buttonRef} className="mt-12 flex justify-center">
          <Link href="#projects">
            <Button size="lg" className="group shadow-xl border-white/10">
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </Link>
        </div>
        <div
          ref={videoRef}
          className="mt-10 mx-auto max-w-xs sm:max-w-sm md:max-w-md rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/40 backdrop-blur-md relative group"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover"
          >
            <source
              src="https://res.cloudinary.com/dam6bdpzg/video/upload/f_auto,q_auto/v1768933461/InShot_20260120_232759312_1_mslctz.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <Link
            href="https://www.bettertechnify.com/"
            target="_blank"
            className="absolute bottom-0 right-0 z-20 
                       flex items-center gap-2 pl-4 pr-3 py-1.5
                       bg-neutral-900/90 backdrop-blur-xl 
                       border-t border-l border-white/10
                       rounded-tl-2xl
                       transition-all duration-300 ease-out
                       hover:bg-neutral-800 hover:border-primary/50"
          >
            <div className="flex flex-col items-end">
              <span className="text-[8px] uppercase text-gray-400 font-bold tracking-widest leading-none mb-0.5 group-hover:text-primary transition-colors">
                Agency
              </span>
              <span className="text-xs font-bold text-white leading-none whitespace-nowrap group-hover:text-primary transition-colors">
                Better Technify
              </span>
            </div>

            <ExternalLink className="w-3 h-3 text-white opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="h-6 w-6 text-white drop-shadow-md" />
      </div>
    </div>
  );
}
