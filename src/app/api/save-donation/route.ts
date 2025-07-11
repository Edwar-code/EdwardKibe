import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, amount } = await req.json();

    if (!name || !email || !amount) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Use Prisma to create a new donation record in the database
    const newDonation = await prisma.donation.create({
      data: {
        name,
        email,
        amount: Number(amount), // Ensure amount is a number
      },
    });

    console.log("Donation saved successfully:", newDonation);
    return NextResponse.json(newDonation, { status: 201 });

  } catch (error) {
    console.error("Failed to save donation:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}