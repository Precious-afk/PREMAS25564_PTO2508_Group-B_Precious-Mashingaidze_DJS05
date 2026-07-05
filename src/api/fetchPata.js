/**
 * @file API helpers for fetching podcast data — the full show list and
 * a single show's full details. Combined into one file since both
 * hit the same base API and follow the same setter-based pattern.
 */

/**
 * @function fetchPodcasts
 * Asynchronously fetches podcast preview data from the remote API and
 * updates state accordingly. Handles loading, error, and successful
 * data response via provided state setters.
 *
 * @param {Function} setPodcasts - State setter function to update the podcasts array.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 **/
export async function fetchPodcasts(setPodcasts, setError, setLoading) {
  try {
    const res = await fetch("https://podcast-api.netlify.app/shows");
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcasts(data);
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

/**
 * @function fetchShow
 * Asynchronously fetches a single show's full details (including its
 * embedded seasons and episodes) from the remote API, and updates
 * state accordingly.
 *
 * @param {string|number} id - The show's ID (from the route parameter).
 * @param {Function} setShow - State setter function to update the show object.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 **/
export async function fetchShow(id, setShow, setError, setLoading) {
  try {
    setLoading(true);
    setError(null);
    const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setShow(data);
  } catch (err) {
    console.error(`Failed to fetch show ${id}:`, err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
