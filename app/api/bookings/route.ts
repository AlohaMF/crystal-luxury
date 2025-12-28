import { NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/storage';
import { Booking } from '@/types';

export async function GET() {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { client, location, startHour, duration, type, date, teamId, price, notes } = body;

        // Basic validation
        if (!client || !date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newBooking: Booking = {
            id: Date.now().toString(),
            client,
            location: location || "Tampa",
            startHour: startHour || 9, // Default to 9 AM if not specified
            duration: duration || 3,
            type: type || "Standard",
            status: "pending",
            date,
            teamId: teamId || "t1", // Default assignment (intelligent assignment would go here)
            price: price || "$0.00",
            notes
        };

        const savedBooking = await createBooking(newBooking);
        return NextResponse.json({ success: true, booking: savedBooking });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
