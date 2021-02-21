export async function getProducts(api) {
  const data = await fetch(api);
  return await data.json();
}
