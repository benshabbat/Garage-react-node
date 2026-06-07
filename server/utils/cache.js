/**
 * Simple in-process TTL cache.
 *
 * ⚠️  SINGLE-PROCESS ONLY — In a multi-process deployment (PM2 cluster,
 * serverless with cold starts) each worker maintains its own independent
 * copy. Upgrade to a shared cache (Redis via `ioredis`, or Upstash for
 * serverless) when horizontal scaling is needed.
 *
 * Usage:
 *   const cache = new InMemoryCache(ttlMs);
 *   const hit = cache.get(key);          // null on miss
 *   cache.set(key, value);
 *   cache.delete(key);
 */
export class InMemoryCache {
  #store = new Map();
  #ttlMs;

  constructor(ttlMs) {
    this.#ttlMs = ttlMs;
  }

  get(key) {
    const entry = this.#store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.#store.delete(key);
      return null;
    }
    return entry.value;
  }

  set(key, value) {
    this.#store.set(key, { value, expiresAt: Date.now() + this.#ttlMs });
  }

  delete(key) {
    this.#store.delete(key);
  }
}
