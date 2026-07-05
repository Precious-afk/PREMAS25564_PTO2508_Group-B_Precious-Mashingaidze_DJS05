import { useState } from "react";
import EpisodeCard from "./EpisodeCard";
import styles from "../../styles/SeasonNavigation.module.css";

/**
 * Expandable navigation UI for browsing a show's seasons and episodes.
 * Only one season's episode list is expanded at a time, which keeps
 * shows with many seasons/episodes scannable instead of dumping every
 * episode on the page at once.
 *
 * @param {{ seasons: Array<Object> }} props
 *   seasons - Array of SEASON objects, each with `season`, `title`,
 *     `image`, and an embedded `episodes` array (per the show endpoint).
 */
export default function SeasonNavigation({ seasons = [] }) {
  const [openSeason, setOpenSeason] = useState(seasons[0]?.season ?? null);

  if (seasons.length === 0) {
    return <p className={styles.empty}>No season information is available for this show.</p>;
  }

  /**
   * Toggle a season open/closed. Clicking the open season collapses
   * it; clicking any other season opens it and closes the previous
   * one, so at most one episode list is expanded at a time.
   *
   * @param {number} seasonNumber
   */
  function toggleSeason(seasonNumber) {
    setOpenSeason((current) => (current === seasonNumber ? null : seasonNumber));
  }

  return (
    <div className={styles.list}>
      {seasons.map((season) => {
        const isOpen = openSeason === season.season;
        const episodeCount = season.episodes?.length ?? 0;

        return (
          <div className={styles.item} key={season.season}>
            <button
              type="button"
              className={styles.header}
              onClick={() => toggleSeason(season.season)}
              aria-expanded={isOpen}
            >
              <span className={styles.title}>
                Season {season.season}: {season.title}
              </span>
              <span className={styles.count}>
                {episodeCount} episode{episodeCount === 1 ? "" : "s"}
              </span>
              <span className={`${styles.chevron} ${isOpen ? styles.open : ""}`}>▾</span>
            </button>

            {isOpen && (
              <ul className={styles.episodeList}>
                {season.episodes.map((episode) => (
                  <EpisodeCard key={episode.episode} episode={episode} image={season.image} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
