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
  const reelRef = useRef<HTMLDivElement>(null);
  const backgroundVideoRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  const phrases = [
    "I AM MANTHAN",
    "Problem Solver",
    "Soft. Engineer",
    "Technospheric",
  ];

  useEffect(() => {
    // 1. GSAP Animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backgroundVideoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
      );

      gsap.fromTo(
        reelRef.current,
        { opacity: 0, x: 100, rotateY: -20 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          delay: 0.4,
          ease: "expo.out",
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power4.out" }
      );
    }, heroRef);

    // 2. Text Scrambler Logic with proper cleanup to fix the console error
    let isMounted = true;
    let scrambler: any = null;

    if (scrambleRef.current) {
      scrambler = new TextScrambler(scrambleRef.current);
      let index = 0;

      const cycle = async () => {
        while (isMounted) {
          await scrambler.setText(phrases[index]);
          await new Promise((r) => setTimeout(r, 2500));
          if (!isMounted) break;
          index = (index + 1) % phrases.length;
        }
      };
      cycle();
    }

    return () => {
      ctx.revert();
      isMounted = false;
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-4 md:px-8"
    >
      {/* --- BACKGROUND VIDEO (Wide Format) --- */}
      <div
        ref={backgroundVideoRef}
        className="absolute inset-10 md:inset-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden z-0 border border-white/10"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dam6bdpzg/video/upload/f_auto,q_auto/v1768933461/InShot_20260120_232759312_1_mslctz.mp4"
            type="video/mp4"
          />
        </video>
        {/* Deep Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
        {/* LEFT: CONTENT */}
        <div
          ref={textRef}
          className="flex-1 text-center lg:text-left space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white">
              <span
                ref={scrambleRef}
                className="inline-block text-primary min-h-[4.5rem]"
              />
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Software Engineer building innovative web applications with modern
              technologies and a focus on user experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link href="#projects">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/10"
              >
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT: THE REEL (9:16 Format) */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div
            ref={reelRef}
            className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[9/16] rounded-[2.5rem] md:rounded-[3.5rem] border-[8px] border-neutral-900 shadow-2xl overflow-hidden bg-neutral-950 group"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dam6bdpzg/video/upload/f_auto,q_auto/v1772786921/InShot_20260303_161625374_owlcmd.mp4"
                type="video/mp4"
              />
            </video>

            {/* Float-over Agency Tag */}
            <Link
              href="https://www.bettertechnify.com/"
              target="_blank"
              className="absolute bottom-6 right-0 left-0 px-4 z-20 group"
            >
              <div className="flex items-center justify-between gap-2 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl transition-all hover:bg-black/80">
                <div className="flex flex-col">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none mb-1">
                    Agency
                  </span>
                  <span className="text-sm font-bold text-white leading-none">
                    Better Technify
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bounce Arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <ArrowDown className="h-6 w-6 text-white/30" />
      </div>
    </div>
  );
}
// src="https://res.cloudinary.com/dam6bdpzg/video/upload/f_auto,q_auto/v1766150379/portfolio1_vhijcw.mp4"
