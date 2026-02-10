import { getLast7Days } from "../utils/date";


const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const APOD_URL = "https://api.nasa.gov";
const BASE_URL = "https://api.nasa.gov/neo/rest/v1";


export const fetchAPOD = async () => {
  const res = await fetch(
    `${APOD_URL}/planetary/apod?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch APOD");
  return res.json();
};

const searchImages = async (query) => {
  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
    const data = await res.json();
    return data.collection.items.map(item => item.links?.[0]?.href).filter(Boolean);
  } catch (err) {
    console.error(err);
    return [];
  }
};


export async function fetchNeoFeed7Days() {
  const { start, end } = getLast7Days();

  const res = await fetch(
    `${BASE_URL}/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch NEO feed");
  return res.json();
}

export async function searchNeoByName(name) {
  const res = await fetch(
    `${BASE_URL}/neo/browse?api_key=${API_KEY}`
  );

  const data = await res.json();

  return data.near_earth_objects.filter((neo) =>
    neo.name.toLowerCase().includes(name.toLowerCase())
  );
}