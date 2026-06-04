"use client";

import { useEffect, useState, useRef, type MouseEvent } from "react";
import AsciiPaintBackground from "@/components/background/AsciiPaintBackground";

const ASCII_HEADSHOT = `      .. ...................................................................................................::::::::::::::-----------=======
  .      ...................................................................................................::::::::::::::-----------=======
         ....................................................................................................:::::::::::::-------------=====
       ......................................................................................................:::::::::::::-------------=====
         .....................................................................................................:::::::::::::------------=====
      . . ...................................................................................................::::::::::::::------------=====
         ......................................................................................................::::::::::::------------=====
        .......................................................................................................:::::::::::-------------=====
         ....................................................................................................::::::::::::::------------=====
     .   . ...................................................................................................:::::::::::::-------------====
        . . ..................................................................................................::::::::::::::------------====
         .....................................................................................................:::::::::::::---------------==
         ......................................................................................................:::::::::::::--------------==
     ..  . ......................................................:..::+@@%%@@%@@+..=#=.........................:::::::::::::-------------===
           ....................................................*@@@@@@@@@@@@@@@@@@@@@@+.........................::::::::::::--------------=-
            ...............................................:#%@@@@@@@@@@@@@@@@@@@@@@@@@@*=:..--................:::::::::::::--------------==
           ...............................................@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...................:::::::::::----------------=
             ..........................................-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=##-...............::::::::::::----------------
     .       . ......................................:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#%@..............::::::::::::----------------
            . ......................................*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:-...............:::::::::::----------------
              .....................................-@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%................:::::::::::----------------
               ....................................*@@@@@@@@@@%%++#%%**++#%%%%%%@@@@@@@@@@@@@@@@@...............::::::::::::----------------
                ... ..............................:#@@@@@@@@@@#+=======-=====+=++**#@@@@@@@@@@@@@=.............:::::::::::::----------------
                   ..............................:-@@@@@@@@@@%+=======--========+++*#%%@@@@@@@@@@..............::::::::::::::---------------
                     ..........................:::=@@@@@@@%*#++=========---======++**##%%@@@@@@@@-............::::::::::::::---------------=
                    ..........................::::=@@@@@@@+====----------------====++**#%%@@@@@@@@...........::::::::::::::-----------------
                    . ......................::::::-@@@@@@*=====+=-------::-------===+**#%%@@@@@@@=.........::::::::::::::-------------------
                      .....................:::::::-@@@@@%==+*@@@@@@@@@%**-::--=-+#%@@@@@@@@@@@@@@*......:::::::::::::::---------------------
                         ..................::::::--@@@@@=+*%%%@@@@@@@@@%*+-:-=++#@@@@@@@@@@@@@@@@*..:::::::::::::::---------------=----=====
                          .................::::---=@@@@+=++++++===++**++==:.-=*%%@@@%###%%@@@@@@@@::::::::::::----------------==============
                         ..................:::----=@@@@+=---=++===**###++---=+#@@@%*++*#%@@%@@@@@*::::::::----------------==================
                         ..................:::----+@@@@+=-=+*%@@@@@@%@@*+*===#%@@@@#@@@@@@@@@@@@@*:::----------------=======================
                          ................:::-----+@@@@===++*++==+#*##*+++==+#@@@@@%##%%%@@@@@@@@%::----------==============================
                         .................::::--==+@@@+==---==+*#%%#**+++=--=#%@@@@%%%@%%###%%@@@@=---------==================+++++++++++++=
                         .................:::--+*=-:*@==--:::--===========--=*%@@@%%###*+++*#%@@@@%--------============+++++++++++++++++++++
                          .................:::-+#+=+=+=---::::-------====--:-*%%@@%%#**++++*#%%@@@%------============+++++++++++++++++++++++
                           ...............:::--=#-=#-==--::.:::::----====--:-=*%@@@%#**++++**%%@%@#-----===========+++++++++++++*****+++++++
                           ...............::----+=*-:-=--::::::--+++=-:--:..:-+%%%%@@#*++***#%%%#%-----==========+=++++++++++++***********++
                            ..............::----++#*:-----:----=+*====**%+--=+%@@@@%%%%****#%@@%@%-----==========+++++++++++++**************
                             .............::----+*:---=------==+*+===----=++#@@@@@@@%%%####%@@@%%%----==========+++++++++++++***************
                            .. ...........:::----==---=--=====+#+==--===-==*###%%%@@@@@@*#%@@@@%@=---==========++++++++++++++***************
                             .............:::-------+===---===+*---====--=+*++*###%%%@@%#%@@@@@%#----=========++++++++++++++****************
                            ..............:::---------====--==*@@@+:+-**####%%@@@@@@@@@%#%@@@@#-----==========++++++++++++++****************
                               ............:::--------=====--=+*=%#** . ......:--*@@@@%##%@@@@------==========++++++++++++******************
                                 ..........::::--------+======-+--+**##*+:=-**#@@@@@@%##%@@@@*-----===========++++++++++********************
                            .    ...........::::-------=++====-----:=*==**#***#%@@@%%%%%%@@@#-------==========+++++++++*********************
                                  ...........::::-------++++==--------==*###%%@@%%%%%%%%@@@@-------==========++++++++++*********************
                                   ..........::::-------=+*+++=-=-==---+**#######%%%@%%@@@@--------==========+++++++++**********************
                                   ..........::::---- #@@+****++=======----==+*####%@@@@@+::-------==========++++++++***********************
                                   .  ........:::---.  @@++*****++===--======+*###%@@@@@-:::--------=========++++++++***********************
                                   .  ........::---.    @*++*#*****++++++**+++*#%@@@@@@=:::--------==========++++++++***********************
                                    .........:::--.      *+++*##########%%%%##%@@@@@@@@=:::-------==========++++++++***************#**#*****
                                      .......::--.        -*++*####%%%%@@@@@@@@@@@@@@@@@+:--------==========++++++++***************#*#**####
                                    ........:::-.           #+++*####%%@@@@@@@@@@@@@@@@%@+------==========+++++++++***************########**
                                     ......::...             =#++***######%%@@@@@@@@@@%*#**--===========+++++++++++*************############
                                  ........                     %#++*#***##%%%@@@@@@@@@%++*++==========++++++++++++**************#*##########
                                ......                          =@#***#***##%%@@@@@@@@@**+=++=====++++++++++++++****************#########**#
                            ....            .    .                #@%#******#%@@@@@@@@@#++===++++++++++++++++++**************##############*
                        ....           ..                          .%@@##***#%@@@@@@@@@===--:+++++++++++++**+**************#*###############
                    ....      ... ....      ....                     .@@@%%%%@@@@@%@@@@-.. . :+++=++++=++*****************##################
                ....       .:  .....    .      .::.                 -- .@@@@@%%%%%@@@@@-.    .:++++++++++==*************####################
            ....    .:.  .    ..   ...  .        .--               ++:.   %@%%%%%%@@@@-      ..:+++*+++*+===+=+******#######################
         ....       .  ... ..:.  .     .:.         :+             +#+: ..  @@%%%%%@@@=-: ...  .==++++++++====+++++**########################
      ....        ..  ....::. ........:.                        -+--=+:    %@%%%%%@@+: ... .. .-@@*+++++++===++==+++**######################
   ...           .  .. .:....:::....:..   ..                  .+*=+:. :: ..=-.:%%%@=..    . ....+#%@@++=+++==+=====+=+*#####################
  ...              . ......::....:::...:-:.                 :**+=:..    .      .%@* .   .-##****+*+**#+==++=====+===--**####################
 ....             .   ...::.  ..:..::::.. ....   .        :==:   :-      ...    #% .++*%###*+*+*=*=++**+==+=--===-=-::***###################
....             .     .:::  ::.  .....::--:. ...        :-:   ..   .. .:       ..=+*#**+=+*=+=+=++=+===------+==--:.:**++##################
...                     ...---.  ..  .:.........  ...        ..        .:.   .   :*++++++==+=+=+=+-==---:::--===--:..:**+=*#################
..                 .      ::...:..  ..   :-::......    .         ..       :.... .*=+==-:=+=+==+===----:::::-==+--:....**+==#########%%%%%%%%
.         .       .       .  .--:..:.  .:.  .::.....::.        ..         ..  .:-+==+=--:=+=-====:----:::---=+=--:.. :**++-########%%%%%%%%%
          :.     .           ::...::. .::   .....::.   ...  ..     ..  ...     .+=---===----=--=--:=:.:-:::====-:.. .-**+==*###%%%%%%%%%%%%%
          :..    .           :  .:...::.  .:.  ..   .::.  ..    ...   .      .  *+--.-:--==:-----=-:-:--::==+==. .  .-**+*=**#%%%%%%%%%%%%%%
          ..-    . .         .  ::..::.. .:.  ..  .::.   ..  ..:     .   ....  .+=----....:---:--::---:.:--+==:......-***+-**#%%%%%%%%%%%%%%
           .-..  .              .  .....:-.....  .::.  ...  ...   ...   ..:.   :*=-::=---::::--:---:..::--+==--:.....=#*+++#%*%%%%%%%%%%%%%%
        -.  .::                 .  .. .--.  ... .::   .:.  ...   ...   ...     :*+:-..:.::--::---....:---=++-=:.....:+**+#+*%##%%%%%%%%%%%%%
        ::   :-     .              .  :-.  .:. ..:   :.. ...   .::.   ...     .-+=:--:.  ::::.:::--::-:-==+==:.....:-=#**#+#%##%%%%%%%%%%%%%
        -:-  .::.                     ..  ::.....   --.  ..   :::    ..    .:.::=+-...-::::::..--:....-==+==:...-:.:-+**#*=#@##%%%%%%%%%%%%%
        :-=   .:-                     .  ::. ..:. .::.. ... ..:.   ...  ..::..-.=-+.. .=:::::...:::::-==+==:::---..-+***#*+#@%*%%%%%%%%%%%%%
        .-+:   -=.                       ..  ::. .::  ..... ..   .:.. ..:..   :.=-=-.:--. ...:::.....:====:-:::.::-=*####**#@#*%%%%%%%%%%%%%
        .-==   :::. .                    .   ....:.   :-. ...   ::.  ...     .: -:=-.. --::::......:-=-====...----:+*######%@#*%%%%%%%%%%%%%
         -=+.  ..::.                 .   .  .. .:.  .::. ...  .::   ....  .::-- ::--..  :. ....:::..:==--==:.:-::==*##%####%%**%%%%%%%%%%%%%
         .=*:    -:-                    .   .  ..  .-: ..... ::.   .....:::::.: ..:-----:.  ....::---::====: .:===+*####*##%%**%%%%%%%%%%%%%
          :*+::-::--:                   .      .  .-:  .:......  .:.. ..:..   . ....-:-:-:...  .....----==:.:=%+==+*######%%#*#%%%%%%%%%%%%%
          .+*==-:.::-                      .      .:  .::. .:   .:.  ....  ...:... ::.. ::.....::--:.::==--==:%++-*######*##**#%%%%%%%%%%%%%
           :+*=::-.:.                  .   .     ..   .. . .  .::.  ... ..:---::...::    .   ...::----------+=@@++*#######%*+*##%%%%%%%%%%%%
            -*++=-=:.                  .         ..  .. .:..  ::  .... .::-::::-...:. . ..  ..... ...:----=+=+*@+*####**#%%#*#*#%%%%%%%%%%%%
             -++-:-+-.         .      .          .   .   .. .:.  .::....:.. ...- :::. .:.... ....:.::::--=-+==++*#####***#*+*#**%%%%%%%%%%%%
             .-=-===*:.                          .  ..  .. .:.  .:. ..:....:---- :-..--..-.    .:------:-===+=**##########**##**%%%%%%%%%%%%
              .---++#+.                  .      .   .      ..  :-.  .....:-====- :-..-:. ..   ....:::----===++*##############**+%%%%%%%%%%%%
               .-+=*%@=                  .      .  .       .  ::.  .:...:------- ...:..   .   ..   ..:----===*#########***###*++%%%%%%%%%%%%
     .        ...==#@#                  .          .      .   :.  .:...::-:..:-- ....     .  .      .:-==-++++*#######****###*++%%%%%%%%%%%%
   .          .:::=*#-                             .  .   .  .:.  ::. .::.....--...  .    .      ...:::=+=++*=*#######**+*#*+*++#%%%%%%%%%%%
     .         :--:+%:                                .   .  .:  .:. ..:.....::-...    ......    .:---:=+++*+*+###%###***##*++++#%%%%%%%%%%%
      .         :---#..                               .      ..  ::. .::. ...::-: .  :.-:.:...  .:-----=+*++**+##%%%#***#**#+===#%%%%%%%%%%%
    .  .      .:--=+-        .                        .  .  ...  :....::......:-: . ..--: .. .. .:::-=-++**+***##%###***#*+**+==*%%%%%%%%%%%
     .   .     :-**#:.       .                       .      :..  ::...::......:-- : ..:.   . ..::. .:===****#**#%%%##**#*+++*+++#%%%%%%%%%%%
  .   .   .  ...:*#%.       .           ..          ..     .::   ::...::. ..:.:-: ...::.   : .....  .-+***#*****%%%##**#**++++++*%%%%%%%%%%%
   .   .:  .. .--%%%.                   .           .       .-   -:...:.. ..:-:-- :...     . ..:.    -*****#*#**%####**###*+=+*++%%%%%%%%%%@
    .. ..::    .:*@+                   .                    .:  .-:..:::  ..:::.: : .   .  -.....   .:+****#*########***###*++++*%%%%%%%%%%@
 ..  :-..:::.  ..=@:           .      ..                    ..  .:..::.......:-::.. ... .  =.....    .=*###**#*######**#******+=+%%%%%%%%%%@
  ..  :---:::..  -@.                      .                 ..  .-:::.......::::: :.:::.   -......   .-**###**#######******#*+==*%%%%%%@@@@@`;

type ProjectFrame = "desktop" | "phone";

type Project = {
  title: string;
  year: string;
  slug: string;
  frame: ProjectFrame;
  description: string;
  stack: string[];
  media: string | string[] | null;
  link: string | null;
};

const projects: Project[] = [
    {
    title: "Network Supervisor",
    year: "2025",
    slug: "network-supervisor",
    frame: "desktop",
    description:
      "A supervisory control concept for inflight Wi-Fi systems made in collaboration with Société Européenne des Satellites (SES) using explicit state-driven recovery and device health monitoring. Won Purdue Senior Design Award in Spring 2026.",
    stack: ["Embedded", "CAN", "UART", "Systems"],
    media: "/videos/network-supervisor/fault-injection-test.mp4",
    link: null,
  },
  {
    title: "Graphics Engine",
    year: "2026",
    slug: "graphics-engine",
    frame: "desktop",
    description:
      "A real-time graphics engine with lighting, texture mapping, dual cameras, and rendering/debugging experiments.",
    stack: ["C++", "OpenGL", "GLSL", "CMake"],
    media: [
      "/videos/graphics-engine/demo-1.mov",
      "/videos/graphics-engine/demo-2.mov",
    ],
    link: "https://github.com/luisdiazgranados/computerGraphics",
  },
  {
    title: "Music Mood Model",
    year: "2026",
    slug: "music-mood-model",
    frame: "desktop",
    description:
      "A machine learning project that classifies songs by mood using audio features and arousal/valence labels.",
    stack: ["Python", "scikit-learn", "pandas"],
    media: null,
    link: "https://github.com/luisdiazgranados/ECE570Project",
  },
  {
    title: "JOS Operating System",
    year: "2026",
    slug: "jos-operating-system",
    frame: "desktop",
    description:
      "Operating systems work focused on memory management, environments, traps, syscalls, and low-level debugging.",
    stack: ["C", "x86", "GDB", "QEMU"],
    media: null,
    link: "https://github.com/luisdiazgranados/jos_fork",
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

function ProjectMedia({ project }: { project: Project }) {
  if (!project.media) return null;
  const items = Array.isArray(project.media) ? project.media : [project.media];
  return (
    <div className="flex h-full w-full">
      {items.map((src) =>
        src.endsWith(".mp4") || src.endsWith(".mov") ? (
          <video
            key={src}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className={`h-full object-cover ${items.length > 1 ? "w-1/2" : "w-full"}`}
          />
        ) : (
          <img
            key={src}
            src={src}
            alt={`${project.title} preview`}
            className={`h-full object-cover ${items.length > 1 ? "w-1/2" : "w-full"}`}
          />
        )
      )}
    </div>
  );
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
      className="pointer-events-none fixed z-40 hidden transition-opacity duration-200 md:block"
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
            : "w-[520px] rounded-[30px]"
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
            <ProjectMedia project={project} />
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

// Mobile inline card for tapped project
function MobileProjectCard({
  project,
  isLightMode,
}: {
  project: Project;
  isLightMode: boolean;
}) {
  return (
    <div
      className={`mt-2 overflow-hidden rounded-2xl border backdrop-blur-[24px] backdrop-saturate-200 ${
        isLightMode
          ? "border-white/60 bg-white/25 shadow-black/10"
          : "border-white/15 bg-white/[0.10] shadow-black/40"
      }`}
      style={{
        boxShadow: isLightMode
          ? "0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.45)"
          : "0 12px 40px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.10)",
      }}
    >
      {project.media && (
        <div className="flex h-[140px] items-center justify-center overflow-hidden">
          <ProjectMedia project={project} />
        </div>
      )}

      <div className="p-4">
        <p
          className={`text-[13px] leading-snug tracking-[-0.01em] ${
            isLightMode ? "text-neutral-700" : "text-neutral-300"
          }`}
        >
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={item}
              className={`rounded-full border px-2 py-0.5 text-[10px] backdrop-blur-[16px] ${
                isLightMode
                  ? "border-white/45 bg-white/20 text-neutral-700"
                  : "border-white/10 bg-white/[0.07] text-neutral-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-[12px] text-[#007AFF]"
          >
            view on github →
          </a>
        )}
      </div>
    </div>
  );
}

function AboutPreview({
  visible,
  isLightMode,
}: {
  visible: boolean;
  isLightMode: boolean;
}) {
  if (!visible) return null;

  return (
    <aside className="pointer-events-none fixed inset-0 z-50 hidden items-center justify-start pl-[36px] md:flex">
      <div
        className={`flex overflow-hidden rounded-[30px] border shadow-2xl backdrop-blur-[40px] backdrop-saturate-200 ${
          isLightMode
            ? "border-white/60 bg-white/25 shadow-black/15"
            : "border-white/15 bg-white/[0.10] shadow-black/50"
        }`}
        style={{
          boxShadow: isLightMode
            ? "0 24px 80px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.55)"
            : "0 24px 80px rgba(0, 0, 0, 0.50), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
          maxWidth: "min(92vw, 900px)",
          maxHeight: "78vh",
        }}
      >
        {/* ASCII headshot - left */}
        <div
          className={`flex shrink-0 items-center overflow-auto border-r p-5 ${
            isLightMode ? "border-white/30" : "border-white/10"
          }`}
          style={{ maxHeight: "78vh" }}
        >
          <pre
            className={`font-mono leading-[1.15] ${
              isLightMode ? "text-neutral-800" : "text-neutral-300"
            }`}
            style={{ fontSize: "clamp(2px, 0.42vw, 4.5px)" }}
            aria-label="ASCII art headshot of Luis"
          >
            {ASCII_HEADSHOT}
          </pre>
        </div>

        {/* Bio - right */}
        <div className="flex shrink-0 flex-col justify-center p-6" style={{ width: "240px" }}>
          <p
            className={`text-[14px] leading-relaxed tracking-[-0.01em] ${
              isLightMode ? "text-neutral-600" : "text-neutral-400"
            }`}
          >
            trying to build cool projects and find new ways to interact with
            software. marathon runner and music listener.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function HomePage() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [tappedProject, setTappedProject] = useState<Project | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition>({
    x: 410,
    y: 360,
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", !isLightMode);
  }, [isLightMode]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close tapped project when clicking outside
  useEffect(() => {
    if (!tappedProject) return;
    const handleTapOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-project-row]")) {
        setTappedProject(null);
      }
    };
    document.addEventListener("click", handleTapOutside);
    return () => document.removeEventListener("click", handleTapOutside);
  }, [tappedProject]);

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
    if (isMobile) return;
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

  const handleProjectTap = (project: Project) => {
    if (!isMobile) return;
    setTappedProject((prev) => (prev === project ? null : project));
  };

  const activeClass = (project: Project) => {
    if (!isMobile || tappedProject !== project) return "";
    return isLightMode
      ? "bg-white/25 shadow-[0_10px_35px_rgba(0,0,0,0.10)] ring-1 ring-white/60 backdrop-blur-[24px] backdrop-saturate-200 font-semibold"
      : "bg-white/[0.10] shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur-[24px] font-semibold";
  };

  return (
    <>
      {!isMobile && <AsciiPaintBackground />}
      <section
        ref={sectionRef}
        className={`relative z-10 min-h-screen select-none overflow-hidden ${mainText}`}
      >
        {/* Desktop layout */}
        <div className="relative mx-[36px] hidden min-h-screen md:block">
          <div className="absolute left-[104px] top-1/2 w-[272px] -translate-y-1/2">
            {projects.map((project) => {
              const className = `group relative grid grid-cols-[1fr_auto] rounded-full px-4 py-2.5 text-[15px] font-normal leading-none tracking-[-0.03em] ${secondaryText} transition-all duration-200 ${hoverText} hover:font-semibold ${
                isLightMode
                  ? "hover:bg-white/25 hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)] hover:ring-1 hover:ring-white/60 hover:backdrop-blur-[24px] hover:backdrop-saturate-200"
                  : "hover:bg-white/[0.10] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:ring-1 hover:ring-white/15 hover:backdrop-blur-[24px]"
              }`;
              const children = (
                <>
                  <span>{project.title}</span>
                  <span
                    className={`text-neutral-500 transition ${yearHover} group-hover:font-semibold`}
                  >
                    {project.year}
                  </span>
                </>
              );
              const hoverProps = {
                onMouseEnter: (event: MouseEvent<HTMLElement>) =>
                  handleProjectMouseMove(event as MouseEvent<HTMLAnchorElement>, project),
                onMouseMove: (event: MouseEvent<HTMLElement>) =>
                  handleProjectMouseMove(event as MouseEvent<HTMLAnchorElement>, project),
                onMouseLeave: () => setActiveProject(null),
              };

              return project.link ? (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                  {...hoverProps}
                >
                  {children}
                </a>
              ) : (
                <div
                  key={project.title}
                  className={className}
                  {...hoverProps}
                >
                  {children}
                </div>
              );
            })}
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
                <button
                  type="button"
                  className={`cursor-pointer ${navBubbleClass}`}
                  onMouseEnter={() => setShowAbout(true)}
                  onMouseLeave={() => setShowAbout(false)}
                >
                  about
                </button>

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

          <AboutPreview visible={showAbout} isLightMode={isLightMode} />
        </div>

        {/* Mobile layout */}
        <div className="flex min-h-screen flex-col justify-center px-6 py-16 md:hidden">
          <button
            type="button"
            onClick={() => setIsLightMode((current) => !current)}
            className="cursor-pointer text-left"
            aria-label="Toggle light mode"
          >
            <h1
              className={`text-[22px] font-semibold leading-tight tracking-[-0.03em] ${mainText}`}
            >
              Luis Diaz Granados,
              <br />
              <span className={secondaryText}>computer engineer</span>
            </h1>
          </button>

          <div className="mt-8">
            {projects.map((project) => (
              <div key={project.title} data-project-row>
                <button
                  type="button"
                  onClick={() => handleProjectTap(project)}
                  className={`group relative grid w-full grid-cols-[1fr_auto] rounded-full px-4 py-2.5 text-left text-[15px] font-normal leading-none tracking-[-0.03em] ${secondaryText} transition-all duration-200 ${activeClass(project)}`}
                >
                  <span className={tappedProject === project ? mainText : ""}>{project.title}</span>
                  <span className="text-neutral-500">
                    {project.year}
                  </span>
                </button>

                {tappedProject === project && (
                  <MobileProjectCard
                    project={project}
                    isLightMode={isLightMode}
                  />
                )}
              </div>
            ))}
          </div>

          <nav
            className={`mt-8 flex flex-wrap gap-2 text-[17px] leading-none ${navText}`}
          >
            <button
              type="button"
              className={`cursor-pointer ${navBubbleClass}`}
              onClick={() => setShowAbout((v) => !v)}
            >
              about
            </button>

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

          {showAbout && (
            <div
              className={`mt-6 flex overflow-hidden rounded-2xl border backdrop-blur-[24px] backdrop-saturate-200 ${
                isLightMode
                  ? "border-white/60 bg-white/25 shadow-black/10"
                  : "border-white/15 bg-white/[0.10] shadow-black/40"
              }`}
              style={{
                boxShadow: isLightMode
                  ? "0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.45)"
                  : "0 12px 40px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.10)",
              }}
            >
              <div
                className={`flex shrink-0 items-center overflow-auto border-r p-3 ${
                  isLightMode ? "border-white/30" : "border-white/10"
                }`}
              >
                <pre
                  className={`font-mono leading-[1.1] ${
                    isLightMode ? "text-neutral-800" : "text-neutral-300"
                  }`}
                  style={{ fontSize: "1.8px" }}
                  aria-label="ASCII art headshot of Luis"
                >
                  {ASCII_HEADSHOT}
                </pre>
              </div>
              <div className="flex flex-col justify-center p-4">
                <p
                  className={`text-[12px] leading-relaxed ${
                    isLightMode ? "text-neutral-600" : "text-neutral-400"
                  }`}
                >
                  trying to build cool projects and find new ways to interact
                  with software. marathon runner and music listener.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
