import SearchBar from "../components/Filters/SearchBar";
import SortSelect from "../components/Filters/SortSelect";
import GenreFilter from "../components/Filters/GenreFilter";
import PodcastGrid from "../components/Podcasts/PodcastGrid";
import Pagination from "../components/UI/Pagination";
import Loading from "../components/UI/Loading";
import ErrorDisplay from "../components/UI/Error";
import { genres } from "../data";
import styles from "../styles/App.module.css";

/**
 * Homepage / listing page, rendered at "/".
 *
 * Shows the search, genre filter, and sort controls, plus the
 * paginated podcast grid. All of the underlying data and filter state
 * comes from PodcastContext (via PodcastProvider in App.jsx), which
 * wraps the router's <Routes> and therefore never unmounts on
 * navigation — so search term, genre, sort, and page number are all
 * preserved automatically when a user visits a show's detail page and
 * comes back.
 *
 * @param {{ loading: boolean, error: string|null }} props
 *   loading/error - Status of the initial podcast list fetch, lifted
 *   up to App.jsx so the fetch only ever runs once per app session.
 */
export default function Home({ loading, error }) {
  return (
    <main className={styles.main}>
      <section className={styles.controls}>
        <SearchBar />
        <GenreFilter genres={genres} />
        <SortSelect />
      </section>

      {loading && <Loading message="Loading podcasts..." />}

      {error && (
        <ErrorDisplay message={`Error occurred while fetching podcasts: ${error}`} />
      )}

      {!loading && !error && (
        <>
          <PodcastGrid genres={genres} />
          <Pagination />
        </>
      )}
    </main>
  );
}
