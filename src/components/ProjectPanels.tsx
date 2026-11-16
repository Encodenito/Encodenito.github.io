import type { ReactNode } from 'react'
import { ArrowUpRight } from '@/components/slab'
import type { PortfolioProject } from '@/data/projects'

/**
 * What the Projects dialogs show: one project, in a plain mac window with a
 * scrolling body.
 */

function SectionWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">{label}</span>
        </span>
      </div>
      <div className="ppanel__scroll">{children}</div>
    </div>
  )
}

const isPlanned = (p: PortfolioProject) => p.status === 'Planned' || p.status === 'Concept'

export function ProjectDetail({ p }: { p: PortfolioProject }) {
  const links = [
    { label: 'Source code', href: p.repo },
    { label: 'Live demo', href: p.demo },
  ].filter((l) => l.href && l.href !== '#')

  return (
    <SectionWindow label={p.title}>
      <div className="aig">
        <header className="aig__head">
          <div className="aig__head-text">
            <span className="aig__eyebrow">{p.kicker}</span>
            <h3 className="aig__title">{p.title}</h3>
            <p className="pdetail__summary">{p.summary}</p>
          </div>
          <div className="aig__harness" aria-label="Built with">
            <span className="aig__harness-label">Built with</span>
            {p.tech.map((t) => (
              <span key={t} className="aig__harness-item pdetail__tech">
                {t}
              </span>
            ))}
          </div>
        </header>

        <section className="aig__group" aria-label="Features">
          <div className="aig__group-head">
            <h3 className="aig__group-title">{isPlanned(p) ? 'Planned features' : 'Key features'}</h3>
            <span className="aig__status" data-status={p.status}>
              {p.status}
            </span>
          </div>
          <ul className="aig__cards" role="list">
            {p.features.map((f) => (
              <li key={f} className="aig__card">
                <p className="aig__what">{f}</p>
              </li>
            ))}
          </ul>
          {p.note && <p className="aig__group-what">{p.note}</p>}
        </section>

        <section className="aig__group" aria-label="Links">
          {links.length > 0 ? (
            <div className="pdetail__links">
              {links.map((l) => (
                <a key={l.label} className="aig__harness-item pdetail__link" href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : (
            <p className="aig__group-what">Screenshots, source code and a live demo are coming soon.</p>
          )}
        </section>
      </div>
    </SectionWindow>
  )
}
