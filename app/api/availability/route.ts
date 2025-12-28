import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/scheduling";
import { Location } from "@/lib/db-mock";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { startTime, durationHours, location } = body;

        if (!startTime || !durationHours || !location) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const start = new Date(startTime);
        const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

        const result = await checkAvailability(start, end, location as Location);

        return NextResponse.json(result);

    } catch (e) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
