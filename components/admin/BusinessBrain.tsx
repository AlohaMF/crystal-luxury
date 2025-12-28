"use client";

import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, Users, MessageSquare, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const METRICS = [
    { label: "Sentiment Score", value: "98.5%", trend: "+2.1%", icon: Users, color: "text-emerald-400" },
    { label: "Booking Conv.", value: "42%", trend: "+5.4%", icon: TrendingUp, color: "text-gold" },
    { label: "AI Interactions", value: "1,240", trend: "+12%", icon: MessageSquare, color: "text-blue-400" },
    { label: "Churn Risk", value: "3 Clients", trend: "High Priority", icon: AlertTriangle, color: "text-red-400" },
];

export function BusinessBrain() {
    return (
        <div className="space-y-6">
            {/* AI Header / Visualizer */}
            <div className="relative h-64 bg-onyx-950 rounded-xl border border-gold/10 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50" />

                {/* Animated Brain Core */}
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center backdrop-blur-sm"
                    >
                        <BrainCircuit className="h-12 w-12 text-gold" />
                    </motion.div>
                    <h2 className="mt-4 text-marble font-serif text-2xl">C3 Intelligence</h2>
                    <p className="text-marble-200/50 text-sm">Real-time business inference engine active</p>
                </div>

                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {METRICS.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-charcoal p-6 rounded-lg border border-gold/5 hover:border-gold/20 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-marble-200/50 text-xs uppercase tracking-wider">{m.label}</span>
                            <m.icon className={`h-4 w-4 ${m.color}`} />
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-medium text-white">{m.value}</span>
                            <span className={`text-xs mb-1 ${m.label === "Churn Risk" ? "text-red-400" : "text-green-400"}`}>
                                {m.trend}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Insights Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-charcoal p-6 rounded-xl border border-gold/10">
                    <h3 className="text-lg font-serif text-white mb-4">Demand Heatmap</h3>
                    <div className="h-48 bg-onyx-950 rounded-lg flex items-center justify-center border border-white/5">
                        <p className="text-marble-200/30 text-sm">Interactive Map Visualization Placeholder</p>
                    </div>
                </div>

                <div className="bg-charcoal p-6 rounded-xl border border-gold/10">
                    <h3 className="text-lg font-serif text-white mb-4">Urgent Actions</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="h-4 w-4 text-red-400" />
                                <span className="text-sm text-marble-100">Vehicle 3 Maintenance Required</span>
                            </div>
                            <Button size="sm" variant="outline" className="h-7 text-xs border-red-500/30 text-red-400 hover:bg-red-900/20">
                                Schedule
                            </Button>
                        </div>
                        <div className="p-3 bg-blue-900/10 border border-blue-500/20 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Users className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-marble-100">Staff Shortage: Friday Morning</span>
                            </div>
                            <Button size="sm" variant="outline" className="h-7 text-xs border-blue-500/30 text-blue-400 hover:bg-blue-900/20">
                                Resolve
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
