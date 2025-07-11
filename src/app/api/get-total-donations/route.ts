import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Use Prisma to get the sum of the 'amount' field from all donations
    const donationAggregation = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
    });

    // The result is in _sum.amount. If there are no donations, it will be null.
    const currentAmountRaised = donationAggregation._sum.amount ?? 0;

    return NextResponse.json({ total: currentAmountRaised });

  } catch (error) {
    console.error("API Error fetching total donations:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}