"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Upload, ArrowRight, ArrowLeft, X, Home } from "lucide-react";
import StarBackground from "@/components/sections/StarBackground";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, title: "Guidelines" },
  { id: 2, title: "Personal" },
  { id: 3, title: "Academic" },
  { id: 4, title: "Payment" },
];

const FORMAL_EVENTS = [
  "Venture Vault",
  "Brand Revival Challenge",
];

const INFORMAL_EVENTS = [
  "Meme Market",
  "Tech Trek",
  "Tune Trap",
  "Corporate Canvas",
];

export interface RegisterFormData {
  fullName: string;
  email: string;
  mobile: string;
  collegeName: string;
  collegeAddress: string;
  discipline: string;
  rollNumber: string;
  yearOfStudy: string;
  formalEvent: string;
  informalEvent: string;
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
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    mobile: "",
    collegeName: "",
    collegeAddress: "",
    discipline: "",
    rollNumber: "",
    yearOfStudy: "1st Year",
    formalEvent: FORMAL_EVENTS[0],
    informalEvent: INFORMAL_EVENTS[0],
    transactionId: "",
  });

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return mobileRegex.test(mobile.replace(/\s/g, ''));
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
      } else if (!validateEmail(formData.email)) {
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

      if (!formData.collegeAddress.trim()) {
        newErrors.collegeAddress = "College address is required";
      }

      if (!formData.discipline.trim()) {
        newErrors.discipline = "Discipline is required";
      }

      if (!formData.rollNumber.trim()) {
        newErrors.rollNumber = "College ID is required";
      }
    }

    if (stepNumber === 4) {
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
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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

    const maxSize = 5 * 1024 * 1024; // 5 MB Limit
    if (file.size > maxSize) {
      setError("File size must be less than 5 MB");
      return;
    }

    setScreenshot(file);
    setPreviewUrl(URL.createObjectURL(file));
    
    // Clear screenshot error
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
      if (!screenshot) {
        throw new Error("Screenshot is required");
      }

      const apiFormData = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        apiFormData.append(key, value);
      }
      apiFormData.append("screenshot", screenshot);

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

      // Reset form
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          collegeName: "",
          collegeAddress: "",
          discipline: "",
          rollNumber: "",
          yearOfStudy: "1st Year",
          formalEvent: FORMAL_EVENTS[0],
          informalEvent: INFORMAL_EVENTS[0],
          transactionId: "",
        });
        setScreenshot(null);
        setPreviewUrl(null);
        setStep(1);
        
        // Optionally redirect to home
        // router.push('/');
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit registration";
      toast.error(errorMessage);
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[#0f0518] text-white flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      <StarBackground />

      {/* Home Button */}
      <Button
        onClick={goHome}
        variant="ghost"
        className="absolute top-4 left-4 z-20 text-white hover:bg-white/10 backdrop-blur-sm border border-white/10"
      >
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>

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
              {/* --- STEP 1: GUIDELINES --- */}
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
                        You will need a{" "}
                        <strong>screenshot of your payment</strong> (UPI/Bank
                        Transfer) ready to upload.
                      </li>
                      <li>
                        Entry Fee: <strong>₹100</strong> (Includes 1 Free
                        Event). Extra events are ₹50 each.
                      </li>
                      <li>
                        After registration, please wait for the coordinators to
                        contact you or add you to the official{" "}
                        <strong>WhatsApp Groups</strong>.
                      </li>
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

              {/* --- STEP 2: PERSONAL DETAILS --- */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Full Name</Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.fullName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">Email ID</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@college.edu"
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.email ? 'border-red-500' : ''
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
                        errors.mobile ? 'border-red-500' : ''
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

              {/* --- STEP 3: COLLEGE DETAILS --- */}
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
                        errors.collegeName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.collegeName && (
                      <p className="text-xs text-red-400">{errors.collegeName}</p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 col-span-2">
                    <Label className="text-sm sm:text-base">
                      College Address
                    </Label>
                    <Input
                      name="collegeAddress"
                      value={formData.collegeAddress}
                      onChange={handleChange}
                      required
                      placeholder="King Koti, Hyderabad"
                      className={`bg-white/5 border-white/10 text-sm sm:text-base ${
                        errors.collegeAddress ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.collegeAddress && (
                      <p className="text-xs text-red-400">{errors.collegeAddress}</p>
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
                          errors.discipline ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.discipline && (
                        <p className="text-xs text-red-400">{errors.discipline}</p>
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
                        errors.rollNumber ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.rollNumber && (
                      <p className="text-xs text-red-400">{errors.rollNumber}</p>
                    )}
                  </div>
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
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 4: PAYMENT --- */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
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
                      Select Formal Event
                    </Label>
                    <select
                      name="formalEvent"
                      value={formData.formalEvent}
                      onChange={handleChange}
                      className="w-full h-9 sm:h-10 rounded-md bg-white/5 border border-white/10 px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {FORMAL_EVENTS.map((ev) => (
                        <option key={ev} value={ev} className="bg-black">
                          {ev}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-sm sm:text-base">
                      Select Informal Event
                    </Label>
                    <select
                      name="informalEvent"
                      value={formData.informalEvent}
                      onChange={handleChange}
                      className="w-full h-9 sm:h-10 rounded-md bg-white/5 border border-white/10 px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {INFORMAL_EVENTS.map((ev) => (
                        <option key={ev} value={ev} className="bg-black">
                          {ev}
                        </option>
                      ))}
                    </select>
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
                        errors.transactionId ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.transactionId && (
                      <p className="text-xs text-red-400">{errors.transactionId}</p>
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
                              ? 'border-red-500 hover:border-red-400'
                              : 'border-white/10 hover:border-purple-500'
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
                      <p className="text-xs text-red-400">{errors.screenshot}</p>
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
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
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
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Card>
    </main>
  );
}