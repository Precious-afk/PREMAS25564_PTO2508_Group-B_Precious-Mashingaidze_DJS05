import styles from "../../styles/GenreTags.module.css";

/**
 * Resolves an array of genre IDs into their titles (using the static
 * genre list from data.js) and renders them as small tag pills.
 * Shared between PodcastCard (preview) and PodcastDetail (full show),
 * so genre-tag styling and lookup logic live in exactly one place.
 *
 * @param {Object} props
 * @param {number[]} props.genreIds - Genre IDs belonging to a show.
 * @param {{id: number, title: string}[]} props.genres - Static genre
 *   definitions from data.js, used to resolve each ID to a title.
 */
export default function GenreTags({ genreIds = [], genres = [] }) {
  return (
    <div className={styles.tags}>
      {genreIds.map((id) => {
        const match = genres.find((g) => g.id === id);
        return (
          <span key={id} className={styles.tag}>
            {match ? match.title : `Unknown (${id})`}
          </span>
        );
      })}
    </div>
  );
}
