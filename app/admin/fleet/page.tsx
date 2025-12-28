import { FleetGantt } from "@/components/admin/FleetGantt";
import { Button } from "@/components/ui/Button";
import { Calendar as CalendarIcon, Filter } from "lucide-react";

export default function FleetPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white">Fleet View</h1>
                    <p className="text-marble-200/50 mt-1">Resource allocation & schedule management</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-gold/20 text-gold hover:bg-gold/10">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Today
                    </Button>
                    <Button variant="outline" size="sm" className="border-marble/10 text-marble hover:bg-marble/5">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="bg-charcoal rounded-xl border border-gold/10 overflow-hidden shadow-2xl">
                <FleetGantt />
            </div>
        </div>
    );
}
