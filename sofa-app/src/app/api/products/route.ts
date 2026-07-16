import { NextRequest, NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Luxury Sofa Set', nameAr: 'طقم أريكة فاخر', price: 1299, icon: '🛋️', description: 'Premium leather sofa set' },
  { id: 2, name: 'Modern Armchair', nameAr: 'كرسي بذراعين عصري', price: 599, icon: '🪑', description: 'Ergonomic armchair' },
  { id: 3, name: 'Coffee Table', nameAr: 'طاولة قهوة', price: 349, icon: '📦', description: 'Glass top coffee table' },
  { id: 4, name: 'Dining Set', nameAr: 'طقم طعام', price: 899, icon: '🍽️', description: '6-seater dining set' }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // In production, save to database
  console.log('Product inquiry:', body);
  return NextResponse.json({ success: true, message: 'Inquiry received' });
}
