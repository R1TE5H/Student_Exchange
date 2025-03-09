export function processFormData(data: Record<string, any>, fields: string[]) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      fields.includes(key) && typeof value === "string" ? Number(value) : value,
    ])
  );
}
