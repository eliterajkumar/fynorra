// src/components/forms/contact-form.tsx
"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { contactAction, type ContactFormState } from "@/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full group" aria-disabled={pending} disabled={pending}>
      {pending ? (
        <>
          Submitting...
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          Submit Message
          <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(contactAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
        });
        formRef.current?.reset(); // Reset form on success
      } else {
        const errorDescription =
          state.errors?.name?.[0] ||
          state.errors?.email?.[0] ||
          state.errors?.subject?.[0] ||
          state.errors?.message?.[0] ||
          state.errors?.general ||
          state.message;

        toast({
          title: "Oops! Something went wrong.",
          description: errorDescription,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {/* Honeypot anti-spam field */}
      <div className="hidden">
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      <div>
        <Label htmlFor="name" className="text-slate-300">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your Full Name"
          required
          pattern="[a-zA-Z\s]+"
          title="Name should only contain letters and spaces."
          className="bg-slate-700/60 border-slate-600 placeholder:text-slate-500 focus:border-primary mt-1"
        />
        {state?.errors?.name && (
          <p className="text-xs text-red-400 mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-slate-300">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          required
          className="bg-slate-700/60 border-slate-600 placeholder:text-slate-500 focus:border-primary mt-1"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-400 mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="subject" className="text-slate-300">Subject</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          required
          className="bg-slate-700/60 border-slate-600 placeholder:text-slate-500 focus:border-primary mt-1"
        />
        {state?.errors?.subject && (
          <p className="text-xs text-red-400 mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {state.errors.subject[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-slate-300">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your detailed message..."
          required
          rows={5}
          className="bg-slate-700/60 border-slate-600 placeholder:text-slate-500 focus:border-primary mt-1"
        />
        {state?.errors?.message && (
          <p className="text-xs text-red-400 mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {state?.errors?.general && (
        <p className="text-sm text-red-400 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {state.errors.general}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
