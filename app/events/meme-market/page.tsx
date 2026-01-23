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
  Hash, // Changed icon to Hash for "Meme"
} from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";
import InfoCard from "@/components/events/InfoCard";

export default function MemeMarketPage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white relative overflow-hidden">
      
      {/* Background */}
      <StarBackground />
      
      {/* Floating Blobs (Purple themed for Informal) */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

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
              <Hash className="w-12 h-12 text-purple-500" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 mb-2">
                Meme Market
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Viral Marketing with Humor. Create the funniest, most relatable memes to promote a brand and win over the internet.
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
              <InfoCard icon={Clock} label="Time" value="10:00 AM" />
              <InfoCard icon={MapPin} label="Venue" value="Computer Lab" />
              <InfoCard icon={Users} label="Team Size" value="2 - 3 Members" />
            </div>

            {/* Event Description */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> Event Structure
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Participants will be given a random product or brand on the spot. Your goal is to create a viral meme marketing campaign using existing templates or original designs.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-purple-500 text-purple-400 h-fit mt-1">Round 1</Badge>
                    <div>
                      <h4 className="font-semibold text-white">Template War</h4>
                      <p className="text-sm text-gray-400">Create 1 memes in 30 minutes based on trending templates.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-indigo-500 text-indigo-400 h-fit mt-1">Round 2</Badge>
                    <div>
                      <h4 className="font-semibold text-white">Guessing Game (Finals)</h4>
                      <p className="text-sm text-gray-400">Guess the meme in given time.</p>
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
                  "Memes must be original and created during the event time.",
                  "No offensive, political, or NSFW content allowed.",
                  "Participants can use Canva, Photoshop, or Meme Generators.",
                  "Internet access will be provided for downloading assets.",
                  "Humor, creativity, and brand relevance are key judging criteria."
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
            <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-200 mb-1">Registration Fee</h3>
                <p className="text-4xl font-bold text-purple-400">₹100</p>
                <p className="text-sm text-purple-200/60 mt-2">+ Per Team</p>
              </CardContent>
            </Card>

            {/* Coordinators */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Student Coordinators</h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">RK</div>
                  <div>
                    <p className="text-white font-medium">Chetan Baldava</p>
                    <a href="tel:+919876543212" className="text-sm text-gray-400 hover:text-purple-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> +91 8074523025
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold">ZM</div>
                  <div>
                    <p className="text-white font-medium">Harshini</p>
                    <a href="tel:+919876543213" className="text-sm text-gray-400 hover:text-purple-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> +91 8074523025
                    </a>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Register Button */}
            <Link href="/register" className="block">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg font-bold shadow-lg shadow-purple-500/25">
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
