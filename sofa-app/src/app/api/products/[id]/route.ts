import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = [
    { id: 1, name: 'Luxury Sofa Set', nameAr: 'طقم أريكة فاخر', price: 1299 },
    { id: 2, name: 'Modern Armchair', nameAr: 'كرسي بذراعين عصري', price: 599 },
    { id: 3, name: 'Coffee Table', nameAr: 'طاولة قهوة', price: 349 },
    { id: 4, name: 'Dining Set', nameAr: 'طقم طعام', price: 899 }
  ];
  
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  
  return NextResponse.json(product);
}
