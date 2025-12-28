import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-md border border-navy/10 bg-white/50 px-3 py-2 text-sm text-navy font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-navy/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20 focus-visible:border-navy disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
