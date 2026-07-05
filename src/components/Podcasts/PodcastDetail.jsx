import { formatDate } from "../../utils/formatDate";
import SeasonNavigation from "./SeasonNavigation";
import GenreTags from "../UI/GenreTags";
import styles from "../../styles/PodcastDetail.module.css";

/**
 * Renders the full details of a single show: image, title, description,
 * genre tags, last-updated date, and the season/episode navigation.
 *
 * @param {Object} props
 * @param {Object} props.show - The fetched SHOW object (title, image,
 *   description, genres, updated, seasons).
 * @param {{id: number, title: string}[]} props.genres - Static genre
 *   definitions, used to resolve the show's genre IDs into titles
 *   (same lookup used by PodcastCard on the homepage).
 */
export default function PodcastDetail({ show, genres }) {
  return (
    <>
      <div className={styles.detail}>
        <img src={show.image} alt={show.title} className={styles.image} />
        <div>
          <h2 className={styles.title}>{show.title}</h2>
          <p className={styles.updated}>Updated {formatDate(show.updated)}</p>
          <GenreTags genreIds={show.genres} genres={genres} />
          <p className={styles.description}>{show.description}</p>
        </div>
      </div>

      <h3>Seasons</h3>
      <SeasonNavigation seasons={show.seasons} />
    </>
  );
}
