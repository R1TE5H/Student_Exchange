import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validation Here

  const new_product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });

  if (!new_product)
    return NextResponse.json(
      { error: "Unable to Create Product" },
      { status: 400 }
    );

  return NextResponse.json(new_product, { status: 201 });
}
