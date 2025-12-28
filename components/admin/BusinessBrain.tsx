"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, Users, MessageSquare, AlertTriangle, PieChart as PieIcon, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Booking } from "@/types";
import { calculateMetrics, AnalyticsMetrics } from "@/lib/analytics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#D4AF37', '#10B981', '#60A5FA', '#F87171'];

export function BusinessBrain() {
    const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/bookings');
                const bookings: Booking[] = await res.json();
                const calculated = calculateMetrics(bookings);
                setMetrics(calculated);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading || !metrics) {
        return <div className="p-12 text-center text-marble-200/50 flex flex-col items-center gap-4">
            <BrainCircuit className="h-12 w-12 text-gold animate-pulse" />
            <span>Analyzing datastreams...</span>
        </div>;
    }

    return (
        <div className="space-y-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Revenue"
                    value={`$${metrics.totalRevenue.toLocaleString()}`}
                    subvalue="Last 7 Days"
                    icon={TrendingUp}
                    color="text-gold"
                />
                <MetricCard
                    label="Active Bookings"
                    value={metrics.activeBookings.toString()}
                    subvalue="Confirmed Jobs"
                    icon={Users}
                    color="text-emerald-400"
                />
                <MetricCard
                    label="Utilization"
                    value={`${metrics.utilization}%`}
                    subvalue="Capacity vs Demand"
                    icon={Activity}
                    color="text-blue-400"
                />
                <MetricCard
                    label="AI Accuracy"
                    value="98.5%"
                    subvalue="Sentiment Analysis"
                    icon={BrainCircuit}
                    color="text-purple-400"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Trend (Line Chart) */}
                <div className="lg:col-span-2 bg-charcoal p-6 rounded-xl border border-gold/10">
                    <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gold" />
                        Revenue Velocity
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={metrics.revenueTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#ecdfcc50"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#ecdfcc50"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#D4AF3740', color: '#ecdfcc' }}
                                    itemStyle={{ color: '#D4AF37' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#D4AF37"
                                    strokeWidth={2}
                                    dot={{ fill: '#D4AF37', strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Mix (Pie Chart) */}
                <div className="bg-charcoal p-6 rounded-xl border border-gold/10">
                    <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                        <PieIcon className="h-4 w-4 text-emerald-400" />
                        Service Distribution
                    </h3>
                    <div className="h-[200px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={metrics.serviceMix}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {metrics.serviceMix.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff20', borderRadius: '8px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white">{metrics.activeBookings}</span>
                        </div>
                    </div>

                    {/* Custom Legend */}
                    <div className="mt-6 space-y-3">
                        {metrics.serviceMix.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-marble-200/80">{item.name}</span>
                                </div>
                                <span className="font-medium text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, subvalue, icon: Icon, color }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-charcoal p-6 rounded-lg border border-gold/5 hover:border-gold/20 transition-colors"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-marble-200/50 text-xs uppercase tracking-wider font-semibold">{label}</span>
                <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div>
                <span className="text-2xl font-bold text-white block mb-1">{value}</span>
                <span className="text-xs text-marble-200/40">{subvalue}</span>
            </div>
        </motion.div>
    );
}
