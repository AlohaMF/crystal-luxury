"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    BrainCircuit,
    Box,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navItems = [
    { name: "Command Center", href: "/admin", icon: LayoutDashboard },
    { name: "Fleet View", href: "/admin/fleet", icon: Calendar },
    { name: "Business Brain", href: "/admin/brain", icon: BrainCircuit },
    { name: "Assets & Inventory", href: "/admin/assets", icon: Box },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Trigger */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-onyx-950 border-b border-gold/10 p-4 flex items-center justify-between">
                <div className="w-8 h-8">
                    <Logo />
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-6 w-6 text-gold" /> : <Menu className="h-6 w-6 text-gold" />}
                </Button>
            </div>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={{ x: isOpen ? 0 : "-100%" }}
                // Reset transform on desktop (md) using !important to override framer-motion inline styles
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-onyx-950 border-r border-gold/10 flex flex-col transition-transform duration-300 md:!translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="p-8 flex flex-col items-center border-b border-gold/5 hidden md:flex">
                    <div className="w-16 h-16 mb-4">
                        <Logo />
                    </div>
                    <span className="text-gold text-[10px] tracking-[0.3em] uppercase">Command Center</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-0">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "text-onyx bg-gold font-medium"
                                        : "text-marble-200/60 hover:text-white hover:bg-white/5"
                                )}>
                                    <item.icon className={cn("h-4 w-4", isActive ? "text-onyx" : "text-gold/70 group-hover:text-gold")} />
                                    <span>{item.name}</span>

                                    {/* Active Glow */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-white/20 blur-md opacity-20" />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gold/5">
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/10">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </div>
            </motion.aside>

            {/* Backdrop for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
