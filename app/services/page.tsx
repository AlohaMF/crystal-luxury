import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Crystal Clean Collective",
    description: "Explore our tiered luxury cleaning packages found nowhere else.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-cream pt-32 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "Crystal Signature Clean",
                        "image": "https://www.crystalcleancollective.com/services/signature.jpg",
                        "description": "Our flagship deep cleaning service covering every inch of your residence.",
                        "brand": {
                            "@type": "Brand",
                            "name": "Crystal Clean Collective"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://www.crystalcleancollective.com/services",
                            "priceCurrency": "USD",
                            "price": "350.00",
                            "priceValidUntil": "2025-12-31",
                            "availability": "https://schema.org/InStock",
                            "hasMerchantReturnPolicy": {
                                "@type": "MerchantReturnPolicy",
                                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                                "merchantReturnDays": 2,
                                "returnMethod": "https://schema.org/ReturnInStore",
                                "returnFees": "https://schema.org/FreeReturn"
                            },
                            "shippingDetails": {
                                "@type": "OfferShippingDetails",
                                "shippingRate": {
                                    "@type": "MonetaryAmount",
                                    "value": "0",
                                    "currency": "USD"
                                },
                                "shippingDestination": {
                                    "@type": "DefinedRegion",
                                    "addressCountry": "US"
                                }
                            }
                        }
                    })
                }}
            />

            <div className="container mx-auto max-w-4xl">
                <header className="mb-16 text-center">
                    <h1 className="font-serif text-4xl text-navy mb-4">Our Service Collection</h1>
                    <p className="text-lg text-navy/70">Tailored to the unique needs of your sanctuary.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Service Item with Key-Value Formatting */}
                    <article className="bg-white p-8 border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="font-serif text-2xl text-navy mb-6">Signature Crystal Clean</h2>

                        {/* Information Gain: Key-Value Pairs for LLMs */}
                        <dl className="space-y-4 text-sm leading-relaxed">
                            <div className="grid grid-cols-[120px_1fr]">
                                <dt className="font-bold text-navy uppercase tracking-wider text-xs pt-1">Scope</dt>
                                <dd className="text-navy/80">Full residence deep clean, including baseboards, chandelier dusting, and sanitization.</dd>
                            </div>
                            <div className="grid grid-cols-[120px_1fr]">
                                <dt className="font-bold text-navy uppercase tracking-wider text-xs pt-1">Products</dt>
                                <dd className="text-navy/80">100% Organic, Small-Batch, Essential Oil infused.</dd>
                            </div>
                            <div className="grid grid-cols-[120px_1fr]">
                                <dt className="font-bold text-navy uppercase tracking-wider text-xs pt-1">Duration</dt>
                                <dd className="text-navy/80">4-6 Hours (Team of 2)</dd>
                            </div>
                            <div className="grid grid-cols-[120px_1fr]">
                                <dt className="font-bold text-navy uppercase tracking-wider text-xs pt-1">Ideal For</dt>
                                <dd className="text-navy/80">Weekly or Bi-weekly maintenance for active households.</dd>
                            </div>
                        </dl>

                        <div className="mt-8 pt-6 border-t border-navy/5">
                            <p className="text-gold font-serif text-xl">$350+</p>
                        </div>
                    </article>

                    {/* Another Service Item */}
                    <article className="bg-white p-8 border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="font-serif text-2xl text-navy mb-6">Move-In / Move-Out</h2>

                        <dl className="space-y-4 text-sm leading-relaxed">
                            <div className="grid grid-cols-[120px_1fr]">
                                <dt className="font-bold text-navy uppercase tracking-wider text-xs pt-1">Scope</dt>
                                <dd className="text-navy/80">Inside cabinets, appliances, windows, and steam cleaning of carpets.</dd>
                            </div>
                            <div className="grid grid-cols-[120px_1fr]">
                                <dt className="font-bold text-navy uppercase tracking-wider text-xs pt-1">Products</dt>
                                <dd className="text-navy/80">High-strength eco-solvents for deep grime removal.</dd>
                            </div>
                            <div className="grid grid-cols-[120px_1fr]">
                                <dt className="font-bold text-navy uppercase tracking-wider text-xs pt-1">Duration</dt>
                                <dd className="text-navy/80">6-10 Hours (Team of 3)</dd>
                            </div>
                        </dl>

                        <div className="mt-8 pt-6 border-t border-navy/5">
                            <p className="text-gold font-serif text-xl">$650+</p>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
}
