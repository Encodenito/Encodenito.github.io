import type { CSSProperties } from 'react'
import { ChatsCircle, Code, RocketLaunch, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Two bands, top to bottom: the three-step way of working (on a dark plate so
 * it is the first thing the eye lands on), then the six services as cards
 * that carry the marks of what each one is built with.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Discuss',
    body: 'We talk through what you need, who will use it and what already exists.',
    Icon: ChatsCircle,
    chips: ['Requirements', 'Scope', 'Timeline'],
  },
  {
    index: '02',
    label: 'Build',
    body: 'I build or fix it in small steps and show progress along the way.',
    Icon: Code,
    chips: ['Code', 'Database', 'Testing'],
  },
  {
    index: '03',
    label: 'Deliver',
    body: 'You get working software and an explanation you can follow.',
    Icon: RocketLaunch,
    chips: ['Handover', 'Walkthrough', 'Support'],
  },
]

/* ---------- The services ---------- */

const PHP = '/icons/tech/php.svg'
const LARAVEL = '/icons/tech/laravel.svg'
const REACT = '/icons/ai/react.svg'
const TAILWIND = '/icons/ai/tailwindcss.svg'
const JS = '/icons/tech/javascript.svg'
const PYTHON = '/icons/tech/python.svg'
const MYSQL = '/icons/tech/mysql.svg'
const MARIADB = '/icons/tech/mariadb.svg'
const GITHUB = '/icons/ai/github.svg'
const VSCODE = '/icons/vscode.svg'
const FIGMA = '/icons/tech/figma.svg'
const CANVA = '/icons/tech/canva.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Web development',
    description: 'Responsive websites and web applications for small businesses, student organizations and individual clients.',
    chip: 'Websites · Web apps',
    logos: [PHP, LARAVEL, REACT],
    bullets: ['Responsive on phone and desktop', 'Built with PHP, Laravel or React', 'Ready for your own content'],
  },
  {
    index: '02',
    title: 'Programming and debugging',
    description: 'Help finding errors, improving existing code and understanding how an application behaves.',
    chip: 'Fixes · Code review',
    logos: [JS, PHP, PYTHON],
    bullets: ['Find the cause, not only the symptom', 'Cleaner, easier-to-read code', 'Explanations you can follow'],
  },
  {
    index: '03',
    title: 'Database design and support',
    description: 'Help with database structures, relationships, SQL queries and database integration.',
    chip: 'Schema · SQL',
    logos: [MYSQL, MARIADB],
    bullets: ['Tables and relationships', 'SQL queries and fixes', 'Connecting the app to the database'],
  },
  {
    index: '04',
    title: 'System features and integration',
    description: 'Authentication, dashboards, QR codes, reporting, inventory, reservations and ordering workflows.',
    chip: 'Features · Workflows',
    logos: [LARAVEL, MYSQL, TAILWIND],
    bullets: ['Login and user roles', 'Dashboards and reports', 'QR codes, inventory and ordering'],
  },
  {
    index: '05',
    title: 'Programming tutoring',
    description: 'Guided explanations and practical support that help learners understand their code and build their own solutions.',
    chip: 'One-on-one',
    logos: [VSCODE, GITHUB, PYTHON],
    bullets: ['Step-by-step explanations', 'Practice on your own code', 'Learn to solve it yourself'],
  },
  {
    index: '06',
    title: 'Research and document support',
    description: 'Document formatting, technical documentation, research guidance and presentation preparation.',
    chip: 'Docs · Presentations',
    logos: [FIGMA, CANVA],
    bullets: ['Formatting and structure', 'Technical documentation', 'Presentation preparation'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Websites, fixes and programming help.
        </h1>
        <p className="pgrid__lede">
          Web development, debugging, database support, tutoring and document support for small businesses, organizations and students.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              Discuss. Build. Deliver.
              <br />
              <span>Three steps, no surprises.</span>
            </h2>
            <p className="sgrid__method-sub">
              You always know what is being built and why.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Six cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I can help with.</h2>
            <p className="sgrid__offers-sub">Not sure which one fits? Send a message and describe the problem.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / {String(SERVICES.length).padStart(2, '0')}</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
