import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Details from "./pages/Details";

export default function App() {
  return (
    <>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/browse">Browse</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}