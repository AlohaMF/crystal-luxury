"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Battery, PenTool, Truck, AlertCircle, CheckCircle, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { Asset, AssetType, AssetStatus } from "@/types";

export function AssetTracker() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [newAsset, setNewAsset] = useState<Partial<Asset>>({ type: "Equipment", status: "Active", health: 100 });

    async function fetchAssets() {
        try {
            const res = await fetch('/api/assets');
            const data = await res.json();
            setAssets(data);
        } catch (error) {
            console.error("Failed to fetch assets", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleAddAsset = async () => {
        if (!newAsset.name || !newAsset.type) return;

        try {
            const res = await fetch('/api/assets', {
                method: 'POST',
                body: JSON.stringify(newAsset),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setIsAddModalOpen(false);
                setNewAsset({ type: "Equipment", status: "Active", health: 100, name: "" }); // Reset
                fetchAssets(); // Refresh list
            }
        } catch (error) {
            alert("Failed to add asset");
        }
    };

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
                <Button onClick={() => setIsAddModalOpen(true)} variant="gold" className="text-onyx shadow-lg shadow-gold/10">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Asset
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
                        {loading ? (
                            <tr><td colSpan={6} className="p-8 text-center text-marble-200/50">Loading fleet inventory...</td></tr>
                        ) : assets.map((asset) => (
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

            {/* Add Asset Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-md bg-charcoal border border-gold/20 rounded-xl p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-serif text-white">Add New Asset</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-marble-200/50 hover:text-white">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-marble-200/50 mb-1 block">Asset Name</label>
                                    <Input
                                        value={newAsset.name || ""}
                                        onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
                                        className="bg-onyx-950 border-white/10"
                                        placeholder="e.g. Dyson V15 Detect"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-marble-200/50 mb-1 block">Type</label>
                                        <select
                                            className="w-full bg-onyx-950 border border-white/10 rounded-md h-10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                                            value={newAsset.type}
                                            onChange={e => setNewAsset({ ...newAsset, type: e.target.value as AssetType })}
                                        >
                                            <option value="Equipment">Equipment</option>
                                            <option value="Vehicle">Vehicle</option>
                                            <option value="Uniform">Uniform</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-marble-200/50 mb-1 block">Status</label>
                                        <select
                                            className="w-full bg-onyx-950 border border-white/10 rounded-md h-10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/50"
                                            value={newAsset.status}
                                            onChange={e => setNewAsset({ ...newAsset, status: e.target.value as AssetStatus })}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Retired">Retired</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-wider text-marble-200/50 mb-1 block">Assigned To</label>
                                    <Input
                                        value={newAsset.assignedTo || ""}
                                        onChange={e => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
                                        className="bg-onyx-950 border-white/10"
                                        placeholder="e.g. Alpha Team"
                                    />
                                </div>

                                <Button onClick={handleAddAsset} variant="gold" className="w-full mt-2 text-onyx">
                                    Create Asset Entry
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
