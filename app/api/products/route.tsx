import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    if (!products)
      return NextResponse.json({ error: "No Products Found" }, { status: 400 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Prisma Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
