import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userID = await request.headers.get("user-id");

  if (!userID || !body.productId) {
    return NextResponse.json(
      { error: "Missing userId or productId" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: body.productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existingWatchListEntry = await prisma.userWatchList.findUnique({
      where: {
        userId_productId: {
          userId: userID,
          productId: body.productId,
        },
      },
    });

    if (existingWatchListEntry) {
      return NextResponse.json(
        { error: "Product is already in your watchlist" },
        { status: 400 }
      );
    }

    const watchlistItem = await prisma.userWatchList.create({
      data: {
        userId: userID,
        productId: body.productId,
      },
    });

    return NextResponse.json(watchlistItem, { status: 201 });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return NextResponse.json(
      { error: "Failed to add product to watchlist" },
      { status: 500 }
    );
  }
}
