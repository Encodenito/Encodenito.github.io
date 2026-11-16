import { useEffect, useState } from 'react'

/**
 * Portfolio visit counter, backed by Abacus (https://abacus.jasoncameron.dev):
 * a free counter API, no account and no key.
 *
 * - One visit per browser session: the first page load "hits" the counter,
 *   later loads in the same tab session only read it.
 * - On localhost it only reads, so local testing never inflates the number.
 * - If the service is down the count is simply not shown.
 *
 * ponytail: a public third-party counter anyone could bump by calling the URL;
 * move to GoatCounter or a Cloudflare Worker + KV if it ever needs to be exact.
 */

const API = 'https://abacus.jasoncameron.dev'
const COUNTER = 'pf-r7c9g2/visits'
const SESSION_FLAG = 'visit-counted'

const isLocal = () => ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)

function alreadyCounted(): boolean {
  try {
    return sessionStorage.getItem(SESSION_FLAG) === '1'
  } catch {
    return true // storage blocked: read only, never double count
  }
}

let total: Promise<number | null> | null = null

function fetchTotal(): Promise<number | null> {
  const op = isLocal() || alreadyCounted() ? 'get' : 'hit'
  total ??= fetch(`${API}/${op}/${COUNTER}`)
    .then((r) => (r.status === 404 ? { value: 0 } : r.ok ? r.json() : null))
    .then((j: { value?: unknown } | null) => {
      if (typeof j?.value !== 'number') return null
      if (op === 'hit') {
        try {
          sessionStorage.setItem(SESSION_FLAG, '1')
        } catch {
          /* ignore */
        }
      }
      return j.value
    })
    .catch(() => null)
  return total
}

/** Total portfolio visits, formatted ("1,234"), or null while loading / on error. */
export function useVisits(): string | null {
  const [count, setCount] = useState<string | null>(null)
  useEffect(() => {
    let live = true
    fetchTotal().then((n) => live && n !== null && setCount(n.toLocaleString('en-US')))
    return () => {
      live = false
    }
  }, [])
  return count
}
