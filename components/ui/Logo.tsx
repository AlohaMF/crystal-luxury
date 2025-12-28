import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-full text-gold", className)}
        >
            {/* Diamond Shape */}
            <path
                d="M50 5 L95 35 L50 95 L5 35 Z"
                stroke="currentColor"
                strokeWidth="2"
                className="drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            />
            {/* Inner Geometry - Facets */}
            <path
                d="M5 35 L95 35"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M25 35 L50 5 L75 35"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M25 35 L50 95 L75 35"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M50 35 L50 95"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
            />
            {/* Sparkle Accent */}
            <path
                d="M85 10 L90 20 L95 10 L90 0 Z"
                fill="currentColor"
                className="animate-pulse"
            />
        </svg>
    );
}
