"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header"; // Importing the Header component

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState("");

  const onSubmit = async (data: any) => {
    setStatus("Sending...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Message Sent Successfully!");
        reset();
      } else {
        setStatus("Error Sending Message.");
      }
    } catch (error) {
      setStatus("Failed to Send Message.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" placeholder="Your Name" {...register("name", { required: true })} className="w-full p-2 border rounded-md" />
          <input type="email" placeholder="Your Email" {...register("email", { required: true })} className="w-full p-2 border rounded-md" />
          <textarea placeholder="Your Message" {...register("message", { required: true })} className="w-full p-2 border rounded-md"></textarea>
          <Button type="submit" className="w-full">Send Message</Button>
          <p className="text-sm mt-2 text-center text-green-600">{status}</p>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Email: info@fynorra.com</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-blue-500 hover:underline">Twitter</a>
            <a href="https://tinyurl.com/yph7atbd" className="text-blue-500 hover:underline">LinkedIn</a>
            <a href="#" className="text-blue-500 hover:underline">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}
