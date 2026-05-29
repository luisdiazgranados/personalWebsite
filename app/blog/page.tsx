"use client";

import { useEffect, useState } from "react";

export default function BlogPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark-mode"));
  }, []);

  return (
    <main className="relative z-10 flex min-h-screen select-none items-center justify-center">
      <div
        className={`rounded-full border px-6 py-3 text-[20px] font-semibold tracking-[-0.03em] shadow-[0_10px_35px_rgba(0,0,0,0.10)] backdrop-blur-[24px] backdrop-saturate-200 ${
          isDarkMode
            ? "border-white/15 bg-white/[0.10] text-neutral-100"
            : "border-white/60 bg-white/25 text-neutral-950"
        }`}
      >
        WIP
      </div>
    </main>
  );
}