// import GitHubContributions from "@/components/Github-Contributions";

// export default function GitHubPage() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-start px-4 py-24">
//       <h1 className="text-4xl font-bold mb-8 text-center">
//         GitHub Contributions
//       </h1>
//       <GitHubContributions />
//     </main>
//   );
// }
// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import GitHubContributions from "@/components/Github-Contributions";

// gsap.registerPlugin(ScrollTrigger);

// export default function ElegantGitHubPage() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const textRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Helper to add refs to array
//   const addToTextRefs = (el: HTMLDivElement | null) => {
//     if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
//   };

//   useEffect(() => {
//     if (
//       !containerRef.current ||
//       !cardRef.current ||
//       textRefs.current.length === 0
//     )
//       return;

//     const ctx = gsap.context(() => {
//       // === Background layered gradient fade + slow vertical parallax ===
//       gsap.to(containerRef.current, {
//         backgroundPosition: "50% 80%",
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: 0.8,
//         },
//       });

//       // === Elegant staggered fade/slide/skew text reveal ===
//       gsap.fromTo(
//         textRefs.current,
//         {
//           opacity: 0,
//           y: 60,
//           skewY: 8,
//           filter: "blur(4px)",
//         },
//         {
//           opacity: 1,
//           y: 0,
//           skewY: 0,
//           filter: "blur(0)",
//           duration: 1,
//           ease: "power3.out",
//           stagger: 0.4,
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top 85%",
//             end: "top 60%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );

//       // === Card initial tilt away & float ===
//       gsap.set(cardRef.current, {
//         rotationX: 30,
//         rotationY: -10,
//         scale: 0.9,
//         z: -100,
//         transformOrigin: "center center",
//         filter: "drop-shadow(0 0 15px rgba(0,0,0,0.15))",
//       });

//       // Smooth tilt and float with scroll progress
//       let rotateXQuick = gsap.quickSetter(cardRef.current, "rotationX", "deg");
//       let rotateYQuick = gsap.quickSetter(cardRef.current, "rotationY", "deg");
//       let scaleXQuick = gsap.quickSetter(cardRef.current, "scaleX");
//       let scaleYQuick = gsap.quickSetter(cardRef.current, "scaleY");
//       let zQuick = gsap.quickSetter(cardRef.current, "translateZ", "px");

//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top center",
//         end: "bottom center",
//         scrub: 1.2,
//         onUpdate: (self) => {
//           const progress = self.progress;

//           rotateXQuick(30 - 30 * progress);
//           rotateYQuick(-10 + 10 * progress);

//           const scaleValue = 0.9 + 0.1 * progress;
//           scaleXQuick(scaleValue);
//           scaleYQuick(scaleValue);

//           zQuick(-100 + 100 * progress);
//         },
//       });

//       // Subtle glowing pulse on the card repeatedly
//       gsap.to(cardRef.current, {
//         filter: "drop-shadow(0 0 30px rgba(255,255,255,0.15))",
//         duration: 2.5,
//         yoyo: true,
//         repeat: -1,
//         ease: "sine.inOut",
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <main
//       ref={containerRef}
//       className="relative min-h-screen bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] bg-[length:200%_200%] overflow-x-hidden px-6 py-32 flex flex-col items-center justify-center text-white"
//     >
//       {/* Multiple text sections for storytelling */}
//       <div className="max-w-4xl space-y-16 text-center mb-32">
//         <div
//           ref={addToTextRefs}
//           className="text-4xl font-extrabold tracking-wide leading-tight drop-shadow-lg"
//         >
//           Discover My GitHub Journey
//         </div>
//         <div
//           ref={addToTextRefs}
//           className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed"
//         >
//           Every commit, pull request, and issue tells a story. My open source
//           contributions span multiple projects across various technologies.
//         </div>
//         <div
//           ref={addToTextRefs}
//           className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed"
//         >
//           Scroll down to experience a dynamic visualization of my coding
//           activity — rich with detail and full of passion.
//         </div>
//       </div>

//       {/* Tilted & animated GitHub Contribution Card */}
//       <div
//         ref={cardRef}
//         className="relative max-w-6xl w-full rounded-3xl bg-black bg-opacity-80 backdrop-blur-md p-12 shadow-2xl cursor-default"
//         style={{ perspective: 1300 }}
//       >
//         <GitHubContributions />
//       </div>
//     </main>
//   );
// }
// app/github/page.tsx

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import GitHubContributions from "@/components/Github-Contributions";

// gsap.registerPlugin(ScrollTrigger);

// export default function ElegantGitHubPage() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const pinSectionRef = useRef<HTMLDivElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (
//       !containerRef.current ||
//       !titleRef.current ||
//       !cardRef.current ||
//       !pinSectionRef.current
//     )
//       return;

//     const ctx = gsap.context(() => {
//       // Zoom and fade out the title massively while pinning it
//       gsap.to(titleRef.current, {
//         scale: 35,
//         autoAlpha: 0,
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "+=2000",
//           scrub: true,
//           pin: titleRef.current,
//           anticipatePin: 1,
//         },
//       });

//       // Pin the card section right after the title zoom ends
//       ScrollTrigger.create({
//         trigger: pinSectionRef.current,
//         start: "top top+=2000", // starts right after title zoom end
//         end: "+=1500",
//         pin: true,
//         anticipatePin: 1,
//       });

//       // Fade and scale in the card inside pinned section (no vertical movement)
//       gsap.fromTo(
//         cardRef.current,
//         { scale: 0.6, autoAlpha: 0 },
//         {
//           scale: 1,
//           autoAlpha: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: pinSectionRef.current,
//             start: "top top+=2100", // fade-in starts just after pin starts
//             end: "top top+=2300",
//             scrub: true,
//           },
//         }
//       );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <main
//       ref={containerRef}
//       className="relative min-h-[600vh] bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden text-white"
//     >
//       {/* Zoom Title pinned */}
//       <div className="h-screen flex items-center justify-center sticky top-0 z-10 pointer-events-none">
//         <div
//           ref={titleRef}
//           className="text-[3rem] md:text-[5rem] font-black text-white text-center leading-tight"
//         >
//           Discover My GitHub Journey
//         </div>
//       </div>

//       {/* Pin section for GitHub card */}
//       <div
//         ref={pinSectionRef}
//         className="h-screen flex items-center justify-center relative z-0 pointer-events-auto"
//       >
//         <div
//           ref={cardRef}
//           className="max-w-4xl w-full rounded-2xl bg-black bg-opacity-80 backdrop-blur-md p-12 shadow-2xl opacity-0 scale-75"
//         >
//           <GitHubContributions />
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import GitHubContributions from "@/components/Github-Contributions";

// gsap.registerPlugin(ScrollTrigger);

// export default function ElegantGitHubPage() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const pinSectionRef = useRef<HTMLDivElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const textRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Helper to add refs for text lines
//   const addToTextRefs = (el: HTMLDivElement | null) => {
//     if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
//   };

//   useEffect(() => {
//     if (
//       !containerRef.current ||
//       !titleRef.current ||
//       !cardRef.current ||
//       !pinSectionRef.current
//     )
//       return;

//     const ctx = gsap.context(() => {
//       // Zoom and fade out title, pin it
//       gsap.to(titleRef.current, {
//         scale: 35,
//         autoAlpha: 0,
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "+=2000",
//           scrub: true,
//           pin: titleRef.current,
//           anticipatePin: 1,
//         },
//       });

//       // Pin the whole section (card + texts)
//       ScrollTrigger.create({
//         trigger: pinSectionRef.current,
//         start: "top top+=2000",
//         end: "+=2000", // total scroll length for pinned section
//         pin: true,
//         pinSpacing: false, // no extra scroll space below pinned section
//         anticipatePin: 1,
//       });

//       // Fix card in center during pinned section scroll
//       ScrollTrigger.create({
//         trigger: pinSectionRef.current,
//         start: "top top+=2000",
//         end: "bottom top+=2000",
//         onEnter: () =>
//           gsap.set(cardRef.current, {
//             position: "fixed",
//             top: "20vh",
//             left: "50%",
//             xPercent: -50,
//             zIndex: 100,
//           }),
//         onLeaveBack: () =>
//           gsap.set(cardRef.current, {
//             position: "relative",
//             top: 0,
//             left: 0,
//             xPercent: 0,
//             zIndex: 10,
//           }),
//       });

//       // Fade & scale in card at start of pinned section
//       gsap.fromTo(
//         cardRef.current,
//         { scale: 0.75, autoAlpha: 0 },
//         {
//           scale: 1,
//           autoAlpha: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: pinSectionRef.current,
//             start: "top top+=2000",
//             end: "top top+=2200",
//             scrub: true,
//           },
//         }
//       );

//       // Sequential fade-in for each text line (with staggered scroll starts)
//       textRefs.current.forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { autoAlpha: 0, y: 30 },
//           {
//             autoAlpha: 1,
//             y: 0,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: pinSectionRef.current,
//               start: `top+=${2200 + i * 250} top`,
//               end: `top+=${2400 + i * 250} top`,
//               scrub: true,
//             },
//           }
//         );
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <main
//       ref={containerRef}
//       className="relative min-h-[700vh] bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-x-hidden text-white"
//     >
//       {/* Zoom Title */}
//       <div className="h-screen flex items-center justify-center sticky top-0 z-30 pointer-events-none">
//         <div
//           ref={titleRef}
//           className="text-[3rem] md:text-[5rem] font-black text-white text-center leading-tight"
//         >
//           Discover My GitHub Journey
//         </div>
//       </div>

//       {/* Pinned section: card + text lines */}
//       <section
//         ref={pinSectionRef}
//         className="relative max-w-4xl mx-auto flex flex-col items-center justify-start pt-20 gap-20 px-6"
//         style={{ minHeight: "150vh" }} // enough height for text fade scroll inside pinned section
//       >
//         {/* Card that gets fixed in viewport */}
//         <div
//           ref={cardRef}
//           className="w-full rounded-2xl bg-black bg-opacity-80 backdrop-blur-md p-12 shadow-2xl opacity-0 scale-75"
//         >
//           <GitHubContributions />
//         </div>

//         {/* Text lines stacked below card */}
//         <div className="flex flex-col items-center space-y-16 text-center w-full max-w-xl">
//           <div
//             ref={addToTextRefs}
//             className="text-xl md:text-2xl text-zinc-300 font-semibold opacity-0"
//           >
//             Every commit is a step towards innovation.
//           </div>
//           <div
//             ref={addToTextRefs}
//             className="text-xl md:text-2xl text-zinc-300 font-semibold opacity-0"
//           >
//             Collaborating and contributing fuels growth.
//           </div>
//           <div
//             ref={addToTextRefs}
//             className="text-xl md:text-2xl text-zinc-300 font-semibold opacity-0"
//           >
//             Open source is the heartbeat of progress.
//           </div>
//           <div
//             ref={addToTextRefs}
//             className="text-xl md:text-2xl text-zinc-300 font-semibold opacity-0"
//           >
//             Consistency builds mastery, one pull request at a time.
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GitHubContributions from "@/components/Github-Contributions";

gsap.registerPlugin(ScrollTrigger);

export default function ElegantGitHubPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !cardRef.current ||
      !pinSectionRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Zoom in the title massively
      gsap.to(titleRef.current, {
        scale: 35,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: titleRef.current,
        },
      });

      // Pin a full-screen section to hold the card in-place
      ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        anticipatePin: 1,
      });

      // Fade + scale in the card in-place (no upward motion)
      gsap.fromTo(
        cardRef.current,
        { scale: 0.6, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top center",
            end: "top center+=200",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-[500vh] bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden text-white"
    >
      {/* Zoom Title */}
      <div className="h-screen flex items-center justify-center sticky top-0 z-10">
        <div
          ref={titleRef}
          className="text-[3rem] md:text-[5rem] font-black text-white text-center leading-tight"
        >
          Discover My GitHub Journey What's Yours
        </div>
      </div>

      {/* Fullscreen pin section that reveals the card */}
      <div
        ref={pinSectionRef}
        className="h-screen flex items-center justify-center relative z-0"
      >
        <div
          ref={cardRef}
          className="max-w-4xl w-full rounded-2xl bg-black bg-opacity-80 backdrop-blur-md p-12 shadow-2xl opacity-0 scale-75"
        >
          <GitHubContributions />
        </div>
      </div>
    </main>
  );
}
