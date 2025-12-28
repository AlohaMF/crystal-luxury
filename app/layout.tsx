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
            </body>
        </html>
    );
}
