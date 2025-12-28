"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

// Separate motion props to avoid type conflicts if needed, 
// strictly creating a wrapped motion.button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

        const variants = {
            primary: "bg-gold text-onyx hover:bg-gold-light border-transparent font-medium",
            secondary: "bg-charcoal text-marble hover:bg-charcoal/80 border border-gold/10",
            outline: "bg-transparent border border-gold/30 text-marble hover:border-gold hover:text-gold",
            ghost: "bg-transparent text-marble hover:text-gold hover:bg-gold/5 border-transparent",
            gold: "bg-gold text-onyx hover:bg-gold-light border-transparent font-medium",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-8 text-base",
            lg: "h-14 px-10 text-lg",
        };

        return (
            <motion.button
                ref={ref as any}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...(props as HTMLMotionProps<"button">)}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
