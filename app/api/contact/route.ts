import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  
  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Here you can send an email using a service like SendGrid, Nodemailer, etc.

  return NextResponse.json({ success: true, message: "Message sent successfully" });
}
