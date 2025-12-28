"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Message = {
    id: string;
    sender: "user" | "ai";
    text: string;
    type?: "text" | "confirmation";
    details?: {
        service: string;
        date: string;
        price: string;
    };
};

export function NaturalLanguageBooking() {
    const [step, setStep] = useState<"chat" | "security">("chat");
    const [accessCode, setAccessCode] = useState("");
    const [doNotTouch, setDoNotTouch] = useState("");

    // Restoring missing state variables
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "ai",
            text: "Hello! I'm your personal concierge. Tell me what you need, for example: 'I need a deep clean for my 2-bedroom condo next Friday morning.'",
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simple keyword extraction simulation
        const lowerInput = input.toLowerCase();
        let service = "Standard Luxury Clean";
        if (lowerInput.includes("deep")) service = "Deep Luxury Clean";
        if (lowerInput.includes("move")) service = "Move-In/Move-Out Valet";

        // Simulate delay
        setTimeout(() => {
            setIsTyping(false);

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                text: "I've analyzed your request. Here is a proposed itinerary:",
                type: "confirmation",
                details: {
                    service: service,
                    date: "Next Friday, 9:00 AM", // Mocked date parsing
                    price: "$350.00",
                },
            };

            setMessages((prev) => [...prev, aiResponse]);
        }, 1500);
    };

    return (
        <section className="py-24 bg-onyx-950 text-marble relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-onyx-900 to-transparent opacity-30" />

            <div className="container px-4 mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">

                {/* Text Side */}
                <div className="flex-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-medium tracking-widest uppercase text-sm">Concierge Service</span>
                        <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6 text-marble">Just Ask. We'll Handle the Rest.</h2>
                        <p className="text-marble-200/80 text-lg leading-relaxed">
                            Skip the forms. Our advanced AI concierge understands natural language, allowing you to book complex requests in seconds. It remembers your preferences, so you never have to repeat yourself.
                        </p>
                    </motion.div>

                    <div className="flex gap-4 pt-4">
                        <div className="flex items-center gap-2 text-marble-200/60 text-sm">
                            <CheckCircle className="h-4 w-4 text-gold" />
                            <span>Context-Aware</span>
                        </div>
                        <div className="flex items-center gap-2 text-marble-200/60 text-sm">
                            <CheckCircle className="h-4 w-4 text-gold" />
                            <span>Instant Availability</span>
                        </div>
                    </div>
                </div>

                {/* Interface Container */}
                <div className="flex-1 w-full max-w-md">
                    <div className="bg-charcoal rounded-sm overflow-hidden shadow-2xl h-[600px] flex flex-col border border-gold/10">

                        {/* Header */}
                        <div className="bg-onyx p-4 flex items-center justify-between border-b border-gold/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center relative border border-gold/20">
                                    <Bot className="h-6 w-6 text-gold" />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-onyx"></div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-marble">LuxConcierge AI</h3>
                                    <p className="text-xs text-marble-200/50">Online • Typically replies instantly</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Switcher */}
                        {step === "chat" ? (
                            <>
                                {/* Messages Area */}
                                <div
                                    ref={scrollRef}
                                    className="flex-1 bg-onyx-950/50 p-4 overflow-y-auto space-y-4"
                                >
                                    <AnimatePresence>
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[85%] rounded-2xl p-4 text-sm ${msg.sender === "user"
                                                        ? "bg-gold text-onyx rounded-br-none font-medium"
                                                        : "bg-charcoal text-marble shadow-sm border border-gold/10 rounded-bl-none"
                                                        }`}
                                                >
                                                    <p>{msg.text}</p>

                                                    {msg.type === "confirmation" && msg.details && (
                                                        <div className="mt-4 bg-onyx/50 rounded-lg p-3 border border-gold/10">
                                                            <div className="flex items-center gap-2 mb-2 text-gold">
                                                                <Calendar className="h-4 w-4" />
                                                                <span className="font-bold text-xs uppercase tracking-wide">Proposed Itinerary</span>
                                                            </div>
                                                            <div className="space-y-1 mb-3">
                                                                <div className="flex justify-between">
                                                                    <span className="text-marble-200/60">Service</span>
                                                                    <span className="font-medium text-marble">{msg.details.service}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-marble-200/60">Date</span>
                                                                    <span className="font-medium text-marble">{msg.details.date}</span>
                                                                </div>
                                                                <div className="flex justify-between border-t border-gold/10 pt-1 mt-1">
                                                                    <span className="text-marble-200/60">Total</span>
                                                                    <span className="font-bold text-gold">{msg.details.price}</span>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                className="w-full bg-gold text-onyx hover:bg-gold-light h-9 font-medium"
                                                                onClick={() => setStep("security")}
                                                            >
                                                                Review & Secure Check
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {isTyping && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                            <div className="bg-charcoal rounded-2xl rounded-bl-none p-4 shadow-sm border border-gold/10 flex gap-1">
                                                <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <span className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-charcoal border-t border-gold/10">
                                    <form
                                        className="relative flex items-center gap-2"
                                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    >
                                        <Input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Type your request..."
                                            className="pr-12 border-gold/10 bg-onyx text-marble focus:bg-onyx focus:border-gold/50 transition-colors placeholder:text-marble-200/20"
                                        />
                                        <Button
                                            type="submit"
                                            size="sm"
                                            className="absolute right-1 top-1 bottom-1 w-10 px-0 rounded-md bg-gold text-onyx hover:bg-gold-light"
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 bg-onyx-950/50 p-6 overflow-y-auto space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-gold/20">
                                        <ShieldCheck className="h-6 w-6 text-gold" />
                                    </div>
                                    <h3 className="text-xl font-serif text-white">Secure Access & Safety</h3>
                                    <p className="text-sm text-marble-200/50 mt-1">Encrypted end-to-end for your privacy.</p>
                                </div>

                                {/* Do Not Touch List */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-red-400 flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4" />
                                        "DO NOT TOUCH" LIST
                                    </label>
                                    <p className="text-xs text-marble-200/50">
                                        Strictly prohibited items/areas. This will be marked in RED on staff devices.
                                    </p>
                                    <textarea
                                        value={doNotTouch}
                                        onChange={(e) => setDoNotTouch(e.target.value)}
                                        placeholder="e.g. The grand piano in the living room, the wine cellar..."
                                        className="w-full bg-onyx border border-red-900/30 rounded-lg p-3 text-sm text-red-100 placeholder:text-red-900/50 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 outline-none h-24 resize-none"
                                    />
                                </div>

                                {/* Secure Access */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gold flex items-center gap-2">
                                        <Lock className="h-4 w-4" />
                                        Entry Instructions
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="password"
                                            value={accessCode}
                                            onChange={(e) => setAccessCode(e.target.value)}
                                            placeholder="Gate code / Alarm code"
                                            className="bg-onyx border-gold/10 text-white pl-10"
                                        />
                                        <EyeOff className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/50" />
                                    </div>
                                    <p className="text-[10px] text-green-400/70 flex items-center gap-1">
                                        <ShieldCheck className="h-3 w-3" />
                                        Only revealed to team 1 hour prior to arrival.
                                    </p>
                                </div>

                                <div className="pt-4 space-y-3">
                                    <Button
                                        className="w-full bg-gold text-onyx font-bold hover:bg-gold-light"
                                        onClick={async () => {
                                            // Extract latest AI message details
                                            const lastAiMsg = [...messages].reverse().find(m => m.sender === 'ai' && m.details);
                                            if (!lastAiMsg?.details) return;

                                            const payload = {
                                                service: lastAiMsg.details.service,
                                                date: lastAiMsg.details.date,
                                                price: lastAiMsg.details.price,
                                                location: "Tampa", // Default for demo
                                                accessCode,
                                                doNotTouch
                                            };

                                            try {
                                                const res = await fetch('/api/booking/create', {
                                                    method: 'POST',
                                                    body: JSON.stringify(payload),
                                                    headers: { 'Content-Type': 'application/json' }
                                                });
                                                const data = await res.json();

                                                if (data.success) {
                                                    alert("Booking Confirmed! Check console for SMS/Email logs.");
                                                    window.location.reload(); // Reset for demo
                                                } else {
                                                    alert("Error: " + data.error);
                                                }
                                            } catch (e) {
                                                alert("Network Error");
                                            }
                                        }}
                                    >
                                        Authorize Hold & Book
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-marble-200/50 hover:text-white"
                                        onClick={() => setStep("chat")}
                                    >
                                        Back to Concierge
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                    </div>
                </div>

            </div>
        </section>
    );
}

// Add these imports to the top if missing
import { ShieldCheck, Lock, AlertTriangle, EyeOff } from "lucide-react";
