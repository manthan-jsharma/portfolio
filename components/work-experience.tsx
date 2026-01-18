"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    id: 1,
    company: "KINZY",
    role: "Java/Python Developer",
    period: "2025 - Present",
    tech: ["Java", "LangGraph", "Python", "Flutter", "CI/CD"],
    description: "Architecting a Multi-Agent AI Gaming Engine.",
    details: [
      "Architected a LangGraph Multi-Agent GamingEngine with Adda 247 Co-Founder.",
      "Improved Engine generation speed by 40% (14m to 68m) via Intelligent Node Selection.",
      "Implemented Jinja-based system to dynamically generate React component styles.",
    ],
    link: "https://docs.google.com/document/d/1AjR842V6Rzqu0BK6J0-YbKDO73YkD8kqf_TH9PCX2GU/edit?tab=t.0#heading=h.1pj71txoyup3",
    color: "shadow-[0_0_100px_-20px_rgba(59,130,246,0.5)]", // Blue
    gradient: "from-blue-900/50 to-black",
  },
  {
    id: 2,
    company: "ODDLY AI",
    role: "AI SOftware Developer",
    period: "2025",
    tech: ["RAG", "GCP", "Trigger.dev", "Pub/Sub"],
    description: "Scaling RAG Agents & Data Systems.",
    details: [
      "Developed RAG Agents & Document Analytics for an API outsourcing platform.",
      "Managed deployment lifecycle: VMs, Containerization, and GCP Artifact Registry.",
      "Built scalable microservices via Trigger.dev and GCP Pub/Sub for real-time data.",
    ],
    link: "https://toolkit.invaro.ai/",
    color: "shadow-[0_0_100px_-20px_rgba(16,185,129,0.5)]",
    gradient: "from-emerald-900/50 to-black",
  },
  {
    id: 3,
    company: "REDSCOPE AI",
    role: "Open Source Maintainer",
    period: "Current",
    tech: ["Electron", "Local LLM", "TDD"],
    description: "Local-First AI for On-Call Engineers.",
    details: [
      "Transforming a private Local-First Electron LLM app into Open Source.",
      "My Team Pitched it to Max Altman; aiming for GSOC Mentor Organization status.",
      "Enforced strict TDD protocols and managed feature expansion.",
    ],
    link: "https://www.loom.com/share/15ae5ff8aa46432bb591e156d01dd9e3",
    color: "shadow-[0_0_100px_-20px_rgba(239,68,68,0.5)]",
    gradient: "from-red-900/50 to-black",
  },
  {
    id: 3,
    company: "Django Query Profiler",
    role: "OpenSource -> EnternPrise Tool",
    period: "2025",
    tech: ["Django", "SQL", "Prometheus", "tox"],
    description: "Scaling RAG Agents & Data Systems.",
    details: [
      "SQL Auditing: Django Query Profiler is a high-traffic performance auditing utility (4, 000+ monthly downloads)",
      "Re-architecting the detection engine for N+1 query inefficiencies and database latency bottlenecks, directly impacting the development velocity of thousands of users.",
      "Managing the private development lifecycle and roadmap execution, transforming the legacy open-source plugin into a production-grade enterprise tool",
    ],
    link: "https://pypistats.org/packages/django-query-profiler",
    color: "shadow-[0_0_100px_-20px_rgba(16,185,129,0.5)]",
    gradient: "from-emerald-900/50 to-black",
  },
  {
    id: 5,
    company: "FACEGLOW AI",
    role: "Fullstack Freelancing",
    period: "Ongoing",
    tech: ["React Native", "Python", "Supabase", "OpenAI"],
    description: "AI-Powered Skincare App.",
    details: [
      "Developing React Native app with Python Microservices backend.",
      "Integrated OpenAI Vision, Supabase, and Superwall-RevenueCat.",
      "Scheduled for release on both AppStore and PlayStore.",
    ],
    link: null,
    color: "shadow-[0_0_100px_-20px_rgba(236,72,153,0.5)]",
    gradient: "from-pink-900/50 to-black",
  },
  {
    id: 6,
    company: "AI APP LABS",
    role: "Agency Collaboration",
    period: "Freelance",
    tech: ["MVP", "SaaS", "Morpheus AI"],
    description: "Building Fast MVPs & AI SaaS Exits.",
    details: [
      "i've been Freelancing for AI App Labs and Soon Collaborate with them with my Own Agency",
      "Building fast MVPs and targeting AI SaaS exits.",
      "Contributed to building 'Morpheus AI' for Ashton Hall.",
    ],
    link: "https://www.cgramm.org/",
    color: "shadow-[0_0_100px_-20px_rgba(139,92,246,0.5)]",
    gradient: "from-violet-900/50 to-black",
  },
];

export default function WorkExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll(".experience-card");

    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: index + 1,
        transformOrigin: "center top",
      });

      // 3. The Stacking Animation
      // We only animate if there is a NEXT card to cover this one
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];

        gsap.to(card, {
          // A. Scale down slightly to create depth (0.95 is subtle, 0.8 is dramatic)
          scale: 0.93,

          // B. Fade out slightly to focus attention on the new card
          opacity: 1, // Keep it visible!
          filter: "brightness(0.4) blur(1px)", // Darken it significantly

          // C. Animation control
          ease: "none",
          scrollTrigger: {
            trigger: nextCard, // The animation is driven by the NEXT card's movement
            start: "top bottom", // When the top of next card enters viewport
            end: "top top+=100", // When the top of next card reaches the sticky position
            scrub: true, // Smooth linking to scroll
          },
        });
      }
    });

    // Optional: Progress Bar Logic (Kept from your original code)
    gsap.fromTo(
      ".progress-line",
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-black text-white min-h-screen py-24"
    >
      <div className="container px-4 mx-auto flex gap-8 md:gap-16">
        {/* LEFT COLUMN: FIXED TITLE */}
        <div className="hidden md:flex flex-col items-center sticky top-24 h-fit gap-8">
          <div className="relative h-[60vh] w-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="progress-line absolute top-0 left-0 w-full bg-white shadow-[0_0_10px_white]" />
          </div>
          <div className="writing-mode-vertical text-xs tracking-[0.5em] text-white/30 uppercase rotate-180">
            Career Timeline
          </div>
        </div>

        {/* RIGHT COLUMN: STACKING CARDS */}
        <div className="flex-1">
          <div className="mb-[10vh]">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mix-blend-overlay">
              Selected
              <br />
              Works
            </h2>
          </div>

          {/* Container for cards. 
            We use a slight bottom margin on cards to ensure scroll space.
          */}
          <div className="flex flex-col space-y-[50vh]">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="experience-card sticky top-32 w-full"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 ${exp.color} transition-colors duration-500`}
                >
                  {/* Card Background & Content (Same as your original) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-20`}
                  />

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 p-8 md:p-12 min-h-[500px]">
                    <div className="absolute top-4 right-6 text-9xl font-black text-white/5 select-none">
                      0{index + 1}
                    </div>

                    <div className="md:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-white/20 bg-white/5 text-xs tracking-widest uppercase text-white/60">
                          {exp.period}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase leading-none">
                          {exp.company}
                        </h3>
                        <p className="text-xl text-purple-400 font-medium tracking-wide">
                          {exp.role}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-8 md:mt-0">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs bg-black/40 border border-white/10 rounded text-gray-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-end md:border-l md:border-white/10 md:pl-12">
                      <p className="text-2xl font-light text-white mb-8 leading-snug">
                        {exp.description}
                      </p>
                      <ul className="space-y-4 mb-8">
                        {exp.details.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-400 text-sm"
                          >
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>

                      {exp.link && (
                        <Link
                          href={exp.link}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-white border-b border-white/30 hover:border-white pb-1 w-fit transition-all group"
                        >
                          <span className="text-sm font-bold uppercase tracking-wider">
                            Explore Project
                          </span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Spacer to allow full scroll past the last item */}
          <div className="h-[50vh]" />
        </div>
      </div>
    </div>
  );
}
