'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  agreeToNewsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      // Here you would integrate with your authentication service
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Account created successfully! Welcome to Fynorra.');
        
        // Redirect to dashboard after successful signup
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            className="mt-2 bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="John"
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            className="mt-2 bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Doe"
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Username */}
      <div>
        <Label htmlFor="username" className="text-slate-300">Username</Label>
        <Input
          id="username"
          {...register('username')}
          className="mt-2 bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
          placeholder="johndoe"
          disabled={isLoading}
        />
        {errors.username && (
          <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
        )}
        <p className="text-slate-400 text-sm mt-1">
          This will be your public profile URL: fynorra.com/@johndoe
        </p>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-slate-300">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="mt-2 bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
          placeholder="john@example.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="password" className="text-slate-300">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            className="mt-2 bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Create a password"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="mt-2 bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* Agreements */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
            className="mt-1"
          />
          <div className="space-y-1">
            <Label htmlFor="agreeToTerms" className="text-slate-300 text-sm">
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:text-primary/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:text-primary/80">
                Privacy Policy
              </a>
            </Label>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToNewsletter"
            onCheckedChange={(checked) => setValue('agreeToNewsletter', checked as boolean)}
            className="mt-1"
          />
          <div className="space-y-1">
            <Label htmlFor="agreeToNewsletter" className="text-slate-300 text-sm">
              I want to receive updates about new features and writing opportunities
            </Label>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
      >
        {isLoading ? 'Creating account...' : 'Create your account'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-800/50 text-slate-400">Or sign up with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="bg-slate-700/60 border-slate-600 text-white hover:bg-slate-600/60"
          disabled={isLoading}
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="bg-slate-700/60 border-slate-600 text-white hover:bg-slate-600/60"
          disabled={isLoading}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
          Twitter
        </Button>
      </div>
    </form>
  );
} 