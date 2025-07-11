import { NextResponse } from 'next/server';

// This is our new API endpoint.
export async function GET() {
  try {
    // ===================================================================
    // TODO: Replace this mock data with a real database query.
    // ===================================================================
    // In a real application, you would:
    // 1. Connect to your database (e.g., Firebase, Supabase, Prisma).
    // 2. Query your 'donations' collection or table.
    // 3. Sum up the 'amount' of all successful transactions.
    // Example with a database: const total = await db.donations.aggregate({ _sum: { amount: true } });
    
    // For now, we will use a hardcoded value to demonstrate the progress bar.
    // Let's pretend 75,500 KES has been raised so far.
    const currentAmountRaised = 75500; 
    // ===================================================================

    return NextResponse.json({ total: currentAmountRaised });

  } catch (error) {
    console.error("Error fetching total donations:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}