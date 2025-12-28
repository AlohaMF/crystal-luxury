/**
 * STRIPE PAYMENT LOGIC
 * Optimized for "High Value" Service Logic
 * 
 * Strategy:
 * 1. Create PaymentIntent with capture_method: 'manual'
 * 2. This places a "Hold" on the card for 7 days.
 * 3. Funds are guaranteed but not transferred.
 * 4. Admin manually captures funds after reviewing the job.
 */

// Mock interface for when the real SDK isn't installed
interface PaymentIntent {
    id: string;
    amount: number;
    status: "requires_capture" | "succeeded";
    client_secret: string;
}

export const stripe = {
    paymentIntents: {
        create: async (amountInCents: number): Promise<PaymentIntent> => {
            console.log(`[STRIPE] Creating Pre-Auth Hold for $${(amountInCents / 100).toFixed(2)}`);
            console.log(`[STRIPE] Strategy: capture_method = 'manual'`);

            // Simulate API latency
            await new Promise(resolve => setTimeout(resolve, 800));

            return {
                id: `pi_${Math.random().toString(36).substring(7)}`,
                amount: amountInCents,
                status: "requires_capture", // This is the specific status for Holds
                client_secret: "mock_secret_key"
            };
        },
        capture: async (paymentId: string) => {
            console.log(`[STRIPE] CAPTURING funds for Payment ID: ${paymentId}`);
            return { status: "succeeded" };
        }
    }
};

export async function createPaymentHold(amount: number) {
    try {
        const intent = await stripe.paymentIntents.create(amount * 100); // Convert to cents
        return { success: true, intentId: intent.id, status: intent.status };
    } catch (error) {
        console.error("Stripe Error:", error);
        return { success: false, error: "Payment Authorization Failed" };
    }
}
