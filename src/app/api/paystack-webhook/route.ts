import { NextResponse } from "next/server";
import crypto from "crypto";

// Get the secret key from environment variables.
// This is a CRITICAL step for security.
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

/**
 * Handles incoming POST requests from Paystack's webhook service.
 * It verifies the request's authenticity and processes the event.
 */
export async function POST(req: Request) {
  // 1. Verify the Paystack Secret Key is configured
  if (!PAYSTACK_SECRET_KEY) {
    console.error(
      "🔴 Paystack secret key is not set in environment variables."
    );
    // Do not provide detailed error messages to the public.
    return new NextResponse("Webhook Error: Server configuration issue.", {
      status: 500,
    });
  }

  // 2. Verify the Signature
  // Get the signature from the request headers
  const paystackSignature = req.headers.get("x-paystack-signature");
  // Get the raw request body because we need it to generate our own signature
  const body = await req.text();

  // Create a hash using your secret key and the request body
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex");

  // Compare the hash we generated with the one from Paystack
  if (hash !== paystackSignature) {
    console.warn("🔴 Webhook Error: Invalid signature received.");
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // 3. Process the Event if the Signature is Valid
  try {
    const event = JSON.parse(body);

    console.log(`Received Paystack event: ${event.event}`);

    // We are only interested in successful charges
    if (event.event === "charge.success") {
      const transactionData = event.data;

      // Log successful transaction details for monitoring
      console.log("✅ Payment successful!");
      console.log("Transaction Reference:", transactionData.reference);
      console.log(
        "Amount:",
        transactionData.amount / 100,
        transactionData.currency
      );
      console.log("Customer Email:", transactionData.customer.email);
      console.log("---");

      // ===================================================================
      // >>> YOUR BUSINESS LOGIC GOES HERE <<<
      // This is the most reliable place to handle post-payment actions.
      //
      // Examples:
      // - await db.saveTransaction(transactionData);
      // - await sendConfirmationEmail(transactionData.customer.email);
      // - await grantAccessToCourse(transactionData.customer.email);
      // ===================================================================
    } else {
      // You can handle other events here if needed, e.g., 'transfer.success'
      console.log(`- Skipping event: ${event.event}`);
    }

    // 4. Acknowledge receipt of the webhook with a 200 OK response
    // This tells Paystack to stop sending this event.
    return new NextResponse("Webhook received successfully.", { status: 200 });
  } catch (error) {
    console.error("🔴 Error processing webhook:", error);
    return new NextResponse("Webhook Error: Could not process request.", {
      status: 500,
    });
  }
}
