import { useEffect, useRef, useState } from 'react'
import { GithubLogo, ArrowUpRight } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * Live GitHub contribution graph for the last year, drawn in the site's own
 * palette. Data comes from github-contributions-api.jogruber.de - a free,
 * keyless proxy of the public profile calendar. Private contributions only
 * appear if "Include private contributions on my profile" is on in GitHub.
 *
 * Until the data arrives an empty grid holds the space, so nothing jumps;
 * if the request fails the block disappears.
 */

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
type Calendar = { total: number; days: Day[] }

const API = 'https://github-contributions-api.jogruber.de/v4'

let cache: Promise<Calendar | null> | null = null
function fetchCalendar(user: string): Promise<Calendar | null> {
  cache ??= fetch(`${API}/${encodeURIComponent(user)}?y=last`)
    .then((r) => (r.ok ? r.json() : null))
    .then((j: { total?: { lastYear?: number }; contributions?: Day[] } | null) =>
      j?.contributions ? { total: j.total?.lastYear ?? 0, days: j.contributions } : null,
    )
    .catch(() => null)
  return cache
}

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const label = (d: Day) =>
  `${d.count === 0 ? 'No' : d.count} contribution${d.count === 1 ? '' : 's'} on ${fmt.format(new Date(`${d.date}T00:00:00`))}`

/** Leading blanks so the first day lands on its weekday row (Sunday on top). */
function toCells(days: Day[]): (Day | null)[] {
  if (!days.length) return Array<null>(53 * 7).fill(null)
  const pad = new Date(`${days[0].date}T00:00:00`).getDay()
  return [...Array<null>(pad).fill(null), ...days]
}

export default function GitHubGraph() {
  const user = profile.github
  const [cal, setCal] = useState<Calendar | null | 'loading'>('loading')
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let live = true
    fetchCalendar(user).then((c) => live && setCal(c))
    return () => {
      live = false
    }
  }, [user])

  // Narrow screens scroll the grid sideways; start on the most recent weeks.
  useEffect(() => {
    const g = gridRef.current
    if (g) g.scrollLeft = g.scrollWidth
  }, [cal])

  if (cal === null) return null
  const loading = cal === 'loading'
  const cells = toCells(loading ? [] : cal.days)

  return (
    <section className="ghg" aria-label="GitHub activity">
      <header className="ghg__head">
        <span className="ghg__title">
          <GithubLogo size={16} weight="fill" aria-hidden="true" />
          {loading ? 'GitHub activity' : `${cal.total.toLocaleString('en-US')} contributions in the last year`}
        </span>
        <a className="ghg__link" href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer">
          @{user}
          <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
        </a>
      </header>
      <div ref={gridRef} className="ghg__grid" role="img" aria-label={loading ? 'Loading GitHub activity' : `${cal.total} GitHub contributions in the last year`}>
        {cells.map((d, i) =>
          d ? <i key={d.date} data-level={d.level} title={label(d)} /> : <i key={`pad-${i}`} data-level="pad" />,
        )}
      </div>
      <div className="ghg__legend" aria-hidden="true">
        Less
        {[0, 1, 2, 3, 4].map((l) => (
          <i key={l} data-level={l} />
        ))}
        More
      </div>
    </section>
  )
}
