"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-onyx-950 flex flex-col items-center justify-center">
            {/* Video Background with Heavy Matte Overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover opacity-80 mix-blend-normal"
                >
                    {/* Placeholder: Luxury Living Room. 
                        TODO: Replace with custom footage of "two professional women cleaning a beach home" 
                        when available. Place file in /public/hero-video.mp4 */}
                    <source
                        src="/hero-video.mp4"
                        type="video/mp4"
                    />
                    <div className="h-full w-full bg-onyx-950" />
                </video>
                {/* Lighter Gradient Overlay for text readability only at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/40 to-transparent" />
                <div className="absolute inset-0 bg-onyx-950/10" />
            </div>

            {/* Subtle Gradient Spotlights - Minimalist Depth */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-onyx-800/50 rounded-full blur-[100px] pointer-events-none z-10" />

            <div className="relative z-20 container px-4 mx-auto flex flex-col items-center text-center">

                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-32 h-32 md:w-48 md:h-48 mb-8 md:mb-12"
                >
                    <Logo />
                </motion.div>

                {/* Typography - Clean & Minimal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-3xl space-y-6"
                >
                    <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase opacity-100">
                        Crystal Clean Collective
                    </span>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-wide leading-tight drop-shadow-2xl">
                        Precision in <span className="text-gold italic">every facet.</span>
                    </h1>

                    <p className="mx-auto max-w-lg text-lg text-marble-100/90 leading-relaxed font-light tracking-wide">
                        The ultimate standard in luxury home care.
                        Matte finishes, crystal clarity, and golden service.
                    </p>

                    <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" variant="gold" className="min-w-[180px] text-onyx font-bold tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                            Book Service
                        </Button>
                        <Button size="lg" variant="outline" className="min-w-[180px] border-gold/30 text-white hover:bg-gold/10 hover:border-gold">
                            Our Standards
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Ultra-Minimal Scroll Line */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 60 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-t from-gold/50 to-transparent"
            />
        </div>
    );
}
