"use client";

import { useFormState, useFormStatus } from "react-dom";
import { subscribeAction, type SubscribeState } from "@/actions/subscribe";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { useEffect }
 from "react";
import { useToast } from "@/hooks/use-toast";

const initialState: SubscribeState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full group" aria-disabled={pending} disabled={pending}>
      {pending ? "Subscribing..." : "Subscribe"}
      {!pending && <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />}
    </Button>
  );
}

export function SubscribeForm() {
  const [state, formAction] = useFormState(subscribeAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
        });
      } else if (state.errors?.email || state.message) {
         toast({
          title: "Oops!",
          description: state.errors?.email?.[0] || state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);


  return (
    <form action={formAction} className="space-y-3">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input 
          type="email" 
          name="email" 
          placeholder="Enter your email" 
          required 
          className="bg-slate-700/60 border-slate-600 placeholder:text-slate-500 pl-10 focus:border-primary"
        />
      </div>
      {state?.errors?.email && <p className="text-xs text-red-400">{state.errors.email[0]}</p>}
      <SubmitButton />
    </form>
  );
}
