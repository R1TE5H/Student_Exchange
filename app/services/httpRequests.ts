export async function getData(url: string) {
  const data = await fetch(url);
  return await data.json();
}
