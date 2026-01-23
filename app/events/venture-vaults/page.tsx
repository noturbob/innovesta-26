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
  Briefcase 
} from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";
import InfoCard from "@/components/events/InfoCard";

export default function VentureVaultPage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white relative overflow-hidden">
      
      {/* Background */}
      <StarBackground />
      
      {/* Floating Blobs for aesthetics - responsive sizes */}
      <div className="fixed top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-pink-600/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-purple-600/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-purple-300 hover:text-white mb-6 sm:mb-8 transition-colors text-xs sm:text-sm">
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
              <Briefcase className="w-8 sm:w-12 h-8 sm:h-12 text-pink-500" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-500 mb-2">
                Venture Vault
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
                The Ultimate Business Plan Competition. Pitch your startup idea to a panel of investors and win seed funding.
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
            className="md:col-span-2 space-y-6 sm:space-y-8"
          >
            
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <InfoCard icon={Calendar} label="Date" value="24 Jan, 2026" />
              <InfoCard icon={Clock} label="Time" value="10:30 AM - 12:00 PM" />
              <InfoCard icon={MapPin} label="Venue" value="201" />
              <InfoCard icon={Users} label="Team Size" value="2 - 4 Members" />
            </div>

            {/* Event Description */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" /> Event Structure
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Only shortlisted teams progress to the next round. The event consists of three competitive stages:
                </p>
                <div className="space-y-2 sm:space-y-3 pt-2">
                  <div className="flex gap-2 sm:gap-3">
                    <Badge variant="outline" className="border-pink-500 text-pink-400 h-fit mt-0.5 sm:mt-1 text-xs sm:text-sm shrink-0">Round 1</Badge>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Executive Summary Screening</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Submit a 1-2 page executive summary. Shortlisting based on clarity, originality, and feasibility.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <Badge variant="outline" className="border-purple-500 text-purple-400 h-fit mt-0.5 sm:mt-1 text-xs sm:text-sm shrink-0">Round 2</Badge>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Business Model Pitch</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Present a structured PPT on problem, solution, market, and revenue model + Q&A.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400 h-fit mt-0.5 sm:mt-1 text-xs sm:text-sm shrink-0">Round 3</Badge>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Final Shark Tank</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Investor-style pitch with live questioning and negotiation.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Rules & Regulations</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Teams must adhere to time limits; exceeding may lead to disqualification.",
                  "All content and ideas must be original; plagiarism is strictly prohibited.",
                  "Participants must maintain professional behavior and polite language.",
                  "Registration fee: ₹100 per team.",
                  "Inter-college participation is allowed.",
                  "Online & Spot registration available."
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{rule}</span>
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
            className="space-y-4 sm:space-y-6"
          >
            
            {/* Prize Card */}
            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
              <CardContent className="p-4 sm:p-6 text-center">
                <h3 className="text-sm sm:text-lg font-semibold text-yellow-200 mb-1">Registration Fee</h3>
                <p className="text-3xl sm:text-4xl font-bold text-yellow-400">₹100</p>
                <p className="text-xs sm:text-sm text-yellow-200/60 mt-2">Per Team</p>
              </CardContent>
            </Card>

            {/* Coordinators */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h3 className="font-bold text-white mb-3 sm:mb-4 border-b border-white/10 pb-2 text-sm sm:text-base">Student Coordinators</h3>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs sm:text-sm shrink-0">AK</div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm sm:text-base">Samarth Yadav</p>
                    <a href="tel:+919182574784" className="text-xs sm:text-sm text-gray-400 hover:text-pink-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 shrink-0" /> +91 9110370765
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300 font-bold text-xs sm:text-sm shrink-0">SR</div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm sm:text-base">Rushika</p>
                    <a href="tel:+918688807788" className="text-xs sm:text-sm text-gray-400 hover:text-pink-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 shrink-0" /> +91 8790999505
                    </a>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Register Button */}
            <Link href="/register" className="block">
              <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-5 sm:py-6 text-sm sm:text-lg font-bold shadow-lg shadow-purple-500/25 min-h-[44px]">
                Register for Event
              </Button>
            </Link>
            <p className="text-xs text-center text-gray-500 px-2">
              *Registration fee includes entry to this event.
            </p>

          </motion.div>

        </div>
      </div>
    </main>
  );
}