import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const products = await

  return NextResponse.json("GET from /api/products", { status: 200 });
}
