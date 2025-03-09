import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const users = await prisma.user.findUnique({
      where: { id: id },
      include: { products: true },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Prisma Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
