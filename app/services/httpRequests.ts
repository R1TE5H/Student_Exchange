import { z, ZodObject } from "zod";

export async function getData(url: string): Promise<any> {
  const data = await fetch(url);
  return await data.json();
}

// PUT and POST requests should take the endpoint and
// a validation schema as parameters
export async function addData(url: string, schema: any) {}
export async function updateData(url: string, schema: any) {}

export async function deleteData(url: string) {}
