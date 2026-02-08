export const normalizeImage = (item) => {
  const data = item.data?.[0] || {};
  const link = item.url?.[0]?.href;

  console.log(it)

  return {
    id: data.nasa_id,
    title: data.title || "Untitled",
    description: data.description || "No description available.",
    image:link|| "No Image",
    date: data.date_created || "Unknown",
  };
};