/**
 * NOTIFICATION SYSTEM
 * Channels: SMS (Twilio) & Email (SendGrid/Resend)
 */

interface BookingDetails {
    customerName: string;
    service: string;
    time: string;
    price: string;
    accessCode: string; // ONLY sent to owner, NEVER in email
}

export const notifications = {
    sendAdminAlert: async (booking: BookingDetails) => {
        const message = `
🚨 NEW HIGH-VALUE BOOKING 🚨
---------------------------
Client: ${booking.customerName}
Service: ${booking.service}
Value: ${booking.price}
Time: ${booking.time}

🔒 Access Code: ${booking.accessCode}

Action Required: Review & Capture Payment
Link: https://crystal-clean.com/admin/bookings
        `;

        console.log("\n================ [SMS TO ADMIN] ================");
        console.log(message.trim());
        console.log("==============================================\n");
        return true;
    },

    sendClientConfirmation: async (booking: BookingDetails) => {
        const htmlEmail = `
Subject: Your Sanctuary Awaits - Booking Confirmation

Dear ${booking.customerName},

Your request for a ${booking.service} has been received. 
We have placed a temporary hold on your card. You will not be charged until our Concierge confirms the staffing details.

The Arrival Protocol:
1. Team Allocation: 24h prior
2. Access Code Encryption: Revealed 1h prior
3. White Glove Service: ${booking.time}

Thank you for choosing Crystal Luxury.
        `;

        console.log("\n================ [EMAIL TO CLIENT] ================");
        console.log(htmlEmail.trim());
        console.log("=================================================\n");
        return true;
    }
};
