import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Simple WhatsApp icon SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn("h-8 w-8", className)}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.75,13.96C17,14.26 17.07,14.78 16.91,15.21C16.75,15.64 16.05,16.11 15.4,16.26C14.75,16.41 14.08,16.5 12.23,15.7C10,14.72 8.53,12.82 8.36,12.57C8.18,12.32 7.1,11 7.1,9.5C7.1,8 8.08,7.03 8.33,6.78C8.58,6.53 8.86,6.48 9.13,6.48C9.21,6.48 9.28,6.48 9.35,6.48C9.5,6.48 9.65,6.5 9.78,6.81C9.93,7.12 10.43,8.4 10.5,8.53C10.58,8.65 10.63,8.78 10.55,8.93C10.48,9.08 10.43,9.18 10.3,9.3C10.18,9.43 10.05,9.55 9.93,9.68C9.8,9.8 9.68,9.93 9.83,10.13C9.98,10.33 10.43,10.98 11.23,11.7C12.23,12.63 12.93,12.98 13.23,13.13C13.53,13.28 13.68,13.23 13.8,13.1C13.93,12.98 14.13,12.73 14.33,12.48C14.53,12.23 14.78,12.18 15.03,12.28C15.28,12.38 16.48,12.93 16.75,13.06C17.03,13.18 17.13,13.23 17.18,13.33C17.23,13.43 17.23,13.53 17.18,13.63C17.13,13.73 16.85,13.83 16.75,13.96M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22C13.66,22 15.25,21.54 16.63,20.75L21.5,22L20.75,17.13C21.54,15.75 22,14.16 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);

export function CtaSection() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-all duration-300"
      >
        <WhatsAppIcon />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300">
            Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}