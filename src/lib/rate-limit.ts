import type { NextRequest } from 'next/server'

// In-memory, per-instance rate limiter. Good enough as a speed bump for a
// marketing site; a shared store (e.g. Upstash) is the upgrade path if abuse
// ever shows up in analytics. Entries are pruned inline so the map stays
// bounded on long-lived instances.
type Entry = { count: number; resetAt: number }

const MAX_TRACKED_KEYS = 5000

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const store = new Map<string, Entry>()

  return function isRateLimited(key: string): boolean {
    const now = Date.now()

    if (store.size > MAX_TRACKED_KEYS) {
      for (const [k, v] of store) {
        if (now > v.resetAt) store.delete(k)
      }
      // Still oversized after pruning: drop oldest entries wholesale
      if (store.size > MAX_TRACKED_KEYS) store.clear()
    }

    const entry = store.get(key)
    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs })
      return false
    }
    entry.count++
    return entry.count > maxRequests
  }
}

export function clientIp(req: NextRequest): string {
  // x-real-ip is set by Vercel from the connecting socket and is not
  // client-forgeable there; x-forwarded-for is the fallback for local dev.
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}
