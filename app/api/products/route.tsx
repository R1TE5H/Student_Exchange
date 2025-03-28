import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// Returns an array of Products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        creator: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            // ratings: true
          },
        },
      },
    });
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
