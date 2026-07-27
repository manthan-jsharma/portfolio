"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { Home, NotebookPen, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = {
  github: "https://github.com/manthan-jsharma",
  linkedin: "https://www.linkedin.com/in/manthan-jsharma",
  x: "https://x.com/manthan_jsharma",
};

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Divider() {
  return (
    <div
      className="mx-1 h-5 w-px bg-neutral-200 dark:bg-neutral-700"
      aria-hidden="true"
    />
  );
}

function Tooltip({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 -translate-x-1/2",
        "rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white whitespace-nowrap",
        "opacity-0 translate-y-1 scale-95",
        "transition-all duration-200 ease-out",
        "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
        "group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100"
      )}
    >
      {label}
      <span
        className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-neutral-900"
        aria-hidden="true"
      />
    </span>
  );
}

function DockButton({
  label,
  isActive,
  onClick,
  href,
  external,
  children,
}: {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const className = cn(
    "group relative flex h-9 w-9 items-center justify-center rounded-full",
    "text-neutral-900 dark:text-neutral-100",
    "transition-colors duration-200 ease-out",
    "hover:bg-neutral-100 dark:hover:bg-neutral-800",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
    isActive && "bg-neutral-100 dark:bg-neutral-800"
  );

  const content = (
    <>
      <Tooltip label={label} />
      <motion.span
        className="flex items-center justify-center"
        whileHover={{ y: -6, scale: 1.22 }}
        whileTap={{ y: -2, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 420, damping: 16, mass: 0.55 }}
      >
        {children}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
        aria-label={label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}

export default function BottomNavbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHome = pathname === "/";
  const isBlog =
    pathname === "/blog" || pathname.startsWith("/blog/");

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.15 }}
      className={cn(
        "fixed bottom-0 left-1/2 z-50 -translate-x-1/2",
        "mb-4 sm:mb-6",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "flex items-center gap-0.5 overflow-visible rounded-full px-2 py-1.5 sm:gap-1 sm:px-2.5",
          "border border-neutral-200/80 bg-white/95 backdrop-blur-md",
          "shadow-[0_2px_24px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)]",
          "dark:border-neutral-700/80 dark:bg-neutral-900/95",
          "dark:shadow-[0_2px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]"
        )}
      >
        <DockButton label="Home" href="/" isActive={isHome}>
          <Home className="h-[18px] w-[18px] stroke-[1.75]" />
        </DockButton>

        <DockButton label="Blog" href="/blog" isActive={isBlog}>
          <NotebookPen className="h-[18px] w-[18px] stroke-[1.75]" />
        </DockButton>

        <Divider />

        <DockButton label="GitHub" href={SOCIAL_LINKS.github} external>
          <GitHubIcon className="h-[18px] w-[18px]" />
        </DockButton>

        <DockButton label="LinkedIn" href={SOCIAL_LINKS.linkedin} external>
          <LinkedInIcon className="h-[18px] w-[18px]" />
        </DockButton>

        <DockButton label="X" href={SOCIAL_LINKS.x} external>
          <XIcon className="h-[18px] w-[18px]" />
        </DockButton>

        <Divider />

        <DockButton
          label={mounted && resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
          onClick={toggleTheme}
        >
          {mounted && resolvedTheme === "dark" ? (
            <Moon className="h-[18px] w-[18px] stroke-[1.75]" />
          ) : (
            <Sun className="h-[18px] w-[18px] stroke-[1.75]" />
          )}
        </DockButton>
      </div>
    </motion.nav>
  );
}
