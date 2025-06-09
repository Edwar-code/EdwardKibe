import { NextResponse } from 'next/server';

/**
 * This is the callback handler for M-Pesa.
 * Safaricom's servers will POST to this endpoint after a transaction is completed or fails.
 *
 * For now, we are just logging the result to the Vercel logs for debugging.
 * In a real application with a database, you would:
 * 1. Find the transaction in your DB using the CheckoutRequestID.
 * 2. Update its status (e.g., 'completed', 'failed').
 * 3. If successful, credit the user's account, fulfill the order, etc.
 */
export async function POST(request: Request) {
  try {
    const callbackData = await request.json();

    // Log the entire callback data to Vercel logs
    console.log('--- M-Pesa Callback Received ---');
    console.log(JSON.stringify(callbackData, null, 2));
    console.log('-----------------------------');

    // Here you can add logic based on the callback data
    const stkCallback = callbackData?.Body?.stkCallback;
    if (stkCallback) {
        if (stkCallback.ResultCode === 0) {
            console.log(`Payment successful for CheckoutRequestID: ${stkCallback.CheckoutRequestID}`);
            // You could potentially trigger a notification here (e.g., send yourself an email)
        } else {
            console.error(`Payment failed. Reason: ${stkCallback.ResultDesc}`);
        }
    }

    // Acknowledge receipt of the callback to Safaricom
    return NextResponse.json({ message: "Callback received successfully" }, { status: 200 });

  } catch (error: any) {
    console.error('Error processing M-Pesa callback:', error);
    // Return a 500 error but still acknowledge to avoid retries if possible
    return NextResponse.json({ message: "Error processing callback", error: error.message }, { status: 500 });
  }
}
