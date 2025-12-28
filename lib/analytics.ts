import { Booking } from "@/types";

export interface AnalyticsMetrics {
    totalRevenue: number;
    activeBookings: number;
    utilization: number;
    revenueTrend: { date: string; value: number }[];
    serviceMix: { name: string; value: number }[];
}

export function calculateMetrics(bookings: Booking[]): AnalyticsMetrics {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 1. Total Revenue & Active Bookings
    let totalRevenue = 0;
    let activeCount = 0;

    // 2. Service Mix Map
    const mixMap: Record<string, number> = {};

    // 3. Revenue Trend Map (Last 7 Days)
    const trendMap: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = d.toISOString().split('T')[0];
        trendMap[dateStr] = 0;
    }

    bookings.forEach(booking => {
        // Parse Price (remove $ and ,)
        const price = parseFloat(booking.price.replace(/[^0-9.-]+/g, ""));

        if (booking.status !== 'pending') { // Count mostly confirmed/completed
            totalRevenue += price;
            activeCount++;

            // Service Mix
            const type = booking.type || "Other";
            mixMap[type] = (mixMap[type] || 0) + 1;

            // Trend
            if (booking.date) {
                // Simple aggregation by date
                if (trendMap[booking.date] !== undefined) {
                    trendMap[booking.date] += price;
                }
            }
        }
    });

    // Format Trend for Recharts
    const revenueTrend = Object.keys(trendMap).sort().map(date => ({
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        value: trendMap[date]
    }));

    // Format Mix for Recharts
    const serviceMix = Object.keys(mixMap).map(name => ({
        name,
        value: mixMap[name]
    }));

    return {
        totalRevenue,
        activeBookings: activeCount,
        utilization: 82, // Hardcoded for now, requires capacity math
        revenueTrend,
        serviceMix
    };
}
