const projects = [
  { title: "Graphics Engine", year: "2026" },
  { title: "Music Mood Model", year: "2026" },
  { title: "JOS Operating System", year: "2026" },
  { title: "Network Supervisor", year: "2025" },
];

export default function HomePage() {
  return (
    <section className="relative z-10 min-h-screen text-neutral-100">
      {/* Left scrollable project index */}
      <div className="relative mx-[36px] min-h-[180vh]">
        <div className="absolute left-[120px] top-[28vh] w-[233px]">
          <div className="flex flex-col gap-[120px]">
            {projects.map((project) => (
              <a
                key={project.title}
                href={`/projects/${project.title
                  .toLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll("/", "")
                  .replaceAll(".", "")}`}
                className="group grid grid-cols-[1fr_auto] text-[15px] font-normal leading-none tracking-[-0.03em] text-neutral-400 transition hover:text-neutral-100 hover:font-semibold"
              >
                <span>{project.title}</span>

                <span className="text-neutral-500 transition group-hover:text-neutral-300 group-hover:font-semibold">
                  {project.year}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right fixed hero block */}
      <div className="fixed left-[51.5%] top-1/2 z-20 -translate-y-1/2">
        <div className="whitespace-nowrap">
          <h1 className="text-[20px] font-semibold leading-tight tracking-[-0.03em] text-neutral-100">
            Luis Diaz Granados,
            <br />
            <span className="group inline-flex items-baseline gap-1.5">
              <span>computer engineer</span>
              <span className="text-neutral-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                (from purdue)
              </span>
            </span>
          </h1>

          <nav className="mt-6 flex gap-4 text-[19px] leading-none text-neutral-300">
            <a className="transition hover:text-white" href="/about">
              about
            </a>

            <a
              className="transition hover:text-white"
              href="mailto:pipedga@gmail.com"
            >
              email
            </a>

            <a
              className="transition hover:text-white"
              href="https://www.linkedin.com/in/luisdiazgranados/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin
            </a>

            <a
              className="transition hover:text-white"
              href="https://github.com/luisdiazgranados"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>

            <a className="transition hover:text-white" href="/blog">
              blog
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}