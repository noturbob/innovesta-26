import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fields: { [key: string]: string } = {};
    const files: {
      [key: string]: {
        filepath: string;
        originalFilename: string;
        mimetype: string;
        size: number;
        buffer: Buffer<ArrayBuffer>;
      };
    } = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const buffer = await value.arrayBuffer();
        files[key] = {
          filepath: value.name,
          originalFilename: value.name,
          mimetype: value.type,
          size: value.size,
          buffer: Buffer.from(buffer),
        };
      } else {
        fields[key] = value;
      }
    }
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
    const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !IMGBB_API_KEY) {
      return NextResponse.json(
        { error: "Server Configuration Error" },
        { status: 500 },
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    let fileUrl = "";

    if (files.screenshot) {
      const file = files.screenshot;

      console.log("Uploading image to ImgBB...");

      // Convert buffer to base64
      const base64Image = file.buffer.toString("base64");

      // Create form data for ImgBB
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", base64Image);

      // Upload to ImgBB
      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imgbbFormData,
        },
      );

      const imgbbData = await imgbbResponse.json();

      if (!imgbbData.success) {
        throw new Error("Failed to upload image to ImgBB");
      }

      fileUrl = imgbbData.data.url;
      console.log("Image uploaded successfully:", fileUrl);
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A2", // Adjust based on your sheet structure
      valueInputOption: "RAW",
      requestBody: {
        values: [[new Date().toISOString(), ...Object.values(fields), fileUrl]],
      },
    });

    return NextResponse.json({ success: true, fields, files });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 },
    );
  }
}
