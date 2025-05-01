import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const buyer = await prisma.user.findUnique({
      where: { id: body.buyerId },
    });

    const seller = await prisma.user.findUnique({
      where: { id: body.creatorId },
    });

    const product = await prisma.product.findUnique({
      where: { id: body.productId },
    });

    if (!buyer || !seller || !product) {
      return NextResponse.json("Invalid buyer, seller, or product", {
        status: 500,
      });
    }

    const notification = await prisma.notification.create({
      data: {
        quantity: body.quantity,
        buyer: {
          connect: { id: body.buyerId },
        },
        creator: {
          connect: { id: body.creatorId },
        },
        product: {
          connect: { id: body.productId },
        },
      },
    });

    if (!notification) {
      return NextResponse.json(
        { error: "There was an error creating the notification" },
        { status: 500 }
      );
    }

    return NextResponse.json(notification, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const userId = await request.headers.get("user-id");

  try {
    if (!userId) return NextResponse.json("Invalid User ID", { status: 400 });
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return NextResponse.json("Invalid User ID", { status: 400 });

    const notifications = await prisma.notification.findMany({
      where: { creatorId: userId },
      include: {
        buyer: true,
        product: true,
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  try {
    const notification = await prisma.notification.findUnique({
      where: { id: body.notificationId },
    });

    if (!notification) {
      return NextResponse.json("Invalid notification deletion request", {
        status: 200,
      });
    }

    const deleted = await prisma.notification.delete({
      where: { id: body.notificationId },
    });
    return NextResponse.json(deleted, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
