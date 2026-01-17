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
  Zap, // Changed to Zap for Tech/Electricity vibe
} from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";
import InfoCard from "@/components/events/InfoCard";

export default function TechTrekPage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white relative overflow-hidden">
      
      {/* Background */}
      <StarBackground />
      
      {/* Floating Blobs (Blue/Cyan for Tech Vibe) - Responsive */}
      <div className="fixed top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-blue-600/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-cyan-600/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-blue-300 hover:text-white mb-6 sm:mb-8 transition-colors text-xs sm:text-sm">
          <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" /> Back to Home
        </Link>

        {/* --- HEADER SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center md:items-start">
            <div className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl shrink-0">
              <Zap className="w-8 sm:w-12 h-8 sm:h-12 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-500 mb-2">
                Tech Trek
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
                The Ultimate IT & Business Quiz. Navigate through rounds of coding, trivia, and rapid-fire questions to prove your technical supremacy.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
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
              <InfoCard icon={Clock} label="Time" value="01:00 PM" />
              <InfoCard icon={MapPin} label="Venue" value="Computer Lab 1" />
              <InfoCard icon={Users} label="Team Size" value="2 Members" />
            </div>

            {/* Event Description */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> Event Structure
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  A multi-stage competition designed to test your knowledge of current tech trends, business tech, and logical reasoning.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-blue-500 text-blue-400 h-fit mt-1">Round 1</Badge>
                    <div>
                      <h4 className="font-semibold text-white">Binary Blitz (Written)</h4>
                      <p className="text-sm text-gray-400">30 MCQs on IT, AI, and Business Tech in 20 minutes.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-cyan-500 text-cyan-400 h-fit mt-1">Round 2</Badge>
                    <div>
                      <h4 className="font-semibold text-white">The Debug (Finals)</h4>
                      <p className="text-sm text-gray-400">Buzzer round involving tech trivia, logo guessing, and debugging logic.</p>
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
                  "Usage of mobile phones or smartwatches is strictly prohibited during rounds.",
                  "Tie-breaker questions will be used if scores are level.",
                  "Quiz master's decision is final and binding.",
                  "Teams must report to the venue 15 minutes prior to the start.",
                  "Any form of malpractice will lead to immediate disqualification."
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
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-200 mb-1">Winner Prize</h3>
                <p className="text-4xl font-bold text-blue-400">₹10,000</p>
                <p className="text-sm text-blue-200/60 mt-2">+ Trophy & Certificates</p>
              </CardContent>
            </Card>

            {/* Coordinators */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Student Coordinators</h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold">RM</div>
                  <div>
                    <p className="text-white font-medium">Rohan M.</p>
                    <a href="tel:+919876543218" className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> +91 98765 43218
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">AL</div>
                  <div>
                    <p className="text-white font-medium">Ananya L.</p>
                    <a href="tel:+919876543219" className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> +91 98765 43219
                    </a>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Register Button */}
            <Link href="/register" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-lg font-bold shadow-lg shadow-blue-500/25">
                Register for Event
              </Button>
            </Link>
            <p className="text-xs text-center text-gray-500">
              *Registration fee includes entry to this event.
            </p>

          </motion.div>

        </div>
      </div>
    </main>
  );
}

