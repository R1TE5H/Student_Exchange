import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import schema from "./schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userID = await request.headers.get("user-id");

  const validation = schema.safeParse({ userID, ...body });

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const new_product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        creatorId: userID!,
        quantity: body.quantity,
      },
    });
    if (!new_product)
      return NextResponse.json(
        { error: "Unable to Create Product" },
        { status: 400 }
      );
    return NextResponse.json(new_product, { status: 201 });
  } catch (error) {
    console.error("Prisma Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
