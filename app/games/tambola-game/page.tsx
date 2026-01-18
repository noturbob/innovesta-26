"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Phone, 
  Trophy, 
  Grid3X3, // Using Grid for the Ticket/Numbers vibe
} from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";

export default function TambolaPage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white relative overflow-hidden">
      
      {/* Background */}
      <StarBackground />
      
      {/* Floating Blobs (Emerald/Teal for "Luck" Vibe) */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-purple-300 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        {/* --- HEADER SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <Grid3X3 className="w-12 h-12 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-teal-500 mb-2">
                Tambola
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                The Classic Game of Chance. Mark your numbers, complete the patterns, and be the first to shout "Tambola!" to win.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: DETAILS & TIMELINE --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <InfoCard icon={Calendar} label="Date" value="24 Jan, 2026" />
              <InfoCard icon={Clock} label="Time" value="Slot-wise" />
              <InfoCard icon={MapPin} label="Venue" value="Room 401" />
              <InfoCard icon={Users} label="Entry" value="Individual" />
            </div>

            {/* Event Description */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> Game Format
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  [cite_start]The game will be conducted in multiple slots throughout the day[cite: 79]. Players must buy a ticket and mark the numbers called out by the host. Winning patterns include Early 5, Rows, and Full House.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 h-fit mt-1">Timings</Badge>
                    <div>
                      <h4 className="font-semibold text-white">Announced on Spot</h4>
                      [cite_start]<p className="text-sm text-gray-400">Game timing will be announced 15 minutes prior to each slot[cite: 80].</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-teal-500 text-teal-400 h-fit mt-1">Requirement</Badge>
                    <div>
                      <h4 className="font-semibold text-white">Be Present</h4>
                      [cite_start]<p className="text-sm text-gray-400">Participants must be present in the room before the game begins[cite: 81].</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Rules & Regulations</h3>
              <ul className="grid gap-3">
                {[
                  "Late entry will not be allowed once the game starts.",
                  "Individual participation only (no teams allowed).",
                  "Participants must strictly follow the organizer's instructions.",
                  "Any form of disturbance or misconduct leads to disqualification.",
                  "Prize money/gifts will be awarded to winners of each slot."
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>

          {/* --- RIGHT COLUMN: COORDINATORS & CTA --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            
            {/* Prize Card */}
            <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-emerald-200 mb-1">Entry Fee</h3>
                <p className="text-4xl font-bold text-emerald-400">₹30</p>
                <p className="text-sm text-emerald-200/60 mt-2">Per Participant</p>
              </CardContent>
            </Card>

              {/* Coordinators */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Student Coordinators</h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-300 font-bold">AK</div>
                  <div>
                    <p className="text-white font-medium">Saranya Jeelugula</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">PS</div>
                  <div>
                    <p className="text-white font-medium">Gurbakshish Kaur</p>
                  </div>
                </div>

                 <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-300 font-bold">PS</div>
                  <div>
                    <p className="text-white font-medium">Prachi Asawa</p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Non-clickable Contact Block */}
            <div className="w-full bg-white/5 border border-white/10 rounded-lg p-6 text-center">
              <p className="text-lg font-bold text-white mb-2">Registration</p>
              <p className="text-gray-400 text-sm mb-4">
                This is a spot event. Please visit the venue or contact the coordinators to register.
              </p>
              <Button disabled className="w-full bg-white/10 text-gray-400 cursor-not-allowed">
                Contact Coordinator to Register
              </Button>
            </div>

          </motion.div>

        </div>
      </div>
    </main>
  );
}

// Simple Helper Component for the Info Grid
function InfoCard({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
      <Icon className="w-6 h-6 text-emerald-400 mb-2" />
      <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}