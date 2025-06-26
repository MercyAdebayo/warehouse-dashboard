import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');
  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  }

  const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
  const productMapPath = path.join(process.cwd(), 'data', 'product_map.json');

  const ordersData = await fs.readFile(ordersPath, 'utf-8');
  const productMapData = await fs.readFile(productMapPath, 'utf-8');

  const orders = JSON.parse(ordersData);
  const productMap = JSON.parse(productMapData);

  const pickList: Record<string, number> = {};

  orders
    .filter((order: any) => order.orderDate === date)
    .forEach((order: any) => {
      order.lineItems.forEach((item: any) => {
        const components = productMap[item.productId] || [];
        components.forEach((product: string) => {
          pickList[product] = (pickList[product] || 0) + 1;
        });
      });
    });

  return NextResponse.json(pickList);
}
