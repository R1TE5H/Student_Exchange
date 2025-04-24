import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Adds a product (body data) to the user's (header data) cart
// Checks if the product exists
// Checks if the product is already in cart
// Adds product to user's cart

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

    const existingCartEntry = await prisma.userCart.findUnique({
      // When looking for a unique value using multiple constraining attributes
      // we need to pass field1_field2...{field1: data, field2: data} in the where section
      where: {
        userId_productId: {
          userId: userID,
          productId: body.productId,
        },
      },
    });

    if (existingCartEntry) {
      return NextResponse.json(
        { error: "Product is already in your cart" },
        { status: 400 }
      );
    }

    const cartItem = await prisma.userCart.create({
      data: {
        userId: userID,
        productId: body.productId,
        quantity: body.quantity,
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}

// Returns the user's cart
export async function GET(request: NextRequest) {
  const userID = await request.headers.get("user-id");
  if (!userID) {
    return NextResponse.json(
      { error: "Missing userId or productId" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userID },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }

    const cart = await prisma.userCart.findMany({
      where: { userId: userID },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error getting Cart Items");
    return NextResponse.json(
      { error: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}

// Removes item from cart
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const userID = await request.headers.get("user-id");

  if (!userID || !body.productId) {
    return NextResponse.json(
      { error: "Invalid User or Product" },
      { status: 400 }
    );
  }

  try {
    const item = await prisma.userCart.findUnique({
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

    const deleted_item = await prisma.userCart.delete({
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
