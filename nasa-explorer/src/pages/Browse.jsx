import { useState, useEffect } from "react";
import { searchImages } from "../api/nasa";
import { normalizeImage } from "../utils/normalizeData";
import Card from "../components/Card";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Browse() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // track if user searched

  // Fetch latest results on initial load
  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      const res = await searchImages("latest"); // or "mars", or "" depending on API
      const items = res.collection.items.map(normalizeImage);
      setResults(items);
      setLoading(false);
    };
    fetchLatest();
  }, []);

  // Handle user search
  const handleSearch = async () => {
    setHasSearched(true); // user triggered a search
    setLoading(true);
    const res = await searchImages(query);
    const items = res.collection.items.map(normalizeImage);
    setResults(items);
    setLoading(false);
  };

  return (
    <>
      <input
        placeholder="Search NASA images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <Loader />}

      {/* Show no results only after a search */}
      {!loading && hasSearched && results.length === 0 && (
        <EmptyState message="No results found" />
      )}

      {/* Show latest results or search results */}
      {!loading && results.length > 0 && (
        <div className="grid">
          {results.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}