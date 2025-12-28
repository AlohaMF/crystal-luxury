"use client";

import { motion } from "framer-motion";
import { Search, Filter, Battery, PenTool, Truck, AlertCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const ASSETS = [
    { id: "V-01", name: "Mercedes Sprinter (Black)", type: "Vehicle", status: "Active", assignedTo: "Alpha Team", health: 92 },
    { id: "E-04", name: "Industrial Steam Cleaner", type: "Equipment", status: "Maintenance", assignedTo: "Depot", health: 45 },
    { id: "V-02", name: "Mercedes Sprinter (Black)", type: "Vehicle", status: "Active", assignedTo: "Gold Team", health: 88 },
    { id: "E-09", name: "HEPA Vacuum Pro", type: "Equipment", status: "Active", assignedTo: "Alpha Team", health: 76 },
    { id: "U-12", name: "Uniform Set (Premium)", type: "Uniform", status: "Cleaning", assignedTo: "Laundry", health: 100 },
];

export function AssetTracker() {
    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-marble-200/30" />
                    <Input placeholder="Search assets..." className="pl-10 bg-charcoal border-gold/10" />
                </div>
                <Button variant="outline" className="border-gold/20 text-gold">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
                <Button variant="gold" className="text-onyx shadow-lg shadow-gold/10">
                    + Add Asset
                </Button>
            </div>

            {/* Table */}
            <div className="bg-charcoal rounded-xl border border-gold/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-onyx-950 border-b border-gold/10 text-xs uppercase text-marble-200/50 tracking-wider">
                        <tr>
                            <th className="p-4">Asset ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Assigned To</th>
                            <th className="p-4">Health</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {ASSETS.map((asset) => (
                            <tr key={asset.id} className="group hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-sm text-gold/70">{asset.id}</td>
                                <td className="p-4 font-medium text-white flex items-center gap-3">
                                    {asset.type === "Vehicle" && <Truck className="h-4 w-4 text-marble-200/50" />}
                                    {asset.type === "Equipment" && <PenTool className="h-4 w-4 text-marble-200/50" />}
                                    {asset.name}
                                </td>
                                <td className="p-4 text-sm text-marble-200/70">{asset.type}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${asset.status === "Active" ? "bg-green-900/20 border-green-500/30 text-green-400" :
                                            asset.status === "Maintenance" ? "bg-red-900/20 border-red-500/30 text-red-400" :
                                                "bg-blue-900/20 border-blue-500/30 text-blue-400"
                                        }`}>
                                        {asset.status === "Active" ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                        {asset.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-marble-200/70">{asset.assignedTo}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-onyx-950 rounded-full overflow-hidden w-24">
                                            <div
                                                className={`h-full rounded-full ${asset.health > 80 ? 'bg-green-400' : asset.health > 50 ? 'bg-gold' : 'bg-red-400'}`}
                                                style={{ width: `${asset.health}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-marble-200/50">{asset.health}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
