import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // ✅ Zoho SMTP Transporter Setup
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in", // India ke liye (Use smtp.zoho.com for Global)
      port: 465, // Secure SSL port
      secure: true, // true for SSL
      auth: {
        user: process.env.ZOHO_USER, // Your Zoho email
        pass: process.env.ZOHO_PASS, // Your Zoho App Password
      },
    });

    // ✅ Email Options
    const mailOptions = {
      from: `"${name}" <${process.env.ZOHO_USER}>`, // Zoho email se send karein
      to: "info@fynorra.com", // Receiver email
      subject: "New Contact Form Submission",
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
