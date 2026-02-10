import { useState, useEffect } from "react";
import { fetchNeoFeed7Days, searchNeoByName } from "../api/nasa";
import "../styles/Browse.css";

// Helper to search images from NASA API
const searchImages = async (query) => {
  if (!query) return [];
  try {
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return data.collection.items
      .map((item) => item.links?.[0]?.href)
      .filter(Boolean);
  } catch (err) {
    console.error("NASA Images API error:", err);
    return [];
  }
};

export default function Browse() {
  const [query, setQuery] = useState("");
  const [neos, setNeos] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Load last 7 days of NEOs on first load
  useEffect(() => {
    loadLatest();
  }, []);

  const loadLatest = async () => {
    setLoading(true);
    setHasSearched(false);
    try {
      const data = await fetchNeoFeed7Days();
      const flattened = Object.values(data.near_earth_objects).flat();
      setNeos(flattened);
      setImages([]); // no images on initial load
    } catch (err) {
      console.error(err);
      setNeos([]);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setHasSearched(true);

    try {
      // Search for NEOs
      const neoResults = await searchNeoByName(query);
      setNeos(neoResults);

      // Search for NASA images
      const imageResults = await searchImages(query);
      setImages(imageResults);
    } catch (err) {
      console.error(err);
      setNeos([]);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="search-bar">
        <input
          placeholder="Search asteroid or space term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading…</p>}

      {/* Show NASA images */}
      {!loading && images.length > 0 && (
        <div>
          <h2>NASA Images</h2>
          <div className="grid">
            {images.map((img, i) => (
              <div key={i} className="card">
                <img
                  src={img}
                  alt={query}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show asteroid results */}
      {!loading && neos.length > 0 && (
        <div>
          <h1>Near-Earth Objects (Search Results)</h1>
          <div className="grid">
            {neos.map((neo) => (
              <div key={neo.id} className="card">
                <h3>{neo.name}</h3>
                <p>
                  Hazardous:{" "}
                  {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                </p>
                <p>Magnitude: {neo.absolute_magnitude_h}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && hasSearched && neos.length === 0 && images.length === 0 && (
        <p className="empty">No results found</p>
      )}
    </div>
  );
}
