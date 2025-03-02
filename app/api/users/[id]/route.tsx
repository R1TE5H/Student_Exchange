import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user)
    return NextResponse.json({ error: "Could not find user" }, { status: 404 });

  return NextResponse.json(user, { status: 200 });
}
