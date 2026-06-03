"use client";

import { useEffect, useState } from "react";
import type { SubstackPost } from "../substack";

export default function PostContent({ post }: { post: SubstackPost }) {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    setIsLightMode(
      !document.documentElement.classList.contains("dark-mode")
    );
  }, []);

  const mainText = isLightMode ? "text-neutral-950" : "text-neutral-100";
  const secondaryText = isLightMode ? "text-neutral-500" : "text-neutral-400";
  const lineColor = isLightMode ? "border-neutral-200" : "border-neutral-800";

  return (
    <section className={`relative z-10 min-h-screen select-none ${mainText}`}>
      <article className="mx-auto max-w-[680px] px-6 pt-16 pb-24">
        {/* Back link */}
        <a
          href="/blog"
          className={`text-[13px] tracking-[-0.02em] ${secondaryText} transition hover:text-[#007AFF]`}
        >
          &lt;- back
        </a>

        {/* Header */}
        <header className="mt-10 mb-8">
          <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.04em] sm:text-[40px]">
            {post.title}
          </h1>

          <div className={`mt-4 flex items-center gap-3 text-[14px] ${secondaryText}`}>
            <span>Luis Diaz Granados</span>
            <span className={`h-3 w-px ${isLightMode ? "bg-neutral-300" : "bg-neutral-700"}`} />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>

        {/* Divider */}
        <div className={`mb-10 border-t ${lineColor}`} />

        {/* Content */}
        <div
          className={`prose-article ${isLightMode ? "prose-light" : "prose-dark"}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className={`mt-16 border-t pt-6 ${lineColor}`}>
          <a
            href="/blog"
            className={`text-[14px] ${secondaryText} transition hover:text-[#007AFF]`}
          >
            &lt;- all posts
          </a>
        </div>
      </article>
    </section>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
