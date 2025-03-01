import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product)
    return NextResponse.json({ error: "Product Not Found" }, { status: 404 });

  return NextResponse.json(product, { status: 200 });
}
