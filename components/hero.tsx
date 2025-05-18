// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";
// import { ArrowDown } from "lucide-react";
// import { gsap } from "gsap";
// import { Button } from "@/components/ui/button";

// export default function Hero() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Initial animation for the hero section
//       gsap.fromTo(
//         textRef.current,
//         { opacity: 0, y: 100 },
//         { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
//       );

//       // Button animation
//       gsap.fromTo(
//         buttonRef.current,
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
//       );

//       // Background gradient animation
//       gsap.to(heroRef.current, {
//         backgroundPosition: "100% 100%",
//         duration: 15,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });
//     }, heroRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={heroRef}
//       className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 bg-[length:200%_200%] bg-[0%_0%]"
//     >
//       <div className="container px-4 py-32 mx-auto">
//         <div ref={textRef} className="max-w-3xl mx-auto text-center space-y-6">
//           <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
//             <span className="block">Creative Developer</span>
//             <span className="block text-primary mt-2">
//               Crafting Digital Experiences
//             </span>
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             I am a Freelance Developer building innovative web applications with
//             modern technologies and a focus on user experience.
//           </p>
//         </div>
//         <div ref={buttonRef} className="mt-12 flex justify-center">
//           <Link href="#projects">
//             <Button size="lg" className="group">
//               View My Work
//               <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
//             </Button>
//           </Link>
//         </div>
//       </div>

//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
//         <ArrowDown className="h-6 w-6 text-muted-foreground" />
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { TextScrambler } from "@/lib/scrambler";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  const phrases = [
    "HI, I AM MANTHAN",
    "A Freelance Developer",
    "A Problem Solver",
    "A Software Developer",
    "A Technospheric",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
      );

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
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 bg-[length:200%_200%] bg-[0%_0%]"
    >
      <div className="container px-4 py-32 mx-auto">
        <div ref={textRef} className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">
              <span
                ref={scrambleRef}
                className="inline-block text-primary min-h-[2.5rem]"
              />
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I am a Freelance Developer building innovative web applications with
            modern technologies and a focus on user experience.
          </p>
        </div>
        <div ref={buttonRef} className="mt-12 flex justify-center">
          <Link href="#projects">
            <Button size="lg" className="group">
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </div>
  );
}
