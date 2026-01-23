"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  X,
  Home,
  Sparkles,
  Trophy,
} from "lucide-react";
import StarBackground from "@/components/sections/StarBackground";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STEPS = [
  { id: 1, title: "Guidelines" },
  { id: 2, title: "Personal" },
  { id: 3, title: "Academic" },
  { id: 4, title: "Payment" },
];

const GAMES = ["Balloon Dart", "Chicken Duck", "Memory Game", "Tower Tact"];

const EVENTS = [
  {
    name: "Venture Vault",
    slug: "venture-vaults",
    description: "Pitch your startup idea",
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Brand Revival",
    slug: "brand-revival",
    description: "Revive a declining brand",
    color: "from-orange-500 to-pink-500",
  },
  {
    name: "Meme Market",
    slug: "meme-market",
    description: "Viral marketing with humor",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Tech Trek",
    slug: "tech-trek",
    description: "IT & Business quiz",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Tune Trap",
    slug: "tune-trap",
    description: "Musical showdown",
    color: "from-cyan-500 to-purple-500",
  },
  {
    name: "Corporate Canvas",
    slug: "corporate-canvas",
    description: "Design the future of ads",
    color: "from-pink-500 to-indigo-500",
  },
];

export interface RegisterFormData {
  fullName: string;
  email: string;
  mobile: string;
  collegeName: string;
  discipline: string;
  rollNumber: string;
  yearOfStudy: string;
  game: string;
  transactionId: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJosephsStudent, setIsJosephsStudent] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    mobile: "",
    collegeName: "",
    discipline: "",
    rollNumber: "",
    yearOfStudy: "1st Year",
    game: GAMES[0],
    transactionId: "",
  });

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateJosephsEmail = (email: string): boolean => {
    // Extract the part before @ symbol
    const emailParts = email.toLowerCase().split("@");
    if (emailParts.length !== 2 || emailParts[1] !== "josephscollege.ac.in") {
      return false;
    }

    // Validate hall ticket format (12 digits, starts with 1214)
    const hallTicket = emailParts[0];
    const hallTicketPattern = /^1214\d{8}$/;

    return hallTicketPattern.test(hallTicket);
  };

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return mobileRegex.test(mobile.replace(/\s/g, ""));
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (stepNumber === 2) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = "Name must be at least 3 characters";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (isJosephsStudent && !validateJosephsEmail(formData.email)) {
        newErrors.email =
          "Please enter a valid St. Joseph's College email address";
      } else if (!isJosephsStudent && !validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.mobile.trim()) {
        newErrors.mobile = "Mobile number is required";
      } else if (!validateMobile(formData.mobile)) {
        newErrors.mobile = "Please enter a valid mobile number";
      }
    }

    if (stepNumber === 3) {
      if (!formData.collegeName.trim()) {
        newErrors.collegeName = "College name is required";
      }

      if (!formData.discipline.trim()) {
        newErrors.discipline = "Discipline is required";
      }

      if (!formData.rollNumber.trim()) {
        newErrors.rollNumber = "College ID is required";
      }
    }

    if (stepNumber === 4 && !isJosephsStudent) {
      if (!formData.transactionId.trim()) {
        newErrors.transactionId = "Transaction ID is required";
      } else if (formData.transactionId.trim().length < 6) {
        newErrors.transactionId = "Transaction ID seems too short";
      }

      if (!screenshot) {
        newErrors.screenshot = "Payment screenshot is required";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return false;
    }

    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleJosephsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsJosephsStudent(checked);

    // Clear email error when checkbox changes
    if (errors.email) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }

    // Show appropriate message
    if (checked) {
      toast.success("Great! Free entry for Josephietes 🎉");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setScreenshot(null);
      setPreviewUrl(null);
      return;
    }

    const setError = (errorMessage: string) => {
      toast.error(errorMessage);
      setScreenshot(null);
      setPreviewUrl(null);
      e.target.value = "";
    };

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid Screenshot Added, Only Images Allowed");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must be less than 5 MB");
      return;
    }

    setScreenshot(file);
    setPreviewUrl(URL.createObjectURL(file));

    if (errors.screenshot) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.screenshot;
        return newErrors;
      });
    }

    toast.success("Screenshot uploaded successfully");
  };

  const removeFile = () => {
    setScreenshot(null);
    setPreviewUrl(null);
    toast.success("Screenshot removed");
  };

  const handleNextStep = (nextStep: number) => {
    if (validateStep(step)) {
      setStep(nextStep);
    }
  };

  const submitForm = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();

    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiFormData = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        apiFormData.append(key, value);
      }

      // Add appropriate event type based on student status
      apiFormData.append(
        "event",
        isJosephsStudent ? "Josephs Entry" : "Innovesta Entry",
      );

      // Only add screenshot if not a Joseph's student
      if (!isJosephsStudent && screenshot) {
        apiFormData.append("screenshot", screenshot);
      } else if (isJosephsStudent) {
        // Add empty screenshot for Josephs students to maintain form structure
        apiFormData.append("screenshot", "");
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: apiFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration submitted successfully! 🎉", {
        duration: 4000,
      });

      // Show success screen instead of redirecting
      setShowSuccessScreen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit registration";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goHome = () => {
    router.push("/");
  };

  const registerAnother = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      collegeName: "",
      discipline: "",
      rollNumber: "",
      yearOfStudy: "1st Year",
      game: GAMES[0],
      transactionId: "",
    });
    setScreenshot(null);
    setPreviewUrl(null);
    setIsJosephsStudent(false);
    setStep(1);
    setShowSuccessScreen(false);
    toast.success("Ready for another registration!");
  };

  // Success Screen Component
  if (showSuccessScreen) {
    return (
      // 1. Changed overflow-hidden to overflow-y-auto to prevent cutting off content on small screens
      // 2. Added py-10 to give vertical breathing room on mobile scrolling
      <main className="min-h-screen bg-[#0f0518] text-white flex items-center justify-center p-4 py-10 relative overflow-y-auto">
        <StarBackground />

        {/* Card: max-w-4xl limits width on desktop, w-full ensures mobile fill */}
        <Card className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 overflow-hidden my-auto">
          <div className="p-6 sm:p-8 md:p-12">
            {/* Success Header */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>

              {/* Dynamic Text Sizing */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
                Registration Successful! 🎉
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto">
                You're all set for Innovesta 2026! Get ready for an amazing
                experience.
              </p>
            </motion.div>

            {/* What's Next Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg sm:text-2xl font-bold text-white">
                  Register for More Events
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 text-center sm:text-left">
                Don't miss out! Register for our exciting competitions and
                showcase your skills.
              </p>

              {/* Events Grid */}
              {/* Mobile: 1 column, Tablet+: 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {EVENTS.map((event, index) => (
                  <motion.div
                    key={event.slug}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    className="h-full" // Ensure motion div takes full height for grid alignment
                  >
                    <Link
                      href={`/register/${event.slug}`}
                      className="h-full block"
                    >
                      {/* Added h-full to inner div so cards stretch to match height of neighbor */}
                      <div className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl p-4 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col">
                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-purple-300 transition-colors line-clamp-1">
                              {event.name}
                            </h4>
                            {/* Prevent arrow from shrinking */}
                            <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>

                          {/* Description pushes to bottom if needed, or stays at top */}
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button
                onClick={registerAnother}
                className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-sm sm:text-base font-bold min-h-[50px]"
              >
                <Trophy className="w-4 h-4 mr-2" />
                <span className="truncate">Register Again</span>
              </Button>
              <Button
                onClick={goHome}
                variant="outline"
                className="w-full sm:flex-1 border-white/20 hover:bg-white/10 text-white py-6 text-sm sm:text-base min-h-[50px]"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0518] text-white flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      <StarBackground />

      <Button
        onClick={goHome}
        variant="ghost"
        className="absolute top-4 left-4 z-20 text-white hover:bg-white/10 backdrop-blur-sm border border-white/10"
      >
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>

      <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 overflow-hidden">
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
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Registration
              </h2>
              <p className="text-xs sm:text-sm text-purple-300/60">
                Step {step} of {STEPS.length}: {STEPS[step - 1].title}
              </p>
            </div>
            <div className="font-mono text-4xl text-white/5 opacity-20 font-bold">
              0{step}
            </div>
          </div>

          <form>
            <AnimatePresence mode="wait">
              {/* STEP 1: GUIDELINES */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-purple-900/20 p-4 sm:p-6 rounded-lg border border-purple-500/20 space-y-3 text-purple-100 text-sm">
                    <h3 className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="text-green-400 w-4 sm:w-5 h-4 sm:h-5 shrink-0" />{" "}
                      Important Instructions
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-300">
                      <li>
                        Please ensure all data entered is{" "}
                        <strong>truthful and accurate</strong>.
                      </li>
                      <li>
                        <strong>St. Joseph's Students:</strong> Use your college
                        email (@josephscollege.ac.in) for FREE entry!
                      </li>
                      <li>
                        <strong>Other Colleges:</strong> Entry Fee is ₹100
                        (Includes 1 Free Game). You will need a screenshot of
                        your payment.
                      </li>
                      <li>Extra Games are ₹50 each (payable at the venue).</li>
                    </ul>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-white text-black hover:bg-gray-200 min-h-[44px]"
                    >
                      I Understand <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PERSONAL DETAILS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Josephs Student Checkbox */}
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/30">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isJosephsStudent}
                        onChange={handleJosephsCheckboxChange}
                        className="mt-1 w-5 h-5 rounded border-green-500/50 bg-white/5 text-green-500 focus:ring-2 focus:ring-green-500/50 cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="text-sm sm:text-base font-semibold text-green-300 group-hover:text-green-200 transition-colors">
                          I am a St. Joseph's College student
                        </span>
                        <p className="text-xs text-green-400/70 mt-1">
                          Check this box if you're from St. Joseph's to get FREE
                          entry! You must use your college email.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Full Name</Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">
                      Email ID
                      {isJosephsStudent && (
                        <span className="text-green-400 ml-2 text-xs">
                          (Use your hall ticket email)
                        </span>
                      )}
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={
                        isJosephsStudent
                          ? "121423408006@josephscollege.ac.in"
                          : "john@college.edu"
                      }
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">
                      Mobile Number
                    </Label>
                    <Input
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="+91 9876543210"
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.mobile ? "border-red-500" : ""
                      }`}
                    />
                    {errors.mobile && (
                      <p className="text-xs text-red-400">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleNextStep(3)}
                      className="bg-purple-600 hover:bg-purple-700 order-1 sm:order-2 min-h-[44px]"
                    >
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: COLLEGE DETAILS */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1.5 sm:space-y-2 col-span-2">
                    <Label className="text-sm sm:text-base">College Name</Label>
                    <Input
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      required
                      placeholder="St. Joseph's Degree College"
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.collegeName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.collegeName && (
                      <p className="text-xs text-red-400">
                        {errors.collegeName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-sm sm:text-base">Discipline</Label>
                      <Input
                        name="discipline"
                        value={formData.discipline}
                        onChange={handleChange}
                        required
                        placeholder="BBA / BCom"
                        className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                          errors.discipline ? "border-red-500" : ""
                        }`}
                      />
                      {errors.discipline && (
                        <p className="text-xs text-red-400">
                          {errors.discipline}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-sm sm:text-base">Year</Label>
                      <select
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        className="w-full h-9 sm:h-10 rounded-md bg-white/5 border border-white/10 px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="1st Year" className="bg-black">
                          1st Year
                        </option>
                        <option value="2nd Year" className="bg-black">
                          2nd Year
                        </option>
                        <option value="3rd Year" className="bg-black">
                          3rd Year
                        </option>
                        <option value="4th Year" className="bg-black">
                          4th Year
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 col-span-2">
                    <Label className="text-sm sm:text-base">College ID</Label>
                    <Input
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      required
                      placeholder="1234-56-789-000"
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.rollNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.rollNumber && (
                      <p className="text-xs text-red-400">
                        {errors.rollNumber}
                      </p>
                    )}
                  </div>

                  {/* Show game selection only for non-Josephs students */}
                  {!isJosephsStudent && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-sm sm:text-base">
                        Select Your Free Game
                      </Label>
                      <select
                        name="game"
                        value={formData.game}
                        onChange={handleChange}
                        className="w-full h-9 sm:h-10 rounded-md bg-white/5 border border-white/10 px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {GAMES.map((game) => (
                          <option key={game} value={game} className="bg-black">
                            {game}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4 col-span-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleNextStep(4)}
                      className="bg-purple-600 hover:bg-purple-700 order-1 sm:order-2 min-h-[44px]"
                    >
                      {isJosephsStudent ? "Complete Registration" : "Next Step"}{" "}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PAYMENT - Only for non-Josephs students */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {isJosephsStudent ? (
                    // Confirmation screen for Josephs students
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-lg border border-green-500/30 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                          You're All Set!
                        </h3>
                        <p className="text-green-200 text-sm">
                          As a St. Joseph's student, you get FREE entry to
                          Innovesta 2026!
                        </p>
                        <p className="text-green-300/70 text-xs mt-3">
                          Click Submit to complete your registration.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setStep(3)}
                          className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"
                          disabled={isSubmitting}
                        >
                          <ArrowLeft className="mr-2 w-4 h-4" /> Back
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white min-w-[140px] disabled:opacity-50"
                          onClick={submitForm}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Submitting...
                            </>
                          ) : (
                            "Submit Registration"
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Payment screen for other students
                    <>
                      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 sm:p-6 rounded-lg border border-pink-500/30 mb-4">
                        <div className="flex flex-col items-center gap-3">
                          <p className="text-xs sm:text-sm text-pink-200 text-center">
                            Scan QR Code to Pay: <strong>₹100</strong>
                          </p>
                          <div className="relative w-48 h-48 bg-white rounded-lg p-4">
                            <Image
                              src="/qr-code.png"
                              alt="Payment QR Code"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-xs text-pink-200/80 text-center">
                            UPI ID: <strong>innovesta@upi</strong>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-sm sm:text-base">
                          Transaction ID
                        </Label>
                        <Input
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleChange}
                          required
                          placeholder="e.g. 402819381923"
                          className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                            errors.transactionId ? "border-red-500" : ""
                          }`}
                        />
                        {errors.transactionId && (
                          <p className="text-xs text-red-400">
                            {errors.transactionId}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Payment Screenshot</Label>
                        {!previewUrl ? (
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors ${
                                errors.screenshot
                                  ? "border-red-500"
                                  : "border-white/10"
                              }`}
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                <p className="text-sm text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  screenshot
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  PNG, JPG, GIF or WebP (MAX. 5MB)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                name="screenshot"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="relative w-full border-2 border-purple-500/30 rounded-lg overflow-hidden bg-white/5 p-4">
                            <button
                              type="button"
                              onClick={removeFile}
                              className="absolute top-2 right-2 z-10 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="relative w-full h-64">
                              <Image
                                src={previewUrl}
                                alt="Payment screenshot preview"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <p className="text-sm text-center text-gray-400 mt-3">
                              {screenshot?.name} (
                              {(screenshot!.size / 1024).toFixed(2)} KB)
                            </p>
                          </div>
                        )}
                        {errors.screenshot && (
                          <p className="text-xs text-red-400">
                            {errors.screenshot}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setStep(3)}
                          className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"
                          disabled={isSubmitting}
                        >
                          <ArrowLeft className="mr-2 w-4 h-4" /> Back
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white min-w-[140px] disabled:opacity-50"
                          onClick={submitForm}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Submitting...
                            </>
                          ) : (
                            "Submit Registration"
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Card>
    </main>
  );
}
