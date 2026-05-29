"use client";

import { useEffect, useState, type MouseEvent } from "react";

type ProjectFrame = "desktop" | "phone";

type Project = {
  title: string;
  year: string;
  slug: string;
  frame: ProjectFrame;
  description: string;
  stack: string[];
  media: string | null;
};

const projects: Project[] = [
  {
    title: "Graphics Engine",
    year: "2026",
    slug: "graphics-engine",
    frame: "desktop",
    description:
      "A real-time graphics engine with lighting, texture mapping, dual cameras, and rendering/debugging experiments.",
    stack: ["C++", "OpenGL", "GLSL", "CMake"],
    media: "/images/projects/graphics-engine.png",
  },
  {
    title: "Music Mood Model",
    year: "2026",
    slug: "music-mood-model",
    frame: "desktop",
    description:
      "A machine learning project that classifies songs by mood using audio features and arousal/valence labels.",
    stack: ["Python", "scikit-learn", "pandas"],
    media: "/images/projects/music-mood-model.png",
  },
  {
    title: "JOS Operating System",
    year: "2026",
    slug: "jos-operating-system",
    frame: "desktop",
    description:
      "Operating systems work focused on memory management, environments, traps, syscalls, and low-level debugging.",
    stack: ["C", "x86", "GDB", "QEMU"],
    media: "/images/projects/jos-os.png",
  },
  {
    title: "Network Supervisor",
    year: "2025",
    slug: "network-supervisor",
    frame: "desktop",
    description:
      "A supervisory control concept for inflight Wi-Fi systems using explicit state-driven recovery and device health monitoring.",
    stack: ["Embedded", "CAN", "UART", "Systems"],
    media: null,
  },
];

type PreviewPosition = {
  x: number;
  y: number;
};

function getGlassBubbleClasses(isLightMode: boolean, hoverText: string) {
  return `rounded-full px-3 py-1.5 transition-all duration-200 ${hoverText} ${
    isLightMode
      ? "hover:bg-white/25 hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)] hover:ring-1 hover:ring-white/60 hover:backdrop-blur-[24px] hover:backdrop-saturate-200"
      : "hover:bg-white/[0.10] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:ring-1 hover:ring-white/15 hover:backdrop-blur-[24px]"
  }`;
}

function ProjectPreview({
  project,
  isLightMode,
  position,
}: {
  project: Project | null;
  isLightMode: boolean;
  position: PreviewPosition;
}) {
  if (!project) return null;

  const isPhone = project.frame === "phone";

  return (
    <aside
      className="pointer-events-none fixed z-40 transition-opacity duration-200"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(0, -50%)",
      }}
    >
      <div
        className={`${
          isPhone
            ? "h-[480px] w-[250px] rounded-[38px]"
            : "h-[350px] w-[520px] rounded-[30px]"
        } overflow-hidden border shadow-2xl backdrop-blur-[40px] backdrop-saturate-200 transition-transform duration-150 ${
          isLightMode
            ? "border-white/60 bg-white/25 shadow-black/15"
            : "border-white/15 bg-white/[0.10] shadow-black/50"
        }`}
        style={{
          boxShadow: isLightMode
            ? "0 24px 80px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.55)"
            : "0 24px 80px rgba(0, 0, 0, 0.50), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
        }}
      >
        <div
          className={`mx-5 mt-5 flex ${
            isPhone ? "h-[250px]" : "h-[165px]"
          } items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-[24px] backdrop-saturate-200 ${
            isLightMode
              ? "border-white/45 bg-white/15"
              : "border-white/10 bg-white/[0.06]"
          }`}
        >
          {project.media ? (
            project.media.endsWith(".mp4") ? (
              <video
                src={project.media}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={project.media}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover"
              />
            )
          ) : (
            <div
              className={`text-[13px] ${
                isLightMode ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              preview coming soon
            </div>
          )}
        </div>

        <div className="p-5">
          <div
            className={`mb-2 flex items-baseline justify-between gap-4 ${
              isLightMode ? "text-neutral-950" : "text-neutral-100"
            }`}
          >
            <h2 className="text-[20px] font-semibold tracking-[-0.04em]">
              {project.title}
            </h2>

            <span className="text-[14px] opacity-60">{project.year}</span>
          </div>

          <p
            className={`max-w-[440px] text-[14px] leading-snug tracking-[-0.02em] ${
              isLightMode ? "text-neutral-700" : "text-neutral-300"
            }`}
          >
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <span
                key={item}
                className={`rounded-full border px-2.5 py-1 text-[11px] backdrop-blur-[16px] backdrop-saturate-200 ${
                  isLightMode
                    ? "border-white/45 bg-white/20 text-neutral-700"
                    : "border-white/10 bg-white/[0.07] text-neutral-300"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function HomePage() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition>({
    x: 410,
    y: 360,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", !isLightMode);
  }, [isLightMode]);

  const mainText = isLightMode ? "text-neutral-950" : "text-neutral-100";
  const secondaryText = isLightMode ? "text-neutral-600" : "text-neutral-400";
  const navText = isLightMode ? "text-neutral-700" : "text-neutral-300";
  const hoverText = isLightMode ? "hover:text-black" : "hover:text-white";
  const yearHover = isLightMode
    ? "group-hover:text-neutral-800"
    : "group-hover:text-neutral-300";

  const navBubbleClass = getGlassBubbleClasses(isLightMode, hoverText);

  const handleProjectMouseMove = (
    event: MouseEvent<HTMLAnchorElement>,
    project: Project
  ) => {
    setActiveProject(project);

    const rect = event.currentTarget.getBoundingClientRect();

    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    const baseX = rect.right + 36;
    const baseY = rect.top + rect.height / 2;

    setPreviewPosition({
      x: baseX + relativeX * 18,
      y: baseY + relativeY * 28,
    });
  };

  return (
    <section
      className={`relative z-10 min-h-screen select-none overflow-hidden ${mainText}`}
    >
      <div className="relative mx-[36px] min-h-screen">
        <div className="absolute left-[104px] top-1/2 w-[272px] -translate-y-1/2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={`/projects/${project.slug}`}
              onMouseEnter={(event) => handleProjectMouseMove(event, project)}
              onMouseMove={(event) => handleProjectMouseMove(event, project)}
              onMouseLeave={() => setActiveProject(null)}
              onFocus={(event) => {
                setActiveProject(project);

                const rect = event.currentTarget.getBoundingClientRect();

                setPreviewPosition({
                  x: rect.right + 36,
                  y: rect.top + rect.height / 2,
                });
              }}
              onBlur={() => setActiveProject(null)}
              className={`group relative grid grid-cols-[1fr_auto] rounded-full px-4 py-2.5 text-[15px] font-normal leading-none tracking-[-0.03em] ${secondaryText} transition-all duration-200 ${hoverText} hover:font-semibold ${
                isLightMode
                  ? "hover:bg-white/25 hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)] hover:ring-1 hover:ring-white/60 hover:backdrop-blur-[24px] hover:backdrop-saturate-200"
                  : "hover:bg-white/[0.10] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:ring-1 hover:ring-white/15 hover:backdrop-blur-[24px]"
              }`}
            >
              <span>{project.title}</span>

              <span
                className={`text-neutral-500 transition ${yearHover} group-hover:font-semibold`}
              >
                {project.year}
              </span>
            </a>
          ))}
        </div>

        <ProjectPreview
          project={activeProject}
          isLightMode={isLightMode}
          position={previewPosition}
        />

        <div className="fixed left-[51.5%] top-1/2 z-30 -translate-y-1/2">
          <div className="whitespace-nowrap">
            <button
              type="button"
              onClick={() => setIsLightMode((current) => !current)}
              className="cursor-pointer text-left"
              aria-label="Toggle light mode"
            >
              <h1
                className={`text-[20px] font-semibold leading-tight tracking-[-0.03em] ${mainText}`}
              >
                Luis Diaz Granados,
                <br />
                <span className="group inline-flex items-baseline gap-1.5">
                  <span>computer engineer</span>
                  <span
                    className={`${secondaryText} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                  >
                    (purdue alum)
                  </span>
                </span>
              </h1>
            </button>

            <nav
              className={`mt-6 flex gap-2 text-[19px] leading-none ${navText}`}
            >
              <a className={navBubbleClass} href="/about">
                about
              </a>

              <a className={navBubbleClass} href="mailto:pipedga@gmail.com">
                email
              </a>

              <a
                className={navBubbleClass}
                href="https://www.linkedin.com/in/luisdiazgranados/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin
              </a>

              <a
                className={navBubbleClass}
                href="https://github.com/luisdiazgranados"
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>

              <a className={navBubbleClass} href="/blog">
                blog
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}