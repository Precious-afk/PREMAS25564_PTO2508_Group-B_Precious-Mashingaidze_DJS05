import styles from "../../styles/EpisodeCard.module.css";

/**
 * Truncate a description to a maximum length, preferring to break on a
 * word boundary, and append an ellipsis if truncated.
 *
 * @param {string} text
 * @param {number} [maxLength=120]
 * @returns {string}
 */
function shortenDescription(text = "", maxLength = 120) {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

/**
 * Renders a single episode row: episode number, title, an image
 * (falls back to the season's artwork, since episodes don't carry
 * their own image), and a shortened description.
 *
 * @param {Object} props
 * @param {Object} props.episode - EPISODE object with `episode`, `title`, `description`.
 * @param {string} [props.image] - Fallback artwork, typically the season's image.
 */
export default function EpisodeCard({ episode, image }) {
  return (
    <li className={styles.episode}>
      {image && <img src={image} alt="" className={styles.thumb} />}
      <div>
        <h4 className={styles.title}>
          <span className={styles.number}>E{episode.episode}</span>
          {episode.title}
        </h4>
        <p className={styles.description}>{shortenDescription(episode.description)}</p>
      </div>
    </li>
  );
}
