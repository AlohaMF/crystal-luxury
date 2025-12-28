"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Crown } from "lucide-react";

const features = [
    {
        icon: Crown,
        title: "Elite Standards",
        description: "Our staff is rigorously vetted and trained in 5-star hospitality protocols to ensure discretion and perfection.",
    },
    {
        icon: Sparkles,
        title: "Eco-Premium",
        description: "We use only organic, artisanal cleaning products that are safe for your family, pets, and fine surfaces.",
    },
    {
        icon: Shield,
        title: "Bonded & Insured",
        description: "Rest easy knowing your sanctuary is protected by our comprehensive multi-million dollar insurance policy.",
    },
    {
        icon: Clock,
        title: "On Your Terms",
        description: "AI-driven scheduling adapts to your life. Late night or early morning, we work around your rhythm.",
    },
];

export function FeaturesGrid() {
    return (
        <section className="py-32 bg-onyx-950 relative border-t border-white/5">
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold/80 font-normal tracking-[0.2em] uppercase text-xs">Excellence</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-marble mt-4 mb-6 font-light">The Crystal Standard</h2>
                        <div className="h-px w-16 bg-gold/50 mx-auto" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 group relative"
                        >
                            {/* Minimalist Border Hover Effect - Make default border visible */}
                            <div className="absolute inset-0 border border-gold/10 rounded-sm transition-colors duration-500 group-hover:border-gold/50 bg-charcoal/30 backdrop-blur-sm" />

                            <div className="relative z-10">
                                <div className="mb-6 opacity-100 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-6 w-6 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-lg text-white mb-3 group-hover:text-gold transition-colors tracking-wide">{feature.title}</h3>
                                <p className="text-marble-100/70 leading-relaxed text-sm font-light group-hover:text-white transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
