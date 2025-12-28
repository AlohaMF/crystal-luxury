"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Scan, Check, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function VisualQuote() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<null | { duration: string; type: string; notes: string[] }>(null);
    const [dragActive, setDragActive] = useState(false);

    // Simulate AI Analysis
    const handleSimulateUpload = () => {
        setIsAnalyzing(true);
        // Reset previous result
        setResult(null);

        // Simulate network/processing delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                duration: "3.5 Hours",
                type: "Deep Luxury Clean",
                notes: [
                    "High-ceiling dusting required",
                    "Marble floor specialized care identified",
                    "Large window area detected"
                ]
            });
        }, 3000);
    };

    return (
        <section className="py-24 bg-onyx relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-medium tracking-widest uppercase text-sm">AI-Powered Precision</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-marble mt-4 mb-6">Instant Visual Quote</h2>
                        <p className="text-marble-200/70 text-lg">
                            Upload a photo of your space. Our AI analyzes room dimensions, surface materials, and cleaning requirements to generate an instant, accurate estimate.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto bg-charcoal rounded-sm shadow-2xl overflow-hidden border border-gold/10 flex flex-col md:flex-row min-h-[500px]">

                    {/* Upload Area */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center bg-onyx relative border-b md:border-b-0 md:border-r border-gold/10">
                        <AnimatePresence mode="wait">
                            {!isAnalyzing && !result ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-full flex flex-col items-center justify-center"
                                >
                                    <div
                                        className={cn(
                                            "w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer group",
                                            dragActive ? "border-gold bg-gold/5" : "border-marble/10 hover:border-gold hover:bg-onyx-800"
                                        )}
                                        onDragEnter={() => setDragActive(true)}
                                        onDragLeave={() => setDragActive(false)}
                                        onClick={handleSimulateUpload}
                                    >
                                        <div className="h-16 w-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="h-8 w-8 text-gold" />
                                        </div>
                                        <p className="text-marble font-medium mb-2">Click to upload or drag photo</p>
                                        <p className="text-sm text-marble-200/40">Supports JPG, PNG (Max 10MB)</p>
                                    </div>

                                    <div className="mt-8">
                                        <Button onClick={handleSimulateUpload} variant="gold">
                                            Analyze My Space
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="analyzing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-onyx flex flex-col items-center justify-center text-marble p-8"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="relative mb-8">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                    className="w-24 h-24 rounded-full border-t-2 border-r-2 border-gold"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Scan className="h-10 w-10 text-gold" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-serif mb-2">Analyzing Geometry...</h3>
                                            <div className="flex flex-col gap-2 w-full max-w-xs text-sm text-marble-200/50">
                                                <AnalysisStep delay={0.5} text="Identifying surface materials..." />
                                                <AnalysisStep delay={1.5} text="Calculating square footage..." />
                                                <AnalysisStep delay={2.5} text="Estimating labor requirements..." />
                                            </div>
                                        </>
                                    ) : (
                                        // Image Placeholder with Overlay for Result State
                                        <div className="absolute inset-0 overflow-hidden">
                                            {/* Placeholder for uploaded image */}
                                            <div className="w-full h-full bg-onyx-800 relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-onyx-900 to-transparent opacity-90" />
                                                <div className="absolute center h-full w-full flex items-center justify-center text-marble/20 font-serif text-4xl">
                                                    Image Preview
                                                </div>
                                                {/* Scanned Points Overlay */}
                                                <motion.div
                                                    className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className="absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Results Panel */}
                    <div className="flex-1 bg-charcoal p-8 md:p-12 flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-start justify-between border-b border-gold/10 pb-6">
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-marble-200/40 mb-1">Recommended Service</h3>
                                            <h4 className="text-3xl font-serif text-marble">{result.type}</h4>
                                        </div>
                                        <div className="text-right">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-marble-200/40 mb-1">Est. Time</h3>
                                            <h4 className="text-3xl font-serif text-gold">{result.duration}</h4>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h5 className="font-medium text-marble flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-gold" />
                                            AI Insights
                                        </h5>
                                        <ul className="space-y-3">
                                            {result.notes.map((note, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-center gap-3 text-marble-200/80 text-sm"
                                                >
                                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    {note}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4">
                                        <Button variant="gold" className="w-full h-14 text-lg text-onyx">
                                            Book This Service
                                        </Button>
                                        <p className="text-xs text-center mt-3 text-marble-200/40">Final price subject to on-site verification.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center text-center h-full opacity-30 text-marble"
                                >
                                    <Scan className="w-16 h-16 mb-4 text-gold" />
                                    <p className="font-serif text-xl">Awaiting Image...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AnalysisStep({ text, delay }: { text: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-2"
        >
            <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            {text}
        </motion.div>
    );
}
