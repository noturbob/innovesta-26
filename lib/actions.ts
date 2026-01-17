// lib/actions.ts
"use server";

import { query } from "@/db";
import { revalidatePath } from "next/cache";

export async function registerStudent(prevState: any, formData: FormData) {
  try {
    // 1. Extract Data
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const collegeName = formData.get("collegeName") as string;
    const collegeAddress = formData.get("collegeAddress") as string;
    const discipline = formData.get("discipline") as string;
    const rollNumber = formData.get("rollNumber") as string;
    const yearOfStudy = formData.get("yearOfStudy") as string;
    const eventName = formData.get("eventName") as string;
    const transactionId = formData.get("transactionId") as string;
    const screenshotFile = formData.get("screenshot") as File;

    // 2. Validate Image
    if (!screenshotFile || screenshotFile.size === 0) {
      return { message: "Please upload a valid payment screenshot." };
    }

    // 3. Convert Image to Buffer for Postgres BYTEA
    // Note: We use arrayBuffer() and convert to Buffer
    const arrayBuffer = await screenshotFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Insert into DB
    // We strictly map the event_name ENUM here
    const sql = `
      INSERT INTO registrations (
        full_name, email, mobile, 
        college_name, college_address, discipline, roll_number, year_of_study,
        event_name, transaction_id, screenshot
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `;

    const values = [
      fullName, email, mobile,
      collegeName, collegeAddress, discipline, rollNumber, yearOfStudy,
      eventName, transactionId, buffer
    ];

    await query(sql, values);

    revalidatePath("/");
    return { success: true, message: "Registration successful!" };

  } catch (error: any) {
    console.error("Registration Error:", error);
    // Handle Duplicate Transaction ID specifically
    if (error.code === '23505') {
      return { message: "This Transaction ID has already been used." };
    }
    return { message: "Failed to register. Please try again." };
  }
}