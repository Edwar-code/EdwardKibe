import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from '@prisma/client'; // <-- 1. IMPORT PRISMA CLIENT

// Instantiate Prisma Client outside the handler
const prisma = new PrismaClient();

// Get the secret key from environment variables.
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
  if (!PAYSTACK_SECRET_KEY) {
    console.error("🔴 Paystack secret key is not set in environment variables.");
    return new NextResponse("Webhook Error: Server configuration issue.", { status: 500 });
  }

  // Verify the Signature
  const paystackSignature = req.headers.get("x-paystack-signature");
  const body = await req.text();
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex");

  if (hash !== paystackSignature) {
    console.warn("🔴 Webhook Error: Invalid signature received.");
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // Process the Event if the Signature is Valid
  try {
    const event = JSON.parse(body);
    console.log(`Received Paystack event: ${event.event}`);

    // We are only interested in successful charges
    if (event.event === "charge.success") {
      const transactionData = event.data;

      console.log("✅ Payment successful! Preparing to save to database...");
      console.log("Transaction Reference:", transactionData.reference);
      
      // ===================================================================
      // >>> YOUR BUSINESS LOGIC GOES HERE <<<
      // This is where we save the confirmed donation to the database.
      // ===================================================================

      // 2. SAVE THE DONATION USING PRISMA
      const newDonation = await prisma.donation.create({
        data: {
          // Get the data from the Paystack 'transactionData' object
          email: transactionData.customer.email,
          // Paystack amount is in kobo/cents, so divide by 100
          amount: transactionData.amount / 100, 
          // Paystack might not provide a name, so we use a default or the email
          name: transactionData.customer.first_name || transactionData.customer.email,
        },
      });

      console.log("✅ Donation successfully saved to database:", newDonation);
      console.log("---");

    } else {
      console.log(`- Skipping event: ${event.event}`);
    }

    return new NextResponse("Webhook received successfully.", { status: 200 });

  } catch (error) {
    console.error("🔴 Error processing webhook:", error);
    return new NextResponse("Webhook Error: Could not process request.", { status: 500 });
  }
}