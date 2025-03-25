// export function processFormData(data: Record<string, any>, fields: string[]) {
//   return Object.fromEntries(
//     Object.entries(data).map(([key, value]) => {
//       if (
//         fields.includes(key) &&
//         typeof value === "string" &&
//         !isNaN(Number(value))
//       ) {
//         return [key, Number(value)]; // Convert to number
//       }
//       return [key, value];
//     })
//   );
// }
