"use client";

import { useState, useActionState, ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerStudent } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Upload, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import StarBackground from "@/components/sections/StarBackground";

const STEPS = [
  { id: 1, title: "Guidelines" },
  { id: 2, title: "Personal" },
  { id: 3, title: "Academic" },
  { id: 4, title: "Payment" },
];

const EVENTS = [
  "Venture Vault", "Meme Market", "Brand Revival Challenge", 
  "Tech Trek", "Tune Trap", "Corporate Canvas"
];

const initialState = {
  message: "",
  success: false
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [state, formAction] = useActionState(registerStudent, initialState);

  // 1. STATE TO HOLD DATA ACROSS STEPS
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    collegeName: "",
    collegeAddress: "",
    discipline: "",
    rollNumber: "",
    yearOfStudy: "1st Year",
    eventName: EVENTS[0],
    transactionId: ""
  });

  // 2. HANDLER TO UPDATE STATE
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (state?.success) {
    return <SuccessScreen />;
  }

  return (
    <main className="min-h-screen bg-[#0f0518] text-white flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      <StarBackground />
      
      <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 overflow-hidden">
        
        {/* PROGRESS BAR */}
        <div className="absolute top-0 left-0 h-1 bg-gray-800 w-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-5 sm:p-6 md:p-8">
          <div className="mb-6 sm:mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Registration</h2>
              <p className="text-xs sm:text-sm text-purple-300/60">Step {step} of {STEPS.length}: {STEPS[step - 1].title}</p>
            </div>
            <div className="font-mono text-2xl sm:text-3xl md:text-4xl text-white/5 opacity-20 font-bold">0{step}</div>
          </div>

          {state?.message && !state.success && (
            <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-200 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {state.message}
            </div>
          )}

          <form action={formAction}>
            
            {/* 3. HIDDEN INPUTS (This ensures data from previous steps is sent) */}
            {step === 4 && (
              <>
                <input type="hidden" name="fullName" value={formData.fullName} />
                <input type="hidden" name="email" value={formData.email} />
                <input type="hidden" name="mobile" value={formData.mobile} />
                <input type="hidden" name="collegeName" value={formData.collegeName} />
                <input type="hidden" name="collegeAddress" value={formData.collegeAddress} />
                <input type="hidden" name="discipline" value={formData.discipline} />
                <input type="hidden" name="rollNumber" value={formData.rollNumber} />
                <input type="hidden" name="yearOfStudy" value={formData.yearOfStudy} />
              </>
            )}

            <AnimatePresence mode="wait">
              
              {/* --- STEP 1: GUIDELINES --- */}
              {step === 1 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                  <div className="bg-purple-900/20 p-4 sm:p-6 rounded-lg border border-purple-500/20 space-y-3 text-purple-100 text-sm">
                    <h3 className="font-bold flex items-center gap-2"><CheckCircle2 className="text-green-400 w-4 sm:w-5 h-4 sm:h-5 shrink-0"/> Important Instructions</h3>
                    <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-300"> <li>Please ensure all data entered is <strong>truthful and accurate</strong>.</li>
                      <li>You will need a <strong>screenshot of your payment</strong> (UPI/Bank Transfer) ready to upload.</li>
                      <li>Entry Fee: <strong>₹100</strong> (Includes 1 Free Event). Extra events are ₹50 each.</li>
                      <li>After registration, please wait for the coordinators to contact you or add you to the official <strong>WhatsApp Groups</strong>.</li>
                    </ul>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button type="button" onClick={() => setStep(2)} className="bg-white text-black hover:bg-gray-200 min-h-[44px]">
                      I Understand <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 2: PERSONAL DETAILS --- */}
              {step === 2 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Full Name</Label>
                    <Input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Email ID</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@college.edu" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Mobile Number</Label>
                    <Input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required placeholder="+91 9876543210" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                    <Button type="button" onClick={() => setStep(3)} className="bg-purple-600 hover:bg-purple-700 order-1 sm:order-2 min-h-[44px]">Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 3: COLLEGE DETAILS --- */}
              {step === 3 && (
                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2 col-span-2">
                    <Label className="text-sm sm:text-base">College Name</Label>
                    <Input name="collegeName" value={formData.collegeName} onChange={handleChange} required placeholder="St. Joseph's Degree College" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 col-span-2">
                    <Label className="text-sm sm:text-base">College Address</Label>
                    <Input name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} required placeholder="King Koti, Hyderabad" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-sm sm:text-base">Discipline</Label>
                      <Input name="discipline" value={formData.discipline} onChange={handleChange} required placeholder="BBA / BCom" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-sm sm:text-base">Year</Label>
                      <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className="w-full h-9 sm:h-10 rounded-md bg-white/5 border border-white/10 px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="1st Year" className="bg-black">1st Year</option>
                        <option value="2nd Year" className="bg-black">2nd Year</option>
                        <option value="3rd Year" className="bg-black">3rd Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 col-span-2">
                    <Label className="text-sm sm:text-base">Roll Number</Label>
                    <Input name="rollNumber" value={formData.rollNumber} onChange={handleChange} required placeholder="1234-56-789-000" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4 col-span-2">
                    <Button type="button" variant="ghost" onClick={() => setStep(2)} className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                    <Button type="button" onClick={() => setStep(4)} className="bg-purple-600 hover:bg-purple-700 order-1 sm:order-2 min-h-[44px]">Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 4: PAYMENT --- */}
              {step === 4 && (
                <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-3 sm:space-y-4">
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-3 sm:p-4 rounded-lg border border-pink-500/30 mb-4">
                    <p className="text-xs sm:text-sm text-pink-200">Payment ID: <strong>innovesta@upi</strong></p>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Select Event</Label>
                    <select name="eventName" value={formData.eventName} onChange={handleChange} className="w-full h-9 sm:h-10 rounded-md bg-white/5 border border-white/10 px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                      {EVENTS.map(ev => <option key={ev} value={ev} className="bg-black">{ev}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Transaction ID</Label>
                    <Input name="transactionId" value={formData.transactionId} onChange={handleChange} required placeholder="e.g. 402819381923" className="bg-white/5 border-white/10 text-sm sm:text-base" />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Payment Screenshot</Label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 hover:border-purple-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-3 sm:pt-5 pb-3 sm:pb-6">
                          <Upload className="w-6 sm:w-8 h-6 sm:h-8 mb-2 sm:mb-3 text-gray-400" />
                          <p className="text-xs sm:text-sm text-gray-400"><span className="font-semibold">Click to upload</span> screenshot</p>
                        </div>
                        <input id="dropzone-file" name="screenshot" type="file" accept="image/*" className="hidden" required />
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4">
                    <Button type="button" variant="ghost" onClick={() => setStep(3)} className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                    <SubmitButton />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Card>
    </main>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white min-w-full sm:min-w-[140px] min-h-[44px] order-1 sm:order-2">
      {pending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Registration"}
    </Button>
  );
}

function SuccessScreen() {
  return (
    <main className="min-h-screen bg-[#0f0518] flex items-center justify-center p-4">
      <StarBackground />
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-green-500/30 shadow-2xl p-6 sm:p-8 text-center relative z-10">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle2 className="w-8 sm:w-10 h-8 sm:h-10 text-green-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">Registration Successful!</h2>
        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">Your details have been recorded.</p>
        <Button asChild className="w-full bg-white text-black hover:bg-gray-200 min-h-[44px]">
          <a href="/">Return to Home</a>
        </Button>
      </Card>
    </main>
  );
}