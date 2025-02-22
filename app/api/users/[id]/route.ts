import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  return NextResponse.json(`GET Request from api/users/${id}`, { status: 200 });
}
