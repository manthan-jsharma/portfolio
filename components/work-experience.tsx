"use client";

import { useEffect, useRef, type CSSProperties } from "react";
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
    glow: ["#3b82f6", "#8b5cf6", "#22d3ee"],
  },
  {
    id: 2,
    company: "CodeComp.in",
    role: "Forward Deployed Engineer",
    period: "2026 Part-Time",
    tech: ["MVP", "SaaS", "Morpheus AI"],
    description: "Helping Non Tech Founders as FDE.",
    details: [
      "Partenered with CodeCompany to deliver Software Solutions",
      "Building fast MVPs and helping NonTech Founders in Software Space with Amar.",
    ],
    link: "https://codecompany.in/",
    glow: ["#8b5cf6", "#ec4899", "#a78bfa"],
  },
  {
    id: 3,
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
    glow: ["#a855f7", "#f472b6", "#c084fc"],
  },
  {
    id: 4,
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
    glow: ["#ef4444", "#f97316", "#fb7185"],
  },
  {
    id: 5,
    company: "Django Query Profiler",
    role: "OpenSource -> EnternPrise Tool",
    period: "2025",
    tech: ["Django", "SQL", "Prometheus", "tox"],
    description: "Scaling Plugins to Grafana/Prometheus & Github Actions",
    details: [
      "SQL Auditing: Django Query Profiler is a high-traffic performance auditing utility (4, 000+ monthly downloads)",
      "Re-architecting the detection engine for N+1 query inefficiencies and database latency bottlenecks, directly impacting the development velocity of thousands of users.",
      "Managing the private development lifecycle and roadmap execution, transforming the legacy open-source plugin into a production-grade enterprise tool",
    ],
    link: "https://pypistats.org/packages/django-query-profiler",
    glow: ["#10b981", "#14b8a6", "#34d399"],
  },
  {
    id: 6,
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
    glow: ["#ec4899", "#f43f5e", "#fb7185"],
  },
] as const;

const TITLE_LINE_1 = "Work";
const TITLE_LINE_2 = "Experience";

const CARD_ENTER = 0.58;
const CARD_HOLD = 0.52;
const CARD_EXIT = 0.55;
const CARD_EASE_IN = "power4.out";
const CARD_EASE_OUT = "power3.in";

function SplitTitle({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="title-char inline-block will-change-transform">
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  return (
    <article
      className="exp-card absolute left-1/2 top-1/2 w-[88vw] max-w-[620px]"
      style={{ transformStyle: "preserve-3d" }}
      data-card-index={index}
    >
      <div className="exp-card-wobble will-change-transform">
        <div className="exp-card-bounce will-change-transform">
          <div
            className="exp-card-glow md:rounded-[2.5rem]"
            style={
              {
                "--glow-c1": exp.glow[0],
                "--glow-c2": exp.glow[1],
                "--glow-c3": exp.glow[2],
              } as CSSProperties
            }
          >
            <div className="exp-card-inner relative flex min-h-[460px] flex-col overflow-hidden rounded-[2rem] bg-black/80 p-7 backdrop-blur-xl md:min-h-[500px] md:rounded-[2.5rem] md:p-9">
              <div className="mb-8 flex items-start justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {exp.period}
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-8 space-y-3">
                  <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {exp.company}
                  </h3>
                  <p className="text-base font-medium text-white/50 md:text-lg">
                    {exp.role}
                  </p>
                </div>

                <p className="mb-8 text-base leading-relaxed text-gray-300 md:text-lg">
                  {exp.description}
                </p>

                <ul className="mb-8 space-y-3 border-l border-white/10 pl-5">
                  {exp.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed text-gray-400 md:text-[0.95rem]"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative z-50 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(exp.link!, "_blank", "noopener,noreferrer");
                      }}
                    >
                      Explore Project
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/40">
                      Private Project
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleStageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
      const titleChars = gsap.utils.toArray<HTMLElement>(".title-char");

      const titleScroll = window.innerHeight * 1.5;
      const perCardScroll = window.innerHeight * 2.6;
      const totalScroll =
        titleScroll + perCardScroll * cards.length + window.innerHeight * 0.5;

      const setActiveCard = (activeIndex: number) => {
        cards.forEach((card, idx) => {
          const isActive = idx === activeIndex;
          card.style.pointerEvents = isActive ? "auto" : "none";
          card.style.zIndex = isActive ? "30" : "1";
        });
      };

      gsap.set(cardsLayerRef.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(cards, {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: 0.9,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: pin,
          scrub: 4.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
            const titlePortion = titleScroll / totalScroll;
            let active = 0;
            if (self.progress > titlePortion) {
              const cardProgress =
                (self.progress - titlePortion) / (1 - titlePortion);
              active = Math.min(
                cards.length - 1,
                Math.max(0, Math.floor(cardProgress * cards.length))
              );
            }
            setActiveCard(active);
            if (counterRef.current) {
              counterRef.current.textContent = String(active + 1).padStart(2, "0");
            }
          },
        },
      });

      // Phase 1 — title (cards hidden)
      tl.from(titleChars, {
        yPercent: 120,
        rotateX: -80,
        opacity: 0,
        scale: 0.6,
        stagger: { each: 0.04, from: "random" },
        duration: 0.35,
        ease: "power4.out",
      })
        .from(
          subtitleRef.current,
          { y: 40, opacity: 0, filter: "blur(8px)", duration: 0.22 },
          "-=0.12"
        )
        .from(
          scrollHintRef.current,
          { opacity: 0, y: 20, duration: 0.18 },
          "-=0.05"
        )
        .to({}, { duration: 0.25 })
        .addLabel("title-complete")
        .to(
          titleStageRef.current,
          {
            opacity: 0,
            scale: 0.85,
            y: -80,
            filter: "blur(12px)",
            visibility: "hidden",
            pointerEvents: "none",
            duration: 0.28,
            ease: "power3.in",
          },
          "title-complete"
        )
        .to(scrollHintRef.current, { opacity: 0, duration: 0.12 }, "title-complete")
        .to({}, { duration: 0.15 })
        .addLabel("cards-begin")
        .set(cardsLayerRef.current, { autoAlpha: 1, pointerEvents: "auto" }, "cards-begin");

      // Phase 2 — one card at a time in center
      cards.forEach((card, i) => {
        const bounce = card.querySelector(".exp-card-bounce");
        const glow = card.querySelector(".exp-card-glow");

        if (bounce) {
          gsap.to(bounce, {
            y: 3,
            rotation: 1,
            duration: 2.4 + i * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (i === 0) {
          // Kinzy: bottom → center (matches title letter feel)
          tl.set(
            card,
            {
              autoAlpha: 0,
              x: 0,
              y: "75vh",
              scale: 0.6,
              rotateX: -80,
              rotateZ: 0,
              filter: "blur(10px)",
            },
            "cards-begin"
          );
          tl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: CARD_ENTER,
              ease: CARD_EASE_IN,
            },
            "cards-begin+=0.05"
          );
          tl.to({}, { duration: CARD_HOLD });
        }

        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const transitionLabel = `card-${i}-exit`;

          tl.addLabel(transitionLabel);
          tl.to(
            card,
            {
              y: "-70vh",
              autoAlpha: 0,
              scale: 0.85,
              rotateX: 12,
              filter: "blur(12px)",
              duration: CARD_EXIT,
              ease: CARD_EASE_OUT,
            },
            transitionLabel
          );
          tl.set(
            nextCard,
            {
              autoAlpha: 0,
              x: "105vw",
              y: 0,
              scale: 0.85,
              rotateZ: 6,
              rotateX: -20,
              filter: "blur(10px)",
            },
            transitionLabel
          );
          tl.to(
            nextCard,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateZ: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: CARD_ENTER,
              ease: CARD_EASE_IN,
            },
            transitionLabel
          );
          tl.to({}, { duration: CARD_HOLD });

          if (glow) {
            gsap.to(glow, {
              opacity: 0.85,
              duration: 0.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }
      });

      setActiveCard(0);
      ScrollTrigger.refresh();
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.04),transparent_50%)]" />

        <div
          ref={titleStageRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
          style={{ perspective: "1000px" }}
        >
          <div className="text-center">
            <div className="overflow-hidden text-[clamp(3.5rem,12vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter">
              <SplitTitle text={TITLE_LINE_1} />
            </div>
            <div className="overflow-hidden text-[clamp(3.5rem,12vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter text-white/90">
              <SplitTitle text={TITLE_LINE_2} />
            </div>
          </div>

          <p
            ref={subtitleRef}
            className="mt-8 text-sm md:text-base uppercase tracking-[0.4em] text-white/40"
          >
            Career Timeline · {experiences.length} Roles
          </p>
        </div>

        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Scroll to explore
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-0 bg-white/70 transition-none"
          />
        </div>

        <div className="pointer-events-none absolute right-6 top-6 z-40 hidden items-baseline gap-2 font-mono md:flex">
          <span ref={counterRef} className="text-3xl font-bold text-white/80">
            01
          </span>
          <span className="text-xs tracking-widest text-white/30">
            / {String(experiences.length).padStart(2, "0")}
          </span>
        </div>

        <div
          ref={cardsLayerRef}
          className="invisible absolute inset-0 z-30 overflow-hidden"
          style={{ perspective: "1200px" }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
