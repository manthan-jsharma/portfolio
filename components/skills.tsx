"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siNodedotjs,
  siPostgresql,
  siDocker,
  siCplusplus,
  siMongodb,
  siPrisma,
  siSocketdotio,
  siRedis,
  siTailwindcss,
} from "simple-icons";

type SimpleIcon = {
  title: string;
  path: string;
  hex: string;
};

const skills: SimpleIcon[] = [
  siReact,
  siNextdotjs,
  siTypescript,
  siNodedotjs,
  siPostgresql,
  siDocker,
  siCplusplus,
  siMongodb,
  siPrisma,
  siSocketdotio,
  siRedis,
  siTailwindcss,
];

const zustandSkill: SimpleIcon = {
  title: "Zustand",
  path: "",
  hex: "000000",
};

const allSkills = [...skills, zustandSkill];

function ZustandIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fill="#000000"
        d="M12 2.5c-2.2 0-4.1 1.2-5.1 3-.8-.5-1.8-.8-2.9-.8-3 0-5.5 2.5-5.5 5.5 0 4.8 5.5 9.2 13.5 15.5 8-6.3 13.5-10.7 13.5-15.5 0-3-2.5-5.5-5.5-5.5-1.1 0-2.1.3-2.9.8-1-1.8-2.9-3-5.1-3z"
      />
    </svg>
  );
}

function SkillIcon({ icon, isZustand }: { icon: SimpleIcon; isZustand?: boolean }) {
  if (isZustand) return <ZustandIcon />;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const pills = containerRef.current.querySelectorAll("[data-skill-pill]");

    gsap.fromTo(
      pills,
      { opacity: 0, y: 12, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        delay: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap justify-center lg:justify-start gap-2.5 max-w-xl mx-auto lg:mx-0"
    >
      {allSkills.map((skill) => (
        <span
          key={skill.title}
          data-skill-pill
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
        >
          <SkillIcon icon={skill} isZustand={skill.title === "Zustand"} />
          {skill.title}
        </span>
      ))}
    </div>
  );
}
