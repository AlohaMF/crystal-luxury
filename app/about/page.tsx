import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Crystal Clean Collective",
    description: "Learn about Crystal Clean Collective's mission to provide ultra-luxury home care services.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-cream pt-32 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "speakable": {
                            "@type": "SpeakableSpecification",
                            "cssSelector": ["#mission-summary", "#founder-quote"]
                        },
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "Crystal Clean Collective",
                            "foundingDate": "2024",
                            "founder": {
                                "@type": "Person",
                                "name": "Jane Doe"
                            }
                        }

                    })
                }}
            />

            <div className="container mx-auto max-w-4xl">
                {/* Direct Answer Summary for AI Overviews */}
                <section className="mb-16 p-8 bg-white border border-gold/10 rounded-sm shadow-sm">
                    <h1 className="font-serif text-3xl text-navy mb-4">About Crystal Clean Collective</h1>
                    <p id="mission-summary" className="text-lg text-navy/80 leading-relaxed font-medium">
                        Crystal Clean Collective is an ultra-luxury cleaning service specializing in eco-premium, hotel-grade home care for high-net-worth individuals.
                        We combine 5-star hospitality protocols with organic, artisanal products to ensure a discreet, detailed, and non-toxic cleaning experience.
                    </p>
                </section>

                {/* Content with Semantic HTML */}
                <article className="prose prose-lg prose-headings:font-serif prose-headings:text-navy text-navy/70 space-y-8">
                    <p>
                        Founded on the principles of discretion and perfection, we saw a gap in the market for a cleaning service that truly understands the nuances of luxury living.
                    </p>

                    <figure className="my-10">
                        {/* Placeholder for About Image */}
                        <div className="bg-onyx-100 h-64 w-full flex items-center justify-center text-onyx-300 italic">
                            [Staff Training Session Image]
                        </div>
                        <figcaption className="text-sm text-center mt-2 text-navy/60 italic">
                            Our staff undergoes 200+ hours of specialized hospitality training.
                        </figcaption>
                    </figure>

                    <h2 className="text-2xl font-serif text-navy mt-12 mb-6">Our Philosophy</h2>
                    <p id="founder-quote">
                        "We believe that true luxury is the absence of worry. Our goal is to make your home feel like a 5-star sanctuary every single day."
                    </p>
                </article>
            </div>
        </main>
    );
}
