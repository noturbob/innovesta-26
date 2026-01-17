"use server";

import { revalidatePath } from "next/cache";

export async function registerStudent(prevState: any, formData: FormData) {
  try {
    // 1. Extract Data
    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
      collegeName: formData.get("collegeName") as string,
      collegeAddress: formData.get("collegeAddress") as string,
      discipline: formData.get("discipline") as string,
      rollNumber: formData.get("rollNumber") as string,
      yearOfStudy: formData.get("yearOfStudy") as string,
      eventName: formData.get("eventName") as string,
      transactionId: formData.get("transactionId") as string,
      // We keep the file object here. 
      // For Google Sheets, he will likely need to upload this to a service (like Drive/Imgur) 
      // and save the URL, or convert it to Base64.
      screenshotFile: formData.get("screenshot") as File,
    };

    // 2. Simple Validation
    if (!rawData.screenshotFile || rawData.screenshotFile.size === 0) {
      return { message: "Please upload a valid payment screenshot." };
    }

    console.log("Form Data Received:", rawData);

    // ============================================================
    // TODO: PASTE GOOGLE SHEETS API LOGIC HERE
    // ============================================================
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath("/");
    return { success: true, message: "Registration successful!" };

  } catch (error: any) {
    console.error("Registration Error:", error);
    return { message: "Failed to register. Please try again." };
  }
}