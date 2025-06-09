import { NextResponse } from 'next/server';
import { MpesaClient } from '@/lib/mpesa'; // Make sure the MpesaClient is in src/lib/mpesa.ts

/**
 * This is the API handler for initiating the "Buy Me a Coffee" payment.
 * It is called by the frontend component when the user submits the form.
 *
 * It takes the phone number and amount, validates them, and then uses the
 * MpesaClient to trigger an STK Push to the user's phone.
 */
export async function POST(request: Request) {
  // Use a try...catch block for robust error handling
  try {
    // 1. Get the phone number and amount from the request body
    const { phoneNumber, amount } = await request.json();

    // 2. Add server-side validation for the inputs
    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { message: 'Phone number and amount are required.' },
        { status: 400 }
      );
    }
    if (typeof amount !== 'number' || amount < 1) {
      return NextResponse.json(
        { message: 'Invalid amount. Must be a number greater than 0.' },
        { status: 400 }
      );
    }

    // 3. Initialize the M-Pesa client
    const mpesaClient = new MpesaClient();

    // Log the initiation attempt for debugging
    console.log(`Initiating STK push for ${phoneNumber} with amount ${amount}`);

    // 4. Call the initiateSTKPush method with the required parameters
    const mpesaResponse = await mpesaClient.initiateSTKPush({
      amount: amount,
      phoneNumber: phoneNumber,
      reference: 'BuyMeACoffee', // This is a static reference for your donation type
      description: 'A kind coffee donation', // This is the description the user sees
    });

    // 5. Check the response from the M-Pesa API and return the appropriate response
    // A ResponseCode of "0" means the request was accepted successfully.
    if (mpesaResponse.ResponseCode === '0') {
      return NextResponse.json({
        message: '✅ Success! Check your phone to complete the payment.',
        data: mpesaResponse,
      }, { status: 200 });
    } else {
      // If M-Pesa returns an error, forward that error message to the client.
      return NextResponse.json(
        { message: mpesaResponse.ResponseDescription || 'An error occurred with M-Pesa.' },
        { status: 400 }
      );
    }

  } catch (error: any) {
    // Catch any unexpected errors (e.g., network issues, client not configured)
    console.error('Error in /api/buy-coffee:', error);
    
    // Send a generic but helpful error message back to the client
    return NextResponse.json(
      { message: error.message || 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}