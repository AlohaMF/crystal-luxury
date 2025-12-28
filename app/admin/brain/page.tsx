import { BusinessBrain } from "@/components/admin/BusinessBrain";

export default function BusinessBrainPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-serif text-white">Business Brain</h1>
                <p className="text-marble-200/50 mt-1">AI-Driven Insights & Predictive Analytics</p>
            </div>
            <BusinessBrain />
        </div>
    );
}
