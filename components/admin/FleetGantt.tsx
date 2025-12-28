"use client";


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, MapPin, User, AlertCircle } from "lucide-react";
import { Team, Booking } from "@/types";

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM

type TeamWithBookings = Team & { bookings: Booking[] };

export function FleetGantt() {
    const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
    const [teams, setTeams] = useState<TeamWithBookings[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch Teams
                const teamsRes = await fetch('/api/teams');
                const teamsData: Team[] = await teamsRes.json();

                // Fetch Bookings
                const bookingsRes = await fetch('/api/bookings');
                const bookingsData: Booking[] = await bookingsRes.json();

                // Merge Data
                const mergedData = teamsData.map(team => ({
                    ...team,
                    bookings: bookingsData.filter(b => b.teamId === team.id)
                }));

                setTeams(mergedData);
            } catch (error) {
                console.error("Failed to fetch fleet data", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-marble-200/50">Details loading...</div>;
    }

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
                {teams.map((team) => (
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
