"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { Sparkles, MessageSquare } from "lucide-react";

export function StickyMobileAction() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the immediate hero area (e.g., 100px)
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {(isVisible || true) && ( // Keeping it true for demo purposes if preferred, or use scroll logic
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-onyx-950/90 p-4 pb-8 backdrop-blur-lg border-t border-gold/10 md:hidden"
                >
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 bg-transparent border-gold/20 text-marble hover:text-gold font-medium h-12">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Chat
                        </Button>
                        <Button variant="gold" className="flex-[2] bg-gold text-onyx h-12 shadow-lg shadow-gold/10">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Book Now
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
