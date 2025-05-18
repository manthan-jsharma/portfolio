"use client";
import GitHubCalendar from "react-github-calendar";

export default function GitHubContributions() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-10 rounded-2xl bg-zinc-900 shadow-lg border border-zinc-800">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        GitHub Contributions
      </h2>

      <div className="overflow-auto">
        <GitHubCalendar
          username="manthan-jsharma"
          colorScheme="dark"
          blockSize={16}
          blockMargin={6}
          fontSize={14}
        />
      </div>

      <p className="mt-6 text-sm text-zinc-400 text-center">
        Consistency builds mastery — here’s a snapshot of my daily coding
        journey.
      </p>
    </section>
  );
}
