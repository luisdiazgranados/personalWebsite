"use client";

import { useEffect, useState } from "react";
import type { Post } from "./page";

export default function BlogContent({ posts }: { posts: Post[] }) {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    setIsLightMode(
      !document.documentElement.classList.contains("dark-mode")
    );
  }, []);

  const mainText = isLightMode ? "text-neutral-950" : "text-neutral-100";
  const secondaryText = isLightMode ? "text-neutral-500" : "text-neutral-400";

  return (
    <section
      className={`relative z-10 min-h-screen select-none ${mainText}`}
    >
      {/* Hero */}
      <div className="flex items-center justify-center overflow-hidden px-6 pt-10 pb-8">
        <div className={`inline-block border-2 px-6 py-4 font-mono ${
          isLightMode ? "border-[#007AFF]/30" : "border-[#007AFF]/40"
        }`}>
          <pre
            className="text-left text-[#007AFF] text-[6px] leading-[1.15] sm:text-[8px] md:text-[10px]"
            aria-label="My Blog"
          >
{` ██████   ██████               ███████████  ████
░░██████ ██████               ░░███░░░░░███░░███
 ░███░█████░███  █████ ████    ░███    ░███ ░███   ██████   ███████
 ░███░░███ ░███ ░░███ ░███     ░██████████  ░███  ███░░███ ███░░███
 ░███ ░░░  ░███  ░███ ░███     ░███░░░░░███ ░███ ░███ ░███░███ ░███
 ░███      ░███  ░███ ░███     ░███    ░███ ░███ ░███ ░███░███ ░███
 █████     █████ ░░███████     ███████████  █████░░██████ ░░███████
░░░░░     ░░░░░   ░░░░░███    ░░░░░░░░░░░  ░░░░░  ░░░░░░   ░░░░░███
                  ███ ░███                                 ███ ░███
                 ░░██████                                 ░░██████
                  ░░░░░░                                   ░░░░░░`}
          </pre>
        </div>
      </div>

      <div className={`overflow-hidden px-6 pb-4 select-none font-mono text-[11px] tracking-[0.3em] whitespace-nowrap ${
        isLightMode ? "text-neutral-400" : "text-neutral-500"
      }`} aria-hidden>
        {Array(20).fill("+ - . / ").join("")}
      </div>

      <div className="pb-24">
        {/* Posts */}
        {posts.length > 0 ? (
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-4"
              >
                <div className="mx-auto max-w-[700px] overflow-x-auto px-6">
                  <pre
                    className={`font-mono text-[4px] leading-[1.1] sm:text-[5.5px] md:text-[7px] ${mainText} transition-colors duration-200 group-hover:text-[#007AFF]`}
                    aria-label={post.title}
                  >
                    {post.asciiTitle}
                  </pre>
                </div>

                <div className="mx-auto mt-3 flex max-w-[700px] items-baseline justify-between gap-4 px-6">
                  <p
                    className={`text-[13px] leading-snug tracking-[-0.01em] ${secondaryText} transition-colors duration-200 group-hover:text-[#007AFF]`}
                  >
                    {post.summary}
                  </p>
                  <span
                    className={`shrink-0 whitespace-nowrap font-mono text-[12px] ${secondaryText} transition-colors duration-200 group-hover:text-[#007AFF]`}
                  >
                    {post.date}
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 px-6 pt-16">
            <pre
              className={`text-center font-mono text-[11px] leading-relaxed tracking-wide ${
                isLightMode ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
{`  +---------------------+
  |                     |
  |   nothing here yet  |
  |                     |
  +---------------------+`}
            </pre>
            <p className={`text-[13px] ${secondaryText}`}>
              posts coming soon
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
