import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchShow } from "../api/fetchPata";
import { genres } from "../data";
import PodcastDetail from "../components/Podcasts/PodcastDetail";
import Loading from "../components/UI/Loading";
import ErrorDisplay from "../components/UI/Error";
import styles from "../styles/ShowDetail.module.css";

/**
 * Dynamic show detail page, rendered at "/show/:id".
 *
 * - Reads the show ID from the route parameter via useParams().
 * - Fetches the full show record (with embedded seasons/episodes) on
 *   mount, and re-fetches if the :id changes (e.g. following a link
 *   from one show straight to another without going via the homepage).
 * - Renders loading, error, and not-found states before the success state.
 * - "Back to shows" uses useNavigate() rather than a plain link so it
 *   behaves like a normal back action; since PodcastContext lives above
 *   the router's <Routes> in App.jsx, the homepage's search/filter/sort
 *   state is preserved automatically — no extra work needed here.
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShow(id, setShow, setError, setLoading);
  }, [id]);

  return (
    <main className={styles.main}>
      <button type="button" className={styles.backLink} onClick={() => navigate("/")}>
        ← Back to shows
      </button>

      {loading && <Loading message="Loading podcast..." />}

      {error && (
        <ErrorDisplay message={`Error occurred while fetching podcast: ${error}`} />
      )}

      {!loading && !error && !show && <p className={styles.notFound}>Show not found.</p>}

      {!loading && !error && show && <PodcastDetail show={show} genres={genres} />}
    </main>
  );
}
