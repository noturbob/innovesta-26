// lib/event-registration-config.ts

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "number" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select fields
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean;
    errorMessage?: string;
  };
  gridSpan?: 1 | 2; // For grid layout
}

export interface RegistrationStep {
  id: number;
  title: string;
  fields: FormField[];
  paymentDetails?: {
    imagePath: string;
    upiId: string;
  };
  guidelines?: string[];
}

export interface EventRegistrationConfig {
  eventName: string;
  eventSlug: string;
  sheetName: string;
  fee: number;
  description: string;
  steps: RegistrationStep[];
  maxTeamSize: number;
  additionalValidation?: (formData: Record<string, string>) => {
    isValid: boolean;
    errors?: Record<string, string>;
  };
}

// Create Guidelines Helper Function
export const createGuidelineStep = (rules: string[]): RegistrationStep => ({
  id: 1,
  title: "Guidelines",
  guidelines: [
    "Please ensure all data entered is truthful and accurate.",
    "You will need a screenshot of your payment (UPI/Bank Transfer) ready to upload",
    ...rules,
  ],
  fields: [],
});

export const createPaymentDetails = (
  eventType: "formal" | "informal",
): RegistrationStep => ({
  id: 5,
  title: "Payment",
  paymentDetails: {
    imagePath:
      eventType === "formal"
        ? "/formal-qr-code.jpeg"
        : "/saranya-informal-qr-code.jpeg",
    upiId:
      eventType === "formal"
        ? "nugururithikaroshini20@oksbi"
        : "6300308780@ybl",
  },
  fields: [
    {
      name: "transactionId",
      label: "Transaction ID",
      type: "text",
      placeholder: "e.g. 402819381923",
      required: true,
      validation: {
        minLength: 6,
        errorMessage: "Transaction ID seems too short",
      },
    },
  ],
});

// Helper to create the entire Team Details step dynamically
export const createTeamDetails = (maxTeamSize: number): RegistrationStep => {
  // 1. Generate options dynamically (e.g. ["2 Members", "3 Members", "4 Members"])
  // We assume minimum team size is 2.
  const sizeOptions = Array.from(
    { length: maxTeamSize - 1 },
    (_, i) => `${i + 2} Members`,
  );

  // 2. Generate Member fields (Member 2 to Member X) - Member 1 is the team leader
  const memberFields: FormField[] = Array.from(
    { length: maxTeamSize - 1 },
    (_, index) => {
      const num = index + 2; // Start from 2 since team leader is member 1
      return {
        name: `teamMember${num}`,
        label: `Team Member ${num}`,
        type: "text",
        placeholder: `Enter the Name of Team Member ${num}`,
        gridSpan: 1,
        // Not required by default - will be validated based on team size
        required: false,
      };
    },
  );

  return {
    id: 4,
    title: "Team Details",
    fields: [
      {
        name: "teamName",
        label: "Team Name",
        type: "text",
        placeholder: "Enter your team name",
        required: true,
        gridSpan: 2,
      },
      {
        name: "teamSize",
        label: "Team Size",
        type: "select",
        required: true,
        options: sizeOptions,
        gridSpan: 2,
      },
      ...memberFields,
    ],
  };
};

// Common steps that can be reused
export const COMMON_STEPS = {
  guidelines: {
    id: 1,
    title: "Guidelines",
    fields: [], // No fields, just display guidelines
  },
  personalDetails: {
    id: 2,
    title: "Team Leader Details",
    fields: [
      {
        name: "teamLeaderName",
        label: "Team Leader Name",
        type: "text",
        placeholder: "John Doe",
        required: true,
        validation: {
          minLength: 3,
          errorMessage: "Name must be at least 3 characters",
        },
        gridSpan: 2,
      },
      {
        name: "teamLeaderEmail",
        label: "Email ID",
        type: "email",
        placeholder: "john@college.edu",
        required: true,
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          errorMessage: "Please enter a valid email address",
        },
      },
      {
        name: "teamLeaderNumber",
        label: "Mobile Number",
        type: "tel",
        placeholder: "+91 9876543210",
        required: true,
        validation: {
          pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
          errorMessage: "Please enter a valid mobile number",
        },
      },
    ] as FormField[],
  },
  academicDetails: {
    id: 3,
    title: "Academic Details",
    fields: [
      {
        name: "collegeName",
        label: "College Name",
        type: "text",
        placeholder: "St. Joseph's Degree College",
        required: true,
        gridSpan: 2,
      },
      {
        name: "discipline",
        label: "Discipline",
        type: "text",
        placeholder: "BBA / BCom",
        required: true,
      },
      {
        name: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      },
      {
        name: "rollNumber",
        label: "College ID",
        type: "text",
        placeholder: "1234-56-789-000",
        required: true,
        gridSpan: 2,
      },
    ] as FormField[],
  },
};

// Event-specific configurations
export const EVENT_CONFIGS: Record<string, EventRegistrationConfig> = {
  // "venture-vaults": {
  //   eventName: "Venture Vault",
  //   eventSlug: "venture-vaults",
  //   sheetName: "VentureVault",
  //   fee: 100,
  //   description: "The Ultimate Business Plan Competition",
  //   maxTeamSize: 4,
  //   steps: [
  //     createGuidelineStep(["Team of 2 to 4 Members are eligible."]),
  //     COMMON_STEPS.personalDetails,
  //     COMMON_STEPS.academicDetails,
  //     createTeamDetails(4),
  //     createPaymentDetails("formal"),
  //   ],
  // },
  // "brand-revival": {
  //   eventName: "Brand Revival Challenge",
  //   eventSlug: "brand-revival",
  //   sheetName: "BrandRevivalChallenge",
  //   fee: 100,
  //   description: "Rebuild. Reignite. Rebrand.",
  //   maxTeamSize: 4, 
  //   steps: [
  //     createGuidelineStep(["Team of 2 to 4 Members are eligible."]),
  //     COMMON_STEPS.personalDetails,
  //     COMMON_STEPS.academicDetails,
  //     createTeamDetails(4),
  //     createPaymentDetails("formal"),
  //   ],
  // },
  // "meme-market": {
  //   eventName: "Meme Market",
  //   eventSlug: "meme-market",
  //   sheetName: "MemeMarket",
  //   fee: 100,
  //   description: "Viral Marketing with Humor",
  //   maxTeamSize: 3,
  //   steps: [
  //     createGuidelineStep(["Team of 2 to 3 Members are eligible."]),
  //     COMMON_STEPS.personalDetails,
  //     COMMON_STEPS.academicDetails,
  //     createTeamDetails(3),
  //     createPaymentDetails("informal"),
  //   ],
  // },
  // "tech-trek": {
  //   eventName: "Tech Trek",
  //   eventSlug: "tech-trek",
  //   sheetName: "TechTrek",
  //   fee: 100,
  //   description: "The Ultimate IT & Business Quiz",
  //   maxTeamSize: 3,
  //   steps: [
  //     createGuidelineStep(["Team of 2 to 3 Members are eligible."]),
  //     COMMON_STEPS.personalDetails,
  //     COMMON_STEPS.academicDetails,
  //     createTeamDetails(3),
  //     createPaymentDetails("informal"),
  //   ],
  // },
  // "tune-trap": {
  //   eventName: "Tune Trap",
  //   eventSlug: "tune-trap",
  //   sheetName: "TuneTrap",
  //   fee: 100,
  //   description: "The Ultimate Musical Showdown",
  //   maxTeamSize: 2,
  //   steps: [
  //     createGuidelineStep(["Team of only 2 Members are eligible."]),
  //     COMMON_STEPS.personalDetails,
  //     COMMON_STEPS.academicDetails,
  //     createTeamDetails(2),
  //     createPaymentDetails("informal"),
  //   ],
  // },
  "corporate-canvas": {
    eventName: "Corporate Canvas",
    eventSlug: "corporate-canvas",
    sheetName: "CorporateCanvas",
    fee: 100,
    description: "Design the Future of Ads",
    maxTeamSize: 2,
    steps: [
      createGuidelineStep(["Team of only 2 Members are eligible."]),
      COMMON_STEPS.personalDetails,
      COMMON_STEPS.academicDetails,
      createTeamDetails(2),
      createPaymentDetails("informal"),
    ],
  },
};

// Helper function to get event config
export function getEventConfig(
  eventSlug: string,
): EventRegistrationConfig | null {
  return EVENT_CONFIGS[eventSlug] || null;
}
