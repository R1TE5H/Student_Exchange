import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Adds a product (body data) to the user's (header data) watch list
// Checks if the product exists
// Checks if the product is already in watch list
// Adds product to user's watch list

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
      // When looking for a unique value using multiple constraining attributes
      // we need to pass field1_field2...{field1: data, field2: data} in the where section
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

// Returns the User's watch list
// Returns all watch list items with the same user ID passed in the header

export async function GET(request: NextRequest) {
  const userID = await request.headers.get("user-id");

  if (!userID) {
    return NextResponse.json({ error: "No User ID provided" }, { status: 400 });
  }

  try {
    const userWatchList = await prisma.userWatchList.findMany({
      // We can pass an object below because we are searching for all that match
      // We can also have multiple constraints without the specific formatting above
      where: { userId: userID },
      include: { product: true },
    });

    if (userWatchList) {
      return NextResponse.json(userWatchList, { status: 200 });
    }

    return NextResponse.json(
      { error: "Unable to retrieve user's watch list" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error retrieving watchlist:", error);
    return NextResponse.json(
      { error: "Unable to retrieve user's watch list" },
      { status: 500 }
    );
  }
}

// Removes an item from the watch list
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const userID = await request.headers.get("user-id");

  if (!userID || !body.productId) {
    return NextResponse.json(
      { error: "Missing userId or productId" },
      { status: 400 }
    );
  }

  try {
    const item = await prisma.userWatchList.findUnique({
      where: {
        userId_productId: { userId: userID, productId: body.productId },
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item not in watch list" },
        { status: 404 }
      );
    }

    const deleted_item = await prisma.userWatchList.delete({
      // When looking for a unique value using multiple constraining attributes
      // we need to pass field1_field2...{field1: data, field2: data} in the where section
      where: {
        userId_productId: {
          userId: userID,
          productId: body.productId,
        },
      },
    });

    if (deleted_item) {
      return NextResponse.json(deleted_item, { status: 200 });
    }

    return NextResponse.json(
      { error: "Unable to remove from watch list" },
      { status: 400 }
    );
  } catch (error) {
    console.log("There was an error while removing from the watch list", error);
    return NextResponse.json(
      { error: "Unable to retrieve user's watch list" },
      { status: 500 }
    );
  }
}
