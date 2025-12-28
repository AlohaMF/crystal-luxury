import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "LuxClean | Ultra-Luxury Cleaning Services",
    description: "Experience the pinnacle of home care with LuxClean.",
};

import { StickyMobileAction } from "@/components/features/StickyMobileAction";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(
                inter.variable,
                playfair.variable,
                "font-sans antialiased bg-cream text-navy selection:bg-navy selection:text-cream"
            )}>
                {children}
                <StickyMobileAction />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Crystal Clean Collective",
                            "url": "https://www.crystalcleancollective.com",
                            "logo": "https://www.crystalcleancollective.com/logo.png",
                            "description": "Ultra-luxury cleaning services for discerning clients.",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "123 Luxury Lane",
                                "addressLocality": "Beverly Hills",
                                "addressRegion": "CA",
                                "postalCode": "90210",
                                "addressCountry": "US"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+1-800-555-LUXE",
                                "contactType": "customer service"
                            }
                        })
                    }}
                />
            </body>
        </html>
    );
}
