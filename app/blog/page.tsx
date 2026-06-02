"use client";

import { useEffect, useState } from "react";

type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

const posts: Post[] = [
  // {
  //   slug: "first-post",
  //   title: "Hello World",
  //   date: "2026-06-01",
  //   summary: "A first post to test the blog.",
  // },
];

function AsciiDivider({ isLightMode }: { isLightMode: boolean }) {
  return (
    <div
      className={`select-none font-mono text-[11px] tracking-[0.3em] ${
        isLightMode ? "text-neutral-300" : "text-neutral-700"
      }`}
      aria-hidden
    >
      {"+ - . / + - . / + - . / + - ."}
    </div>
  );
}

export default function BlogPage() {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    setIsLightMode(
      !document.documentElement.classList.contains("dark-mode")
    );
  }, []);

  const mainText = isLightMode ? "text-neutral-950" : "text-neutral-100";
  const secondaryText = isLightMode ? "text-neutral-500" : "text-neutral-400";
  const hoverText = isLightMode ? "hover:text-black" : "hover:text-white";
  const lineColor = isLightMode ? "border-neutral-200" : "border-neutral-800";

  return (
    <section
      className={`relative z-10 min-h-screen select-none ${mainText}`}
    >
      <div className="mx-auto max-w-[560px] px-6 py-24">
        {/* Header */}
        <div className="mb-12">
          <a
            href="/"
            className={`text-[13px] tracking-[-0.02em] ${secondaryText} ${hoverText} transition`}
          >
            &lt;- back
          </a>

          <h1 className="mt-6 text-[28px] font-semibold leading-tight tracking-[-0.04em]">
            blog
          </h1>

          <div className="mt-3">
            <AsciiDivider isLightMode={isLightMode} />
          </div>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="flex flex-col gap-1">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group grid grid-cols-[1fr_auto] items-baseline gap-4 rounded-lg px-3 py-3 transition-all duration-200 ${
                  isLightMode
                    ? "hover:bg-neutral-100"
                    : "hover:bg-white/[0.04]"
                }`}
              >
                <div>
                  <span
                    className={`text-[15px] font-semibold tracking-[-0.03em] ${mainText}`}
                  >
                    {post.title}
                  </span>
                  <p
                    className={`mt-0.5 text-[13px] leading-snug tracking-[-0.01em] ${secondaryText}`}
                  >
                    {post.summary}
                  </p>
                </div>

                <span
                  className={`whitespace-nowrap font-mono text-[12px] ${secondaryText}`}
                >
                  {post.date}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 pt-16">
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

        {/* Footer */}
        <div className={`mt-20 border-t pt-4 ${lineColor}`}>
          <AsciiDivider isLightMode={isLightMode} />
        </div>
      </div>
    </section>
  );
}
