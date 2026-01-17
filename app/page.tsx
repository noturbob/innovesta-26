"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Calendar, MapPin, Ticket, Trophy, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";

// --- LINKS & DATA ---
const MAP_LINK = "https://maps.app.goo.gl/6FPovwRcz7bVkU1m7";
const CALENDAR_LINK = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=INNOVESTA+2026&dates=20260124T090000/20260124T180000&details=Management+Fest+at+St.+Joseph's+Degree+%26+PG+College.+Don't+miss+it!&location=St.+Joseph's+Degree+%26+PG+College,+King+Koti+Road,+Hyderabad";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <TooltipProvider delayDuration={0}>
      <main className="min-h-screen relative overflow-x-hidden bg-[#0f0518]">
        
        {/* 3D BACKGROUND LAYER */}
        <StarBackground />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center z-10 min-h-screen justify-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* College Header */}
            <motion.div variants={fadeInUp} className="mb-6 space-y-2">
              <p className="text-sm md:text-base tracking-[0.2em] uppercase text-purple-300 font-semibold drop-shadow-lg">
                St. Joseph&apos;s Degree & PG College
              </p>
              <p className="text-xs text-purple-400 font-mono">Department of Business Management Presents</p>
            </motion.div>

            {/* 3D-ish Title */}
            <motion.div variants={fadeInUp} className="relative mb-8 group">
              <h1 className="text-6xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10 relative">
                INNOVESTA
              </h1>
              <h2 className="text-5xl md:text-7xl font-serif text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm scale-110 pointer-events-none">
                INNOVESTA
              </h2>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600 rounded-full blur-[100px] opacity-40 animate-pulse delay-1000"></div>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-serif text-white/90 mt-[-20px] mb-8">
              2026
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-purple-200 mb-10 font-light italic">
              "A Platform for Ideas and Innovation"
            </motion.p>

            {/* INTERACTIVE BADGES */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-12">
               
               {/* 1. DATE BADGE (Add to Calendar) */}
               <Tooltip>
                 <TooltipTrigger asChild>
                   <a href={CALENDAR_LINK} target="_blank" rel="noreferrer">
                     <div className="cursor-pointer flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-purple-100 hover:bg-white/10 hover:border-pink-500/50 transition-all group">
                        <Calendar className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">24 January, 2026</span>
                     </div>
                   </a>
                 </TooltipTrigger>
                 <TooltipContent className="bg-[#1a0b2e] border-purple-500/30 text-white">
                   <p className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Add to Google Calendar</p>
                 </TooltipContent>
               </Tooltip>

               {/* 2. LOCATION BADGE (Open Map) */}
               <Tooltip>
                 <TooltipTrigger asChild>
                   <a href={MAP_LINK} target="_blank" rel="noreferrer">
                     <div className="cursor-pointer flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-purple-100 hover:bg-white/10 hover:border-purple-500/50 transition-all group">
                        <MapPin className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">BBA Block, King Koti</span>
                     </div>
                   </a>
                 </TooltipTrigger>
                 <TooltipContent className="bg-[#1a0b2e] border-purple-500/30 text-white p-3 max-w-xs">
                   <div className="space-y-1 text-center">
                     <p className="font-bold text-purple-300 text-xs uppercase tracking-wider">Navigate To</p>
                     <p className="font-semibold text-sm">St. Joseph&apos;s Degree & PG College</p>
                     <p className="text-xs text-gray-400">King Koti Road, Hyderabad</p>
                     <div className="mt-2 w-full h-24 bg-purple-900/50 rounded overflow-hidden relative">
                       {/* Abstract Map Preview Visual */}
                       <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                         <ExternalLink className="w-6 h-6 text-white drop-shadow-md" />
                       </div>
                     </div>
                   </div>
                 </TooltipContent>
               </Tooltip>

            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="../register">
                <Button className="relative overflow-hidden bg-white text-black hover:text-white hover:bg-transparent border border-white px-10 py-7 text-lg rounded-full transition-all duration-300 group">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  <span className="relative flex items-center gap-2 font-bold">
                    Register Now <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* --- PRICING & PRIZES (Scroll Reveal) --- */}
        <section className="px-4 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
          <TiltCard delay={0.1} borderColor="border-pink-500/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-pink-500/20 rounded-full"><Ticket className="w-8 h-8 text-pink-400" /></div>
              <h3 className="text-3xl font-bold text-white">Entry: ₹100</h3>
            </div>
            <p className="text-purple-200 mb-4 text-lg">Includes 1 Game for <span className="text-pink-400 font-bold">FREE!</span></p>
            <div className="h-px w-full bg-gradient-to-r from-pink-500/50 to-transparent my-4"></div>
            <p className="text-sm text-gray-400 font-mono">* Extra games: ₹50 each.</p>
          </TiltCard>

          <TiltCard delay={0.3} borderColor="border-yellow-500/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-full"><Trophy className="w-8 h-8 text-yellow-400" /></div>
              <h3 className="text-3xl font-bold text-white">Prize Pool</h3>
            </div>
            <p className="text-purple-200 text-lg mb-2">Total cash prizes worth</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 drop-shadow-md">
              ₹1,00,000
            </p>
          </TiltCard>
        </section>

        {/* --- EVENTS SECTION --- */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-4"><Sparkles className="inline-block w-8 h-8 md:w-12 md:h-12 text-pink-500 mb-2 mr-4" />Our Events</h2>
            <p className="text-purple-300">Compete. Innovate. Win.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Formal */}
            <EventColumn title="Formal Events" color="text-pink-400">
              <EventItem title="Venture Vault" desc="Business Plan Competition" delay={0.1} />
              <EventItem title="Brand Revival" desc="Marketing & Rebranding Strategy" delay={0.2} />
              <EventItem title="Tech Trek" desc="IT & Business Tech Quiz" delay={0.3} />
            </EventColumn>

            {/* Informal */}
            <EventColumn title="Informal Events" color="text-purple-400">
              <EventItem title="Meme Market" desc="Creative Marketing with Humor" delay={0.4} />
              <EventItem title="Tune Trap" desc="Musical & Rhythm Challenge" delay={0.5} />
              <EventItem title="Corporate Canvas" desc="Poster & Art Design" delay={0.6} />
            </EventColumn>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/10 py-12 text-center mt-20">
           <p className="text-purple-300/60 text-sm">© 2026 Innovesta. Designed by IT Dept.</p>
        </footer>
      </main>
    </TooltipProvider>
  );
}

// --- SUB COMPONENTS ---

const TiltCard = ({ children, delay, borderColor }: { children: React.ReactNode, delay: number, borderColor: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className={`bg-[#120822]/80 backdrop-blur-xl p-10 rounded-3xl border ${borderColor} shadow-2xl relative overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
      {children}
    </motion.div>
  );
};

const EventColumn = ({ title, color, children }: { title: string, color: string, children: React.ReactNode }) => (
  <div className="space-y-6">
    <h3 className={`text-3xl font-bold ${color} border-b border-white/10 pb-4 mb-8 font-serif tracking-wide`}>{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const EventItem = ({ title, desc, delay }: { title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, x: 10 }}
    className="group bg-white/5 hover:bg-white/10 border border-white/5 p-6 rounded-xl cursor-pointer transition-all"
  >
    <h4 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">{title}</h4>
    <p className="text-sm text-gray-400 mt-1">{desc}</p>
  </motion.div>
);