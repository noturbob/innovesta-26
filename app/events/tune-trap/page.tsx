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
  Music, // Changed to Music Icon
} from "lucide-react";
import { motion } from "framer-motion";
import StarBackground from "@/components/sections/StarBackground";
import InfoCard from "@/components/events/InfoCard";

export default function TuneTrapPage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white relative overflow-hidden">
      
      {/* Background */}
      <StarBackground />
      
      {/* Floating Blobs (Cyan/Purple for "Neon Music" vibe) */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

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
              <Music className="w-12 h-12 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 mb-2">
                Tune Trap
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                The Ultimate Musical Showdown. Test your rhythm, vocal skills, and musical knowledge in this high-energy battle of beats.
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
              <InfoCard icon={Clock} label="Time" value="03:30 PM" />
              <InfoCard icon={MapPin} label="Venue" value="Main Auditorium" />
              <InfoCard icon={Users} label="Team Size" value="Solo / Duet" />
            </div>

            {/* Event Description */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> Event Structure
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  From guessing the beat in milliseconds to delivering a show-stopping vocal performance, Tune Trap pushes your musical instincts to the limit.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-cyan-500 text-cyan-400 h-fit mt-1">Round 1</Badge>
                    <div>
                      <h4 className="font-semibold text-white">Beat Blitz (Quiz)</h4>
                      <p className="text-sm text-gray-400">Guess the song from a 2-second audio clip. Speed is key.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="border-purple-500 text-purple-400 h-fit mt-1">Round 2</Badge>
                    <div>
                      <h4 className="font-semibold text-white">Voice of Victory (Performance)</h4>
                      <p className="text-sm text-gray-400">Live singing performance (Solo or Duet). Backing tracks allowed.</p>
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
                  "Backing tracks must be submitted on a pendrive 1 hour before the event.",
                  "Tracks must NOT contain the original vocals (Karaoke versions only).",
                  "Performance time limit: 3 minutes maximum.",
                  "Strictly no explicit lyrics or offensive language allowed.",
                  "Judges will score based on pitch, rhythm, and stage presence."
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
            <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-cyan-200 mb-1">Winner Prize</h3>
                <p className="text-4xl font-bold text-cyan-400">₹10,000</p>
                <p className="text-sm text-cyan-200/60 mt-2">+ Trophy & Certificates</p>
              </CardContent>
            </Card>

            {/* Coordinators */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Student Coordinators</h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">VN</div>
                  <div>
                    <p className="text-white font-medium">Vikram N.</p>
                    <a href="tel:+919876543216" className="text-sm text-gray-400 hover:text-cyan-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> +91 98765 43216
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">PJ</div>
                  <div>
                    <p className="text-white font-medium">Priya J.</p>
                    <a href="tel:+919876543217" className="text-sm text-gray-400 hover:text-cyan-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> +91 98765 43217
                    </a>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Register Button */}
            <Link href="/register" className="block">
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-6 text-lg font-bold shadow-lg shadow-cyan-500/25">
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