import useFetch from "../hooks/useFetch";
import { fetchAPOD } from "../api/nasa";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function Home() {
  const { data, loading, error } = useFetch(fetchAPOD, []);

  if (loading) return <Loader />;
  if (error) return <ErrorState />;

  return (
    <div>
      <h2>{data.title}</h2>
      <img src={data.url} width="500" />
      <p>{data.explanation}</p>
    </div>
  );
}
