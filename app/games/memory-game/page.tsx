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
  Brain, 
  Trophy, 
  Grid, 
} from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";
import InfoCard from "@/components/events/InfoCard";

export default function FlipRecallPage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white relative overflow-hidden">
      <StarBackground />
      <div className="fixed top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-purple-300 hover:text-white mb-6 sm:mb-8 transition-colors text-xs sm:text-sm">
          <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center md:items-start">
            <div className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl shrink-0">
              <Brain className="w-8 sm:w-12 h-8 sm:h-12 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-500 mb-2">
                Flip & Recall
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
                Test your observation and recall skills in our Memory Game Challenge.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <InfoCard icon={Calendar} label="Date" value="24 Jan, 2026" />
              <InfoCard icon={Clock} label="Time" value="11 AM - 3 PM" />
              <InfoCard icon={MapPin} label="Venue" value="Room 402" />
              <InfoCard icon={Users} label="Team" value="2 Members" />
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" /> Game Structure
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  A classic memory game conducted on 3 tables. Teams have to find matching pairs from a set of cards that are shown briefly.
                </p>
                <div className="space-y-2 sm:space-y-3 pt-2">
                  <div className="flex gap-2 sm:gap-3">
                    <Badge variant="outline" className="border-cyan-500 text-cyan-400 h-fit mt-0.5 sm:mt-1 text-xs sm:text-sm shrink-0">Phase 1</Badge>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Observation</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Cards will be shown face-up for 30 seconds, then flipped down.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <Badge variant="outline" className="border-indigo-500 text-indigo-400 h-fit mt-0.5 sm:mt-1 text-xs sm:text-sm shrink-0">Phase 2</Badge>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Recall</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Teams get 1 minute to find matching pairs. Members play alternately.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Rules & Regulations</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Cards shown for 30 seconds only.",
                  "Teams have 1 minute to match pairs.",
                  "Team members must play alternately.",
                  "Only one round will be conducted.",
                  "No external assistance allowed."
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-4 sm:space-y-6">
            <Card className="bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border-cyan-500/30">
              <CardContent className="p-4 sm:p-6 text-center">
                <h3 className="text-sm sm:text-lg font-semibold text-cyan-200 mb-1">Entry Fee</h3>
                <p className="text-3xl sm:text-4xl font-bold text-cyan-400">₹50</p>
                <p className="text-xs sm:text-sm text-cyan-200/60 mt-2">Per Team</p>
              </CardContent>
            </Card>

            <div className="w-full bg-white/5 border border-white/10 rounded-lg p-6 text-center">
              <p className="text-lg font-bold text-white mb-2">Registration</p>
              <p className="text-gray-400 text-sm mb-4">
                This is a spot event. Please visit Room 402 to register.
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