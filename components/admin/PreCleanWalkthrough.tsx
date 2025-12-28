"use client";

import { useState } from "react";
import { Camera, CheckCircle, AlertTriangle, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Room = "Living Room" | "Master Bed" | "Kitchen" | "Guest Bath";

export function PreCleanWalkthrough() {
    const [activeRoom, setActiveRoom] = useState<Room>("Living Room");
    const [issues, setIssues] = useState<string[]>([]);

    const rooms: Room[] = ["Living Room", "Master Bed", "Kitchen", "Guest Bath"];

    return (
        <div className="max-w-md mx-auto bg-charcoal rounded-xl border border-gold/10 overflow-hidden">
            {/* Header */}
            <div className="bg-onyx-950 p-6 border-b border-gold/10">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-serif text-white">Pre-Clean Walkthrough</h2>
                    <span className="bg-gold/10 text-gold text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-gold/20">
                        Liability Protection
                    </span>
                </div>
                <p className="text-sm text-marble-200/50">
                    Document any pre-existing damage *before* starting.
                </p>
            </div>

            {/* Room Tabs */}
            <div className="flex overflow-x-auto p-4 gap-2 border-b border-white/5 scrollbar-hide">
                {rooms.map((room) => (
                    <button
                        key={room}
                        onClick={() => setActiveRoom(room)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors",
                            activeRoom === room
                                ? "bg-gold text-onyx font-bold"
                                : "bg-white/5 text-marble-200/60 hover:bg-white/10"
                        )}
                    >
                        {room}
                    </button>
                ))}
            </div>

            {/* Upload Area */}
            <div className="p-6 space-y-6">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-gold/30 hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="text-white font-medium mb-1">Capture Damage</h3>
                    <p className="text-xs text-marble-200/50">Tap to take photo of scratches, stains, or breakage.</p>
                </div>

                {/* Issues List */}
                <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-marble-200/40 font-medium">Recorded Issues ({activeRoom})</h4>

                    {issues.length === 0 ? (
                        <div className="text-center py-4">
                            <CheckCircle className="h-8 w-8 text-green-500/20 mx-auto mb-2" />
                            <p className="text-xs text-green-400/50">No issues recorded yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {issues.map((issue, i) => (
                                <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-red-500/20">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-red-400" />
                                        <span className="text-sm text-white">{issue}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-marble-200/50 hover:text-red-400">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Confirm Button */}
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 h-12">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm {activeRoom} is Clear
                </Button>
            </div>
        </div>
    );
}
