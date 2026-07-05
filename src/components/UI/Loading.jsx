import styles from "../../styles/Loading.module.css";

/**
 * Reusable loading indicator, shown while data is being fetched.
 * Used by both the homepage (fetching the podcast list) and the show
 * detail page (fetching a single show).
 *
 * @param {{ message?: string }} props
 */
export default function Loading({ message = "Loading..." }) {
  return (
    <div className={styles.messageContainer} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
}