import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, CursorClick } from '@/components/slab'
import { ProjectDetail } from './ProjectPanels'
import { portfolioProjects, type PortfolioProject, type ProjectCat } from '@/data/projects'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Projects, as one viewport in Home's bento language: a glass panel of five
 * cards plus a stack of three smaller ones, each opening the project in a
 * near-fullscreen dialog (see ProjectPanels).
 *
 * Layout (desktop, 4 columns): wide, card, stack / card, card, wide.
 * The first five projects become cards, the last three the stack.
 */

const FILTERS: { key: ProjectCat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'school', label: 'Education' },
  { key: 'business', label: 'Business' },
  { key: 'ai', label: 'AI' },
]

const CARDS = portfolioProjects.slice(0, 5)
const STACK = portfolioProjects.slice(5)
/** Cards 1 and 5 span two columns. */
const WIDE = new Set([CARDS[0]?.id, CARDS[4]?.id])

/** Features as two chip rows scrolling against each other. */
function FeaturePreview({ p }: { p: PortfolioProject }) {
  const half = Math.ceil(p.features.length / 2)
  const rows = [p.features.slice(0, half), p.features.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((f, i) => (
              <span key={`${f}-${i}`} className="bento__chip">
                {f}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** The project's tech marks stacked horizontally. */
function Marks({ p }: { p: PortfolioProject }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. */
function ProjectModal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<PortfolioProject | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<ProjectCat | 'all'>('all')
  const keep = (p: PortfolioProject) => !phone || cat === 'all' || p.cat === cat
  const cards = CARDS.filter(keep)
  const builds = STACK.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: PortfolioProject, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">
      {builds.map((b) => (
        <button
          key={b.id}
          type="button"
          className="bento__card bento__card--btn bento__card--build"
          onClick={(e) => show(b, e.currentTarget)}
          aria-haspopup="dialog"
        >
          <span className="bento__build-plate">
            <img src={b.logos[0]} alt="" width={22} height={22} />
          </span>
          <span className="bento__build-text">
            <span className="bento__kicker">{b.status} · {b.kicker.split(' · ')[0]}</span>
            <span className="bento__build-title">{b.title}</span>
            <span className="bento__build-desc">{b.summary}</span>
          </span>
          <span className="bento__build-arrow">
            <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          Systems for schools and small businesses.
        </h1>
        <p className="pgrid__lede">Attendance, ordering, inventory, learning and accessibility projects. Open a card to see the features and the stack.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not a seventh card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {cards.map((p, i) => (
            <Fragment key={p.id}>
              <button
                type="button"
                className={`bento__card bento__card--btn${WIDE.has(p.id) ? ' bento__card--wide' : ''}`}
                data-id={p.id}
                onClick={(e) => show(p, e.currentTarget)}
                aria-haspopup="dialog"
              >
                <span className="bento__head">
                  <Marks p={p} />
                  <span className="bento__kicker">{p.status}</span>
                  <span className="bento__title">{p.title}</span>
                  <span className="bento__desc">{p.summary}</span>
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
                </span>
                <FeaturePreview p={p} />
              </button>
              {i === 1 && stack}
            </Fragment>
          ))}
          {cards.length < 2 && stack}
        </div>
      </div>

      {open && (
        <ProjectModal title={open.title} onClose={close}>
          <ProjectDetail p={open} />
        </ProjectModal>
      )}
    </section>
  )
}
