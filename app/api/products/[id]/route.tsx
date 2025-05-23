import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

// Returns a product with the given ID
export async function GET(request: NextRequest, { params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        creator: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    if (!product)
      return NextResponse.json({ error: "No Product Found" }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Prisma Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
