import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const website = body.website?.trim(); // Honeypot field

    // 🕷️ Bot detection via honeypot
    if (website) {
      return NextResponse.json(
        { success: false, message: "Bot submission detected." },
        { status: 400 }
      );
    }

    // 🛡️ Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    // ✉️ Zoho SMTP transporter setup
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in", // use smtp.zoho.com for global
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    // 📬 Mail options
    const mailOptions = {
      from: `"${name}" <${process.env.ZOHO_USER}>`,
      to: "info@fynorra.com",
      subject: "New Contact Form Submission",
      text: message,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br/>")}</p>
      `,
    };

    // 📤 Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
