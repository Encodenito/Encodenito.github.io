import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Code,
  GraduationCap,
  Stack,
  Lightbulb,
  Browser,
  Bug,
  Database,
  ChalkboardTeacher,
  FileText,
  SealCheck,
  Eye,
} from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { portfolioProjects } from '@/data/projects'
import { profile } from '@/data/profile'
import { useVisits } from '@/lib/visits'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. Nothing here invents a fact - the projects, skills and services
 * are the same records the views render in full.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const PROJECT_ROWS = [portfolioProjects.slice(0, 4), portfolioProjects.slice(4)]

const OFFERS = [
  { Icon: Browser, title: 'Web development', note: 'Websites and web apps' },
  { Icon: Bug, title: 'Debugging', note: 'Find and fix errors' },
  { Icon: Database, title: 'Database support', note: 'Design, SQL, integration' },
  { Icon: ChalkboardTeacher, title: 'Tutoring', note: 'Understand your own code' },
  { Icon: FileText, title: 'Document support', note: 'Formatting and research' },
] as const

const INTERESTS = [
  { title: 'Practical systems', note: 'For schools and small businesses' },
  { title: 'Accessible applications', note: 'Usable by more people' },
  { title: 'AI in useful workflows', note: 'Detection and integration' },
  { title: 'Automation', note: 'Less repetitive work' },
  { title: 'Usability', note: 'Apps people understand' },
  { title: 'Web and mobile', note: 'Exploring new platforms' },
]

/** The skills as a flat list: every leaf of the skills tree, in order. */
const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const SKILLS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const visits = useVisits()
  const half = Math.ceil(SKILLS.length / 2)
  const skillRows = [SKILLS.slice(0, half), SKILLS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects: project names on two chip rows. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Attendance, ordering, inventory, learning and accessibility systems." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {PROJECT_ROWS.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((p, i) => (
                  <span key={`${p.id}-${i}`} className="bento__chip">
                    <img src={p.logos[0]} alt="" width={15} height={15} />
                    {p.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* About: the photo, centred (--i: 1 is the unrotated middle slot). */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Fourth-year BSIT student and freelance programmer." />
        <div className="bento__media bento__fan" aria-hidden="true">
          <span className="bento__photo" style={{ ['--i' as string]: 1 }}>
            <img src={profile.avatarSrc} alt="" loading="lazy" decoding="async" />
          </span>
        </div>
      </Link>

      {/* Skills: every leaf of the skills tree, two chip rows scrolling
          against each other. */}
      <Link to="/about" className="bento__card bento__card--ai">
        <CardHead Icon={Code} title="Skills" desc="Web, databases, AI and automation." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {skillRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((n, i) => (
                  <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                    <n.Icon size={15} weight="duotone" />
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Education: the degree, on its plate. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={GraduationCap} title="Education" desc="CHMSU - Binalbagan Campus." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <img className="bento__seal" src="/chmsu-seal.webp" alt="" width={96} height={96} />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            BSIT · 4th year
          </span>
        </div>
      </Link>

      {/* Services: five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="For businesses and students." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Interests: cards drifting up a clipped column. */}
      <Link to="/about" className="bento__card bento__card--quotes">
        <CardHead Icon={Lightbulb} title="Interests" desc="Where I want to take my work next." />
        {visits && (
          <span className="bento__visits">
            <span className="bento__visits-top">
              <Eye size={14} weight="bold" />
              <i className="bento__visits-dot" />
              Live
            </span>
            <b className="bento__visits-num">{visits}</b>
            <span className="bento__visits-label">portfolio visits</span>
          </span>
        )}
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...INTERESTS, ...INTERESTS].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <Lightbulb size={14} weight="fill" />
                  <b>{c.title}</b>
                </span>
                <span className="bento__review-role">{c.note}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
