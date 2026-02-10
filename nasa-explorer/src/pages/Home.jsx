import useFetch from "../hooks/useFetch";
import { fetchAPOD } from "../api/nasa";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import "../styles/Home.css";

export default function Home() {
  const { data, loading, error } = useFetch(fetchAPOD, []);

  if (loading) return <Loader />;
  if (error) return <ErrorState />;

  return (
    <div className="home-page">
  <h2>{data.title}</h2>
  <div className="apod-container">
    <div className="apod-left">
      <img src={data.url} alt={data.title} />
    </div>
    <div className="apod-right">
      <p>{data.explanation}</p>
    </div>
  </div>
</div>

  );
}
