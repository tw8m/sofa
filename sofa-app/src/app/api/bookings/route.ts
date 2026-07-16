import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (replace with database in production)
let bookings: any[] = [];

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, phone, email, service, date, description } = body;
    
    if (!name || !phone || !email || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    const booking = {
      id: Date.now(),
      name,
      phone,
      email,
      service,
      date,
      description: description || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    bookings.push(booking);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Send WhatsApp notification
    
    console.log('New booking:', booking);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking submitted successfully',
      bookingId: booking.id 
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
