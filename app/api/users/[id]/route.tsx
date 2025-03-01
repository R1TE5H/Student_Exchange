import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = { id: id, name: "Ritesh" };

  return NextResponse.json(user, { status: 200 });
}
