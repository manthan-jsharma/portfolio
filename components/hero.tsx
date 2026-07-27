"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { TextScrambler } from "@/lib/scrambler";
import Skills from "@/components/skills";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "I AM MANTHAN",
    "Problem Solver",
    "Soft. Engineer",
    "Technospheric",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reel Mockup entrance (Slide up on mobile, slide in on desktop)
      gsap.fromTo(
        reelRef.current,
        { opacity: 0, y: 50, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          delay: 0.4,
          ease: "expo.out",
        }
      );

      // Text and Button entrance
      gsap.fromTo(
        [textRef.current, buttonRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
          stagger: 0.2,
          ease: "power4.out",
        }
      );

      // Subtle "breathing" animation for the button
      gsap.to(buttonRef.current, {
        y: "-=6",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

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
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-black px-6 md:px-8 pt-28 pb-16 md:pt-0 md:pb-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.04),transparent_50%)]" />

      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
        {/* LEFT: CONTENT (Adjusted spacing for mobile) */}
        <div
          ref={textRef}
          className="flex-1 text-center lg:text-left space-y-8 w-full"
        >
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white">
              <span
                ref={scrambleRef}
                className="inline-block text-primary min-h-[4.5rem]"
              />
            </h1>
            <p className="text-base md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 md:px-0">
              Software Engineer building innovative web applications with modern
              technologies and a focus on user experience.
            </p>
          </div>

          <Skills />

          <div ref={buttonRef} className="flex justify-center lg:justify-start pt-2">
            <Link href="#projects" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-white/50 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
              <Button
                size="lg"
                className="relative flex items-center gap-3 rounded-full bg-white px-8 py-7 md:px-10 md:py-8 text-base md:text-lg font-bold text-black hover:bg-neutral-100 transition-all shadow-2xl"
              >
                View My Work
                <div className="relative overflow-hidden h-5 w-5">
                  <ArrowDown className="h-5 w-5 transition-transform duration-500 group-hover:translate-y-full" />
                  <ArrowDown className="absolute inset-0 h-5 w-5 -translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-primary" />
                </div>
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT: THE REEL (Visible on all, main focus on mobile) */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div
            ref={reelRef}
            className="relative w-full max-w-[260px] sm:max-w-[320px] aspect-[9/16] rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[8px] border-neutral-900 shadow-2xl overflow-hidden bg-neutral-950 group"
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
              <div className="flex items-center justify-between gap-2 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl transition-all hover:bg-black/80">
                <div className="flex flex-col">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none mb-1">
                    Agency
                  </span>
                  <span className="text-xs md:text-sm font-bold text-white leading-none">
                    Better Technify
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white/50 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bounce Arrow: Hidden on mobile to save space */}
      <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 opacity-30">
        <ArrowDown className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}
// src="https://res.cloudinary.com/dam6bdpzg/video/upload/f_auto,q_auto/v1766150379/portfolio1_vhijcw.mp4"
