import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: { json: () => PromiseLike<{ name: any; email: any; message: any; }> | { name: any; email: any; message: any; }; }) {
  try {
    const { name, email, message } = await req.json();

    // SMTP Transporter Setup
    const transporter = nodemailer.createTransport({
      host: "mail.fynorra.com", // Example: mail.yourdomain.com (For cPanel Webmail)
      port: 465, // Use 465 for secure SSL, or 587 for TLS
      secure: true, // true for SSL, false for TLS
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS,// Your Webmail password
      },
    });

    // Email Options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "infor@fynorra.com", // Your business email (receiver)
      subject: "New Contact Form Submission",
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    } else {
      // handle other types of errors
    }
  }
  }
