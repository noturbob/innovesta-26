// app/register/[event]/page.tsx
"use client";

import { useState, ChangeEvent, MouseEvent, use } from "react";
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
} from "lucide-react";
import StarBackground from "@/components/sections/StarBackground";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getEventConfig, FormField } from "@/lib/event-registration-config";

interface PageProps {
  params: Promise<{ event: string }>;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function DynamicEventRegistrationPage(props: PageProps) {
  const params = use(props.params);
  const router = useRouter();
  const eventConfig = getEventConfig(params.event);

  const [step, setStep] = useState(1);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<Record<string, string>>({});

  // If event config not found, show error
  if (!eventConfig) {
    return (
      <main className="min-h-screen bg-[#0f0518] text-white flex items-center justify-center p-6">
        <StarBackground />
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-white/10 p-8 text-center relative z-10">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="text-gray-400 mb-6">
            The event you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-white text-black"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </Card>
      </main>
    );
  }

  const totalSteps = eventConfig.steps.length;
  const currentStepConfig = eventConfig.steps[step - 1];

  // Validation function
  const validateField = (field: FormField, value: string): string | null => {
    if (field.required && !value?.trim()) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { minLength, maxLength, pattern, custom, errorMessage } =
        field.validation;

      if (minLength && value.length < minLength) {
        return (
          errorMessage ||
          `${field.label} must be at least ${minLength} characters`
        );
      }

      if (maxLength && value.length > maxLength) {
        return (
          errorMessage ||
          `${field.label} must be less than ${maxLength} characters`
        );
      }

      if (pattern && !pattern.test(value)) {
        return errorMessage || `${field.label} is invalid`;
      }

      if (custom && !custom(value)) {
        return errorMessage || `${field.label} is invalid`;
      }
    }

    return null;
  };

  const validateStep = (stepNumber: number): boolean => {
    const stepConfig = eventConfig.steps[stepNumber - 1];
    const newErrors: ValidationErrors = {};

    // Validate all fields in current step
    stepConfig.fields.forEach((field) => {
      const error = validateField(field, formData[field.name] || "");
      if (error) {
        newErrors[field.name] = error;
      }
    });

    // Special validation for payment step (screenshot)
    if (stepConfig.title === "Payment" && !screenshot) {
      newErrors.screenshot = "Payment screenshot is required";
    }

    // Custom event validation
    if (eventConfig.additionalValidation) {
      const customValidation = eventConfig.additionalValidation(formData);
      if (!customValidation.isValid && customValidation.errors) {
        Object.assign(newErrors, customValidation.errors);
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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
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

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid Screenshot Added, Only Images Allowed");
      setScreenshot(null);
      setPreviewUrl(null);
      e.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 5 MB");
      setScreenshot(null);
      setPreviewUrl(null);
      e.target.value = "";
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
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, maxTeamSize: number
  ) => {
    e.preventDefault();

    if (!validateStep(step)) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!screenshot && currentStepConfig.title === "Payment") {
        throw new Error("Screenshot is required");
      }
      
      const apiFormData = new FormData();

      // Add event name
      apiFormData.append("event", eventConfig.eventName);

      // --- 1. ADD GENERAL FIELDS FIRST ---
      // We iterate through formData but SKIP the specific fields we want to 
      // order manually (Team data, Transaction ID)
      for (const [key, value] of Object.entries(formData)) {
        if (
          key === "teamSize" || 
          key === "transactionId" || 
          key.startsWith("teamMember")
        ) {
          continue; // Skip these here, we add them below in strict order
        }
        apiFormData.append(key, value);
      }

      // --- 2. ADD FIELDS IN STRICT SPREADSHEET ORDER (Columns K to P) ---

      // Column K: Team Size
      apiFormData.append("teamSize", formData.teamSize || "");

      // Determine selected size to know when to send names vs empty strings
      const teamSizeStr = formData.teamSize || "0";
      const selectedTeamSize = parseInt(teamSizeStr.match(/\d+/)?.[0] || "1");

      // Columns L, M, N: Team Members 2, 3, 4
      // We force this loop to run up to 4 regardless of the event config.
      // This ensures that if an event only has 2 members, Columns M and N 
      // still get empty strings, preventing Transaction ID from shifting left.
      for (let i = 2; i <= maxTeamSize; i++) {
        const memberKey = `teamMember${i}`;
        
        if (i <= selectedTeamSize) {
          // If member exists in selection, send name
          apiFormData.append(memberKey, formData[memberKey] || "");
        } else {
          // If member is not selected (or event max size is smaller), send EMPTY
          // This keeps the spreadsheet cell blank but preserves the column
          apiFormData.append(memberKey, ""); 
        }
      }

      // Column O: Transaction ID
      apiFormData.append("transactionId", formData.transactionId || "");

      // Column P: Screenshot
      if (screenshot) {
        apiFormData.append("screenshot", screenshot);
      }

      // --- SUBMISSION LOGIC ---

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

      setTimeout(() => {
        router.push("/");
      }, 2000);
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

  const renderField = (field: FormField) => {
    const fieldError = errors[field.name];
    const gridSpanClass = field.gridSpan === 2 ? "col-span-2" : "col-span-1";

    // Dynamic visibility for team member fields
    if (field.name.startsWith("teamMember")) {
      const memberNumber = parseInt(field.name.replace("teamMember", ""));
      const selectedTeamSize = parseInt(
        formData.teamSize?.match(/\d+/)?.[0] || "0",
      );

      // Hide fields for members beyond selected team size
      // Team leader is member 1, so we show members 2 to selectedTeamSize
      if (memberNumber > selectedTeamSize) {
        return null;
      }
    }

    if (field.type === "select") {
      return (
        <div
          key={field.name}
          className={`space-y-1.5 sm:space-y-2 ${gridSpanClass}`}
        >
          <Label className="text-sm sm:text-base">{field.label}</Label>
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className={`w-full h-9 sm:h-10 rounded-md bg-white/5 border px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              fieldError ? "border-red-500" : "border-white/10"
            }`}
          >
            <option value="" className="bg-black">
              Select {field.label}
            </option>
            {field.options?.map((option) => (
              <option key={option} value={option} className="bg-black">
                {option}
              </option>
            ))}
          </select>
          {fieldError && <p className="text-xs text-red-400">{fieldError}</p>}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div
          key={field.name}
          className={`space-y-1.5 sm:space-y-2 ${gridSpanClass}`}
        >
          <Label className="text-sm sm:text-base">{field.label}</Label>
          <textarea
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full rounded-md bg-white/5 border px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
              fieldError ? "border-red-500" : "border-white/10"
            }`}
          />
          {fieldError && <p className="text-xs text-red-400">{fieldError}</p>}
        </div>
      );
    }

    return (
      <div
        key={field.name}
        className={`space-y-1.5 sm:space-y-2 ${gridSpanClass}`}
      >
        <Label className="text-sm sm:text-base">{field.label}</Label>
        <Input
          name={field.name}
          type={field.type}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
          placeholder={field.placeholder}
          className={`bg-white/5 border-white/10 text-sm sm:text-base ${
            fieldError ? "border-red-500" : ""
          }`}
        />
        {fieldError && <p className="text-xs text-red-400">{fieldError}</p>}
      </div>
    );
  };

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
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-gray-800 w-full">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-5 sm:p-6 md:p-8">
          <div className="mb-6 sm:mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {eventConfig.eventName}
              </h2>
              <p className="text-xs sm:text-sm text-purple-300/60">
                Step {step} of {totalSteps}: {currentStepConfig.title}
              </p>
            </div>
            <div className="font-mono text-4xl text-white/5 opacity-20 font-bold">
              0{step}
            </div>
          </div>

          <form>
            <AnimatePresence mode="wait">
              {/* Guidelines Step */}
              {step === 1 &&
                currentStepConfig.title === "Guidelines" &&
                currentStepConfig.guidelines &&
                currentStepConfig.guidelines.length > 0 && (
                  <motion.div
                    key="guidelines"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-purple-900/20 p-4 sm:p-6 rounded-lg border border-purple-500/20 space-y-3 text-purple-100 text-sm">
                      <h3 className="font-bold flex items-center gap-2">
                        <CheckCircle2 className="text-green-400 w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
                        Important Instructions
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-300">
                        {currentStepConfig.guidelines.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
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

              {/* Regular Form Steps */}
              {step > 1 && currentStepConfig.fields.length > 0 && (
                <motion.div
                  key={`step-${step}`}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {currentStepConfig.fields.map((field) =>
                      renderField(field),
                    )}
                  </div>

                  {/* Payment Screenshot Upload */}
                  {currentStepConfig.title === "Payment" && (
                    <>
                      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 sm:p-6 rounded-lg border border-pink-500/30 mb-4">
                        <div className="flex flex-col items-center gap-3">
                          <p className="text-xs sm:text-sm text-pink-200 text-center">
                            Scan QR Code to Pay:{" "}
                            <strong>₹{eventConfig.fee}</strong>
                          </p>
                          <div className="relative w-48 h-48 bg-white rounded-lg p-4">
                            <Image
                              src={
                                currentStepConfig.paymentDetails
                                  ? currentStepConfig.paymentDetails.imagePath
                                  : "/qr-code.png"
                              }
                              alt="Payment QR Code"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-xs text-pink-200/80 text-center">
                            UPI ID:{" "}
                            <strong>
                              {currentStepConfig.paymentDetails?.upiId ??
                                "innovesta@upi"}
                            </strong>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Payment Screenshot</Label>
                        {!previewUrl ? (
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="screenshot-upload"
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
                                id="screenshot-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="relative w-full border-2 border-purple-500/30 rounded-lg overflow-hidden bg-white/5 p-4">
                            <button
                              type="button"
                              onClick={removeFile}
                              className="absolute top-2 right-2 z-10 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1.5"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="relative w-full h-64">
                              <Image
                                src={previewUrl}
                                alt="Payment screenshot"
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
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(step - 1)}
                      className="text-white hover:bg-white/10 order-2 sm:order-1 min-h-[44px]"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>

                    {step < totalSteps ? (
                      <Button
                        type="button"
                        onClick={() => handleNextStep(step + 1)}
                        className="bg-purple-600 hover:bg-purple-700 order-1 sm:order-2 min-h-[44px]"
                      >
                        Next Step <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white min-w-[140px] disabled:opacity-50"
                        onClick={(e) => submitForm(e, eventConfig.maxTeamSize)}
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
                    )}
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
