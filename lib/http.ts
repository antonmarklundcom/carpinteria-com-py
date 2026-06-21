// Tiny fetch helper with timeout + exponential-backoff retries, used by the
// fan-out loggers. Throws only after all attempts fail.

const RETRIES = 3;
const BASE_DELAY_MS = 400;
const TIMEOUT_MS = 5000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function postWithRetry(
  url: string,
  body: unknown,
): Promise<void> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return;
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
      if (attempt < RETRIES - 1) {
        await sleep(BASE_DELAY_MS * Math.pow(2, attempt));
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("request failed");
}
