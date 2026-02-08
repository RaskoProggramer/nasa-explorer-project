import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() =>
        navigate(`/details/${item.id}`, { state: item })
      }
    >
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description.slice(0, 80)}...</p>
    </div>
  );
}