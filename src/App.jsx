import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPata";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";

/**
 * Root component of the Podcast Explorer app.
 *
 * Handles the one-time podcast list fetch and top-level layout.
 * <Header /> sits outside <PodcastProvider> since it doesn't depend on
 * podcast data and stays visible on every route.
 *
 * <PodcastProvider> wraps <Routes> rather than living inside a single
 * page, so it never unmounts when navigating between "/" and
 * "/show/:id" — this is what keeps search term, genre filter, sort
 * order, and pagination intact when a user goes back to the homepage
 * from a show's detail page.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      <Header />

      <PodcastProvider initialPodcasts={podcasts}>
        <Routes>
          <Route path="/" element={<Home loading={loading} error={error} />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </PodcastProvider>
    </>
  );
}