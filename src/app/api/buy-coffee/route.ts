import { NextResponse } from 'next/server';
import { PayheroClient } from '@/lib/payhero'; // Import the new client

/**
 * This API handler now uses the PayheroClient to initiate payments.
 * It's much simpler as it doesn't need to handle M-Pesa's complex auth.
 */
export async function POST(request: Request) {
  try {
    const { phoneNumber, amount } = await request.json();

    if (!phoneNumber || !amount) {
      return NextResponse.json({ message: 'Phone number and amount are required.' }, { status: 400 });
    }

    // Initialize the Payhero client
    const payheroClient = new PayheroClient();

    // Create a unique reference for this transaction
    const reference = `COFFEE-${Date.now()}`;

    // Define the URL where the user will be redirected after payment
    const redirectUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/payment-status?ref=${reference}`;

    const payheroResponse = await payheroClient.createPaymentRequest({
      amount: amount,
      phoneNumber: phoneNumber,
      reference: reference,
      description: 'A kind coffee donation',
      redirectUrl: redirectUrl, // Pass the redirect URL
    });

    // Payhero's API sends the STK push itself.
    // If the request is successful, we just return a success message.
    return NextResponse.json({
      message: '✅ Success! Check your phone to complete the payment.',
      data: payheroResponse,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error in /api/buy-coffee (Payhero):', error);
    return NextResponse.json(
      { message: error.message || 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}