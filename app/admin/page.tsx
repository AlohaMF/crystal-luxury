import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Users, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white">Daily Operations</h1>
                    <p className="text-marble-200/50 mt-1">Tampa Bay Fleet Status • {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">Export Report</Button>
                    <Button variant="gold" size="sm" className="shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        + New Booking
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Jobs", value: "12", change: "+2", icon: Users, color: "text-blue-400" },
                    { label: "Revenue (Today)", value: "$4,250", change: "+15%", icon: TrendingUp, color: "text-green-400" },
                    { label: "Pending Quotes", value: "5", change: "-1", icon: ArrowUpRight, color: "text-gold" },
                    { label: "Urgent Alerts", value: "1", change: "Vehicle 3", icon: AlertCircle, color: "text-red-400" },
                ].map((stat, i) => (
                    <div key={i} className="bg-charcoal p-6 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/5 ${stat.change.includes('+') ? 'text-green-400' : 'text-marble-200/50'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-marble-200/50">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Placeholder for Fleet View */}
            <div className="bg-charcoal rounded-xl border border-gold/10 p-6 h-[400px] flex items-center justify-center">
                <p className="text-marble-200/30">Fleet Gantt Chart Loading...</p>
            </div>
        </div>
    );
}
