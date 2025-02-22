import { z, ZodObject } from "zod";

class HTTP {
  constructor() {}

  async GET(url: string): Promise<any> {
    const data = await fetch(url);
    return await data.json();
  }

  // Might not need the schema parameter
  async PUT(url: string, schema: any) {}
  async POST(url: string, schema: any) {}

  async DELETE(url: string) {}
}

const http = new HTTP();

export default http;
