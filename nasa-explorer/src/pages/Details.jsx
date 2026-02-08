import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Details() {
  const { state: item } = useLocation();
  const navigate = useNavigate();

  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");

  if (!item) {
    return (
      <>
        <p>Item not found.</p>
        <button onClick={() => navigate("/browse")}>
          Go back
        </button>
      </>
    );
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || {};
    if (saved[item.id]) {
      setSummary(saved[item.id].summary || "");
      setCategory(saved[item.id].category || "");
    }
  }, [item.id]);

  const handleSave = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || {};
    notes[item.id] = { summary, category };
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Saved ✅");
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{item.title}</h1>

      <img
        src={item.image}
        width="600"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/600x400?text=No+Image")
        }
      />

      <p>{item.description}</p>
      <p><strong>Date:</strong> {item.date}</p>

      <hr />

      <h3>Your Notes</h3>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="Mission">Mission</option>
        <option value="Planet">Planet</option>
        <option value="Galaxy">Galaxy</option>
        <option value="Asteroid">Asteroid</option>
        <option value="Other">Other</option>
      </select>

      <br /><br />

      <button onClick={handleSave}>Save Summary</button>
    </div>
  );
}