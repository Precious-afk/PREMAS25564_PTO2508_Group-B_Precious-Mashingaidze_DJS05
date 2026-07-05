import styles from "../../styles/Error.module.css";

/**
 * Reusable, user-friendly error display, shown whenever a fetch fails.
 * Named `ErrorDisplay` internally (rather than `Error`) to avoid
 * shadowing the built-in JavaScript `Error` class, even though the
 * file itself is named Error.jsx to match the project's UI folder.
 *
 * @param {{ message?: string }} props
 */
export default function ErrorDisplay({ message = "Something went wrong." }) {
  return (
    <div className={styles.message} role="alert">
      <div className={styles.error}>{message}</div>
    </div>
  );
}