"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  MapPin,
  Ticket,
  Trophy,
  ArrowRight,
  Brain,
  Rabbit,
  Building2,
  Cpu,
  ExternalLink,
  Briefcase,
  Music,
  Palette,
  LucideIcon, 
  Target,   
  Ghost,    
  Layers, // Added Layers import which was missing in your snippet for Tower Tactix
} from "lucide-react";
import { EasingDefinition, motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";
import { ReactNode } from "react";

// --- LINKS & DATA ---
const MAP_LINK =
  "https://www.google.com/maps/place/St.+Joseph's+Extended+Campus,+Caprotti+Hall/@17.3956981,78.4781228,354m/data=!3m1!1e3!4m6!3m5!1s0x3bcb99d906ae58a5:0xeab3fa00e26d95f0!8m2!3d17.3950167!4d78.4780256!16s%2Fg%2F11b6gjmpdt?entry=tts&g_ep=EgoyMDI2MDEyMC4wIPu8ASoASAFQAw%3D%3D&skid=88f89f8a-dc44-4e51-8686-6ee2290100e6";
const CALENDAR_LINK =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=INNOVESTA+2026&dates=20260124T090000/20260124T180000&details=Management+Fest+at+St.+Joseph's+Degree+%26+PG+College.+Don't+miss+it!&location=St.+Joseph's+Degree+%26+PG+College,+King+Koti+Road,+Hyderabad";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as EasingDefinition,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export default function Home() {
  return (
    <TooltipProvider delayDuration={0}>
      {/* UPDATED: Added environment variables for safe areas 
        pt-[env(safe-area-inset-top)] handles the top notch
        pb-[env(safe-area-inset-bottom)] handles the bottom home indicator
      */}
      <main className="min-h-screen relative overflow-x-hidden bg-[#0f0518] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <StarBackground />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-16 sm:pt-20 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 flex flex-col items-center text-center z-10 min-h-screen justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto w-full"
          >
            {/* College Header */}
            <motion.div
              variants={fadeInUp}
              className="mb-4 sm:mb-6 space-y-1 sm:space-y-2"
            >
              <p className="text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase text-purple-300 font-semibold drop-shadow-lg">
                St. Joseph's Degree & PG College
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-xs text-purple-400 font-mono">
                DEPARTMENT OF BUSINESS MANAGEMENT
              </p>
              <p className="text-[0.65rem] sm:text-xs md:text-xs text-purple-400 font-mono">
                Presents
              </p>
            </motion.div>

            {/* Title */}
            <motion.div
              variants={fadeInUp}
              className="relative mb-6 sm:mb-8 group"
            >
              {/* Glow background layer */}
              <div className="absolute inset-0 opacity-30 blur-2xl">
                <div className="w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 rounded-full"></div>
              </div>

              {/* Main text with gradient */}
              <h1 className="relative z-10 text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300 drop-shadow-[0_0_20px_rgba(217,70,239,0.8)] drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]">
                  INNOVESTA
                </span>
              </h1>

              {/* Accent glows */}
              <div className="absolute -top-8 sm:-top-10 -right-8 sm:-right-10 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-pink-500 rounded-full blur-[80px] sm:blur-[100px] opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-8 sm:-bottom-10 -left-8 sm:-left-10 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-purple-600 rounded-full blur-[80px] sm:blur-[100px] opacity-40 animate-pulse delay-1000"></div>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white/90 mt-[-10px] sm:mt-[-15px] md:mt-[-20px] mb-6 sm:mb-8"
            >
              2026
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-purple-200 mb-8 sm:mb-10 md:mb-12 font-light italic px-2"
            >
              A Platform for Ideas and Innovation
            </motion.p>

            {/* BADGES */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-full px-2"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={CALENDAR_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <div className="cursor-pointer flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-purple-100 hover:bg-white/10 hover:border-pink-500/50 transition-all group text-sm sm:text-base">
                      <Calendar className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-medium">24 January, 2026</span>
                    </div>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1a0b2e] border-purple-500/30 text-white">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Add to Google Calendar
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <div className="cursor-pointer flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-purple-100 hover:bg-white/10 hover:border-purple-500/50 transition-all group text-sm sm:text-base">
                      <MapPin className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-medium">BBA Block, King Koti</span>
                    </div>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1a0b2e] border-purple-500/30 text-white p-3 max-w-xs">
                  <div className="space-y-1 text-center">
                    <p className="font-bold text-purple-300 text-xs uppercase tracking-wider">
                      Navigate To
                    </p>
                    <p className="font-semibold text-sm">
                      St. Joseph's Degree & PG College
                    </p>
                    <p className="text-xs text-gray-400">
                      King Koti Road, Hyderabad
                    </p>
                    <div className="mt-2 w-full h-24 bg-purple-900/50 rounded overflow-hidden relative">
                      <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white drop-shadow-md" />
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="../register" className="block w-full sm:w-auto px-2">
                <Button className="animate-heartbeat relative overflow-hidden bg-white text-black hover:text-white hover:bg-transparent  px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-full transition-all duration-300 group w-full sm:w-auto min-h-[44px] sm:min-h-auto">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  <span className="relative flex items-center justify-center gap-2 font-bold">
                    Register Now{" "}
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* --- PRICING SECTION --- */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          <TiltCard delay={0.1} borderColor="border-pink-500/50">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4">
              <div className="p-2 sm:p-3 bg-pink-500/20 rounded-full">
                <Ticket className="w-6 sm:w-8 h-6 sm:h-8 text-pink-400" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Entry: ₹100
              </h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-purple-200 mb-4">
              {" "}
              <span className="text-pink-400 font-bold">FREE! </span>
              for Josephietes
            </p>
            <div className="h-px w-full bg-gradient-to-r from-pink-500/50 to-transparent my-4"></div>
            <p className="text-xs sm:text-sm text-gray-400 font-mono">
              Includes 1 Game for Free
            </p>
          </TiltCard>

          <TiltCard delay={0.3} borderColor="border-yellow-500/50">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4">
              <div className="p-2 sm:p-3 bg-yellow-500/20 rounded-full">
                <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Prize Pool
              </h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-purple-200 mb-2">
              Total cash prizes worth
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 drop-shadow-md">
              ₹1,00,000
            </p>
          </TiltCard>
        </section>

        {/* --- EVENTS SECTION (UPDATED) --- */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-3 sm:mb-4">
              Our Events
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-purple-300 max-w-2xl mx-auto px-4">
              Six unique challenges designed to test your business acumen,
              creativity, and technical skills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
            {/* Formal Column */}
            <EventColumn
              title="Formal Events"
              colorClass="text-pink-400"
              borderColor="border-pink-500/30"
            >
              <EventItem
                href="/events/venture-vault"
                icon={Briefcase}
                title="Venture Vault"
                desc="Pitch your startup idea to investors."
                color="group-hover:text-pink-400"
                border="group-hover:border-pink-500/50"
              />

              <EventItem
                href="/events/brand-revival"
                icon={Building2}
                title="Brand Revival"
                desc="Revive a declining or discontinued brand by presenting a creative and feasible revival strategy." 
                color="group-hover:text-pink-400"
                border="group-hover:border-pink-500/50"
              />
            </EventColumn>

            {/* Informal Column */}
            <EventColumn
              title="Informal Events"
              colorClass="text-purple-400"
              borderColor="border-purple-500/30"
            >
               <EventItem
                href="/events/tech-trek"
                icon={Cpu}
                title="Tech Trek"
                desc="The ultimate IT & Business quiz."
                color="group-hover:text-pink-400"
                border="group-hover:border-pink-500/50"
              />
              
              <EventItem
                href="/events/meme-market"
                icon={Rabbit}
                title="Meme Market"
                desc="Viral marketing through humor."
                color="group-hover:text-purple-400"
                border="group-hover:border-purple-500/50"
              />
              <EventItem
                href="/events/tune-trap"
                icon={Music}
                title="Tune Trap"
                desc="A music-based fun quiz identifying tunes and lyrics through multiple elimination rounds."
                color="group-hover:text-purple-400"
                border="group-hover:border-purple-500/50"
              />
              <EventItem
                href="/events/corporate-canvas"
                icon={Palette}
                title="Corporate Canvas"
                desc="Design the future of ads."
                color="group-hover:text-purple-400"
                border="group-hover:border-purple-500/50"
              />
            </EventColumn>
          </div>
        </section>

        {/* --- Games SECTION --- */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-3 sm:mb-4">
              Our Games
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-purple-300 max-w-2xl mx-auto px-4">
              Fun and engaging mini-games to test your luck, memory, and skills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-12 lg:gap-24">
            {/* Games Column */}
            <EventColumn
              title="Fun Zone Games"
              colorClass="text-pink-400"
              borderColor="border-pink-500/30"
            >
              <EventItem
                href="./games/chicken-duck"
                icon={Ghost}
                title="Chicken Duck"
                desc="A fun-filled group game where a blindfolded player tries to tag others using a sponge stick within a limited area ."
                color="group-hover:text-purple-400"
                border="group-hover:border-purple-500/50"
              />
              <EventItem
                href="./games/memory-game"
                icon={Brain}
                title="Flip & Recall"
                desc="Sharpen your mind by finding matching pairs of hidden cards in this engaging test of observation and recall skills."
                color="group-hover:text-pink-400"
                border="group-hover:border-pink-500/50"
              />
              <EventItem
                href="./games/balloon-dart"
                icon={Target}
                title="Balloon Dart"
                desc="Test your aim and accuracy by attempting to pop three consecutive balloons using five provided darts."
                color="group-hover:text-purple-400"
                border="group-hover:border-purple-500/50"
              />
              <EventItem
                href="./games/tower-tact"
                icon={Layers}
                title="Tower Tactix"
                desc="A time-based cup stacking challenge that tests your fast hands and sharp focus to build and unstack perfect patterns ."
                color="group-hover:text-pink-400"
                border="group-hover:border-pink-500/50"
              />
            </EventColumn>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/10 py-8 sm:py-10 md:py-12 text-center mt-12 sm:mt-16 md:mt-20 px-4 pb-[env(safe-area-inset-bottom)]">
          <p className="text-purple-300/60 text-xs sm:text-sm">
            © 2026 Innovesta. Designed by Bobby & Piyush.
          </p>
        </footer>
      </main>
    </TooltipProvider>
  );
}

// --- ANIMATED SUB COMPONENTS ---

const TiltCard = ({
  children,
  delay,
  borderColor,
}: {
  children: React.ReactNode;
  delay: number;
  borderColor: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className={`bg-[#120822]/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border ${borderColor} shadow-2xl relative overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-white/5 rounded-full blur-2xl -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 group-hover:bg-white/10 transition-colors"></div>
      {children}
    </motion.div>
  );
};

const EventColumn = ({
  title,
  colorClass,
  borderColor,
  children,
}: {
  title: string;
  colorClass: string;
  borderColor?: string;
  children: ReactNode;
}) => (
  <div className="space-y-4 sm:space-y-6">
    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-3 sm:pb-4">
      <h3
        className={`text-2xl sm:text-3xl font-bold ${colorClass} font-serif tracking-wide`}
      >
        {title}
      </h3>
      <div
        className={`h-1 flex-1 bg-gradient-to-r from-transparent to-transparent ${title.includes("Formal") ? "via-pink-500/50" : "via-purple-500/50"} rounded-full`}
      ></div>
    </div>

    {/* We moved the motion wrapper here to ensure immediate rendering structure */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger sooner (when 20% visible)
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1, // Faster stagger (was 0.15)
            // Removed delayChildren: 0.3 (This was the lag!)
          },
        },
      }}
      className="space-y-3 sm:space-y-4"
    >
      {children}
    </motion.div>
  </div>
);

// Optimized EventItem: Added Link Wrapper
const EventItem = ({
  title,
  desc,
  icon: Icon,
  color,
  border,
  href = "#",
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  border: string;
  href: string;
}) => (
  <Link href={href} className="block">
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 }, // Changed x to y for a cleaner 'pop up' feel which lags less visually
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }}
      whileHover={{ scale: 1.02, x: 5 }}
      className={`group relative bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-[#1a0b2e] ${border} p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden shadow-lg min-h-[80px] sm:min-h-[90px] flex items-center`}
    >
      {/* Hover Gradient Background */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${title.includes("Venture") ? "from-pink-500" : "from-purple-500"} to-transparent transition-opacity duration-500`}
      ></div>

      <div className="relative flex items-center justify-between z-10 w-full">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 md:gap-5 flex-1 min-w-0">
          <div
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300 ${color} group-hover:bg-white/10 shrink-0`}
          >
            <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className={`text-base sm:text-lg md:text-xl font-bold text-white ${color} transition-colors truncate sm:whitespace-normal`}
            >
              {title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
              {desc}
            </p>
          </div>
        </div>

        {/* Arrow Reveal Animation */}
        <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 ml-2">
          <ArrowRight className={`w-4 sm:w-5 h-4 sm:h-5 ${color}`} />
        </div>
      </div>
    </motion.div>
  </Link>
);