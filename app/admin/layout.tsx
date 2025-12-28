import { Sidebar } from "@/components/admin/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Command Center | Crystal Clean",
    description: "Internal Operations Dashboard",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-onyx-950 text-marble selection:bg-gold/30">
            <Sidebar />
            <main className="md:pl-64 min-h-screen transition-all duration-300">
                <div className="container mx-auto p-4 md:p-8 pt-20 md:pt-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
