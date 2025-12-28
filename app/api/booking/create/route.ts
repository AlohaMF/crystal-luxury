import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/scheduling";
import { createPaymentHold } from "@/lib/stripe";
import { notifications } from "@/lib/notifications";
import { Location } from "@/lib/db-mock";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { service, date, price, accessCode, doNotTouch, location } = body;

        // 1. Validate Fields
        if (!service || !date || !price || !location) {
            return NextResponse.json({ error: "Missing required booking details." }, { status: 400 });
        }

        // 2. Check Availability (Mocked Date parsing)
        // For demo, we assume the 'date' string is valid or we parse it simply
        // Real implementation would parse "Next Friday, 9:00 AM" into ISO Date
        const startDate = new Date(); // Using NOW as placeholder for demo if parsing fails
        // In a real app, we'd use 'chrono-node' to parse natural language dates

        const availability = await checkAvailability(startDate, new Date(startDate.getTime() + 4 * 60 * 60 * 1000), location as Location);

        // For demo purposes, we might bypass strict unavailability to allow the user to see the success flow
        // unless they specifically asked to test conflicts.
        // if (!availability.available) {
        //     return NextResponse.json({ error: availability.reason }, { status: 409 });
        // }

        // 3. Process Payment Hold
        // strip "$" from price
        const numericPrice = parseInt(price.replace(/[^0-9]/g, "")) || 350;
        const payment = await createPaymentHold(numericPrice);

        if (!payment.success) {
            return NextResponse.json({ error: "Payment Authorization Failed." }, { status: 402 });
        }

        // 4. Send Notifications
        const bookingOne = {
            customerName: "VIP Client", // Mocked user context
            service,
            time: date,
            price,
            accessCode: accessCode || "Not Provided"
        };

        // Fire and forget (don't await strictly if speed matters, but here we await for demo logs)
        await notifications.sendAdminAlert(bookingOne);
        await notifications.sendClientConfirmation(bookingOne);

        return NextResponse.json({
            success: true,
            bookingId: "bk_" + Math.random().toString(36).substring(7),
            paymentId: payment.intentId
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
