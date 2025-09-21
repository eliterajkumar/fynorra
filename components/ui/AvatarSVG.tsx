import React, { useEffect } from "react";

export type AvatarState = "idle" | "wave" | "typing";

interface AvatarProps {
  state?: AvatarState;
  size?: number; // px
  className?: string;
}

export default function AvatarSVG({ state = "idle", size = 64, className = "" }: AvatarProps) {
  useEffect(() => {
    // no-op placeholder for future hooks (sound, analytics)
  }, [state]);

  // CSS class mapping
  const idleClass = state === "idle" ? "avatar--idle" : "";
  const waveClass = state === "wave" ? "avatar--wave" : "";
  const typingClass = state === "typing" ? "avatar--typing" : "";

  return (
    <>
      <style jsx>{`
        .avatar-root { width: ${size}px; height: ${size}px; display: inline-block; }
        /* ring pulse */
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.07); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .ring { transform-origin: center; }
        .avatar--idle .ring { animation: pulse 2.4s ease-in-out infinite; }

        /* wave: rotate arm group */
        @keyframes wave-anim {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-18deg); }
          50% { transform: rotate(12deg); }
          80% { transform: rotate(-12deg); }
          100% { transform: rotate(0deg); }
        }
        .arm { transform-origin: 12px 28px; transition: transform 180ms ease; }
        .avatar--wave .arm { animation: wave-anim 1.2s ease-in-out 1; }

        /* typing dots */
        @keyframes dot {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.4; }
        }
        .typing-dot { transform-origin: center; opacity: 0.4; }
        .avatar--typing .dot1 { animation: dot 0.9s infinite 0s; }
        .avatar--typing .dot2 { animation: dot 0.9s infinite 0.15s; }
        .avatar--typing .dot3 { animation: dot 0.9s infinite 0.3s; }

        /* accessibility: respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .avatar--idle .ring,
          .avatar--wave .arm,
          .avatar--typing .typing-dot { animation: none !important; }
        }
      `}</style>

      <div className={`avatar-root ${idleClass} ${waveClass} ${typingClass} ${className}`} role="img" aria-label="Fynorra assistant avatar">
        <svg viewBox="0 0 64 64" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          {/* subtle ring */}
          <g className="ring" fill="none" stroke="#06b6d4" strokeOpacity="0.08" strokeWidth="6">
            <circle cx="32" cy="32" r="28" />
          </g>

          {/* torso / body */}
          <g transform="translate(0,4)">
            <ellipse cx="32" cy="44" rx="18" ry="8" fill="#102034" opacity="0.9" />
          </g>

          {/* head */}
          <g>
            <circle cx="32" cy="24" r="12" fill="#f3e9dd" /> {/* skin */}
            {/* hair */}
            <path d="M20 20c4-8 24-8 28 0v2c-6-5-20-6-28 0z" fill="#0b3b5a" opacity="0.9" />
            {/* headset band */}
            <path d="M14 26c0-6 8-10 18-10s18 4 18 10" stroke="#0ea9d5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* mic */}
            <rect x="44" y="28" width="2.6" height="6" rx="1.2" fill="#0ea9d5" transform="rotate(-18 45 31)" />

            {/* eyes */}
            <circle cx="27.5" cy="24" r="1.3" fill="#072031" />
            <circle cx="36.5" cy="24" r="1.3" fill="#072031" />

            {/* smile */}
            <path d="M27 28c1.8 1.4 4.2 1.4 6 0" stroke="#5b3f2a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </g>

          {/* arm (wave) - positioned left */}
          <g className="arm" transform="translate(8,16)">
            <path d="M6 18 C2 14, 2 10, 6 8" stroke="#f3e9dd" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3.4" fill="#f3e9dd" />
          </g>

          {/* small laptop/chat icon on chest */}
          <g transform="translate(22,34)">
            <rect x="0" y="0" width="20" height="12" rx="1.6" fill="#083047" opacity="0.95" />
            <rect x="2.5" y="2" width="15" height="7" rx="0.8" fill="#06b6d4" opacity="0.12" />
          </g>

          {/* typing dots bubble (visible during typing) */}
          <g transform="translate(36,38)">
            <rect x="-8" y="-10" width="26" height="12" rx="6" fill="#072031" opacity="0.85" />
            <g transform="translate(0,-6)">
              <circle className="typing-dot dot1" cx="-2" cy="10" r="1.8" fill="#06b6d4" />
              <circle className="typing-dot dot2" cx="4" cy="10" r="1.8" fill="#06b6d4" />
              <circle className="typing-dot dot3" cx="10" cy="10" r="1.8" fill="#06b6d4" />
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}
