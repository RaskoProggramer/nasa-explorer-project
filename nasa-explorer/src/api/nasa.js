const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov";

export const fetchAPOD = async () => {
  const res = await fetch(
    `${BASE_URL}/planetary/apod?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch APOD");
  return res.json();
};

export const searchImages = async (query) => {
  const res = await fetch(
    `https://images-api.nasa.gov/search?q=${query}`
  );
  if (!res.ok) throw new Error("Failed to search images");
  return res.json();
};
