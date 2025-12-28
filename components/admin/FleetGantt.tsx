"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, MapPin, User, AlertCircle } from "lucide-react";

// Types
type Booking = {
    id: string;
    client: string;
    location: string;
    startHour: number; // 0-24
    duration: number; // in hours
    type: "Standard" | "Deep" | "Move-In";
    status: "confirmed" | "pending" | "travel";
    notes?: string;
};

type Team = {
    id: string;
    name: string;
    color: string;
    bookings: Booking[];
};

// Mock Data
const TEAMS: Team[] = [
    {
        id: "t1",
        name: "Alpha Team",
        color: "bg-gold",
        bookings: [
            { id: "b1", client: "The resonant Estate", location: "Davis Island", startHour: 8, duration: 4, type: "Deep", status: "confirmed" },
            { id: "b2", client: "Travel", location: "", startHour: 12, duration: 1, type: "Standard", status: "travel" },
            { id: "b3", client: "Penthouse 4B", location: "Bayshore", startHour: 13, duration: 3, type: "Standard", status: "confirmed" },
        ]
    },
    {
        id: "t2",
        name: "Gold Team",
        color: "bg-blue-400",
        bookings: [
            { id: "b4", client: "Modern Villa", location: "Snell Isle", startHour: 9, duration: 5, type: "Deep", status: "confirmed" },
        ]
    },
    {
        id: "t3",
        name: "Onyx Team",
        color: "bg-emerald-400",
        bookings: [
            { id: "b5", client: "Loft 22", location: "Channelside", startHour: 8, duration: 2.5, type: "Standard", status: "confirmed" },
            { id: "b6", client: "Gap Alert", location: "", startHour: 10.5, duration: 1.5, type: "Standard", status: "pending", notes: "Optimization opportunity" },
            { id: "b7", client: "Historic Bungalow", location: "Hyde Park", startHour: 12, duration: 4, type: "Move-In", status: "confirmed" },
        ]
    },
];

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM

export function FleetGantt() {
    const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

    return (
        <div className="flex flex-col h-full bg-onyx-950 text-marble overflow-x-auto">
            {/* Header Row (Hours) */}
            <div className="flex border-b border-gold/10 sticky top-0 bg-onyx-950 z-20 min-w-[1000px]">
                <div className="w-48 p-4 font-medium text-gold/80 border-r border-gold/10 shrink-0">
                    Team
                </div>
                <div className="flex-1 grid grid-cols-12 divide-x divide-white/5">
                    {HOURS.slice(0, 12).map((hour) => (
                        <div key={hour} className="text-xs text-marble-200/50 p-2 text-center">
                            {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                        </div>
                    ))}
                </div>
            </div>

            {/* Teams Rows */}
            <div className="divide-y divide-white/5 min-w-[1000px]">
                {TEAMS.map((team) => (
                    <div key={team.id} className="flex group hover:bg-white/5 transition-colors">
                        {/* Team Name Column */}
                        <div className="w-48 p-4 border-r border-gold/10 shrink-0 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-charcoal border border-gold/20 flex items-center justify-center">
                                    <span className="text-xs font-bold text-gold">{team.name[0]}</span>
                                </div>
                                <span className="font-medium text-sm text-white">{team.name}</span>
                            </div>
                        </div>

                        {/* Timeline Grid */}
                        <div className="flex-1 relative h-24">
                            {/* Grid Lines Background */}
                            <div className="absolute inset-0 grid grid-cols-12 divide-x divide-white/5 pointer-events-none">
                                {HOURS.slice(0, 12).map((h) => <div key={h} className="h-full" />)}
                            </div>

                            {/* Bookings */}
                            {team.bookings.map((booking) => {
                                const startOffset = (booking.startHour - 7) * (100 / 12);
                                const width = booking.duration * (100 / 12);

                                return (
                                    <motion.div
                                        key={booking.id}
                                        layoutId={booking.id}
                                        className={cn(
                                            "absolute top-4 bottom-4 rounded-md border text-xs flex flex-col justify-center px-3 cursor-pointer shadow-lg hover:z-10 hover:shadow-gold/10 transition-all",
                                            booking.status === "travel"
                                                ? "bg-onyx-800 border-dashed border-white/20 opacity-60"
                                                : "bg-charcoal border-gold/30"
                                        )}
                                        style={{
                                            left: `${startOffset}%`,
                                            width: `${width}%`,
                                        }}
                                        onClick={() => setSelectedBooking(booking.id)}
                                    >
                                        {booking.status === "travel" ? (
                                            <div className="flex items-center justify-center gap-2 text-marble-200/50">
                                                <Clock className="h-3 w-3" />
                                                <span>Travel</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-bold text-white truncate">{booking.client}</span>
                                                    {booking.notes && <AlertCircle className="h-3 w-3 text-gold animate-pulse" />}
                                                </div>
                                                <div className="flex items-center gap-2 text-marble-200/60 truncate">
                                                    <MapPin className="h-3 w-3 text-gold/70" />
                                                    <span>{booking.location}</span>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-gold/10 flex gap-6 text-xs text-marble-200/50">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-charcoal border border-gold/30" />
                    <span>Confirmed Job</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-onyx-800 border border-dashed border-white/20" />
                    <span>Travel Time</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-900/20 border border-red-500/30" />
                    <span>Conflict / Gap</span>
                </div>
            </div>
        </div>
    );
}
