import { Hero } from "@/components/features/Hero";
import { FeaturesGrid } from "@/components/features/FeaturesGrid";
import { VisualQuote } from "@/components/features/VisualQuote";
import { NaturalLanguageBooking } from "@/components/features/NaturalLanguageBooking";

export default function Home() {
    return (
        <main className="min-h-screen bg-cream">
            <Hero />
            <FeaturesGrid />
            <VisualQuote />
            <NaturalLanguageBooking />
        </main>
    );
}
