import { DownloadSimple, MapPin, GraduationCap } from '@/components/slab'
import { profile } from '@/data/profile'
import GitHubGraph from './GitHubGraph'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the live GitHub contribution graph as the proof
 * of work, then the education / location / CV plate.
 */

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          BSIT student, web developer and freelance programmer.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I build systems that solve familiar problems.
            <span> Attendance, orders, inventory and information.</span>
          </p>

          <p className="agrid__note">
            <strong>Fourth-year BSIT student</strong> at Carlos Hilado Memorial State University -
            Binalbagan Campus, also taking freelance programming, debugging and tutoring work.
          </p>

          <GitHubGraph />

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <GraduationCap size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">BS Information Technology</span>
                <span className="agrid__cell-meta">CHMSU Binalbagan · 4th year</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">Philippines · GMT+8</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href={profile.cvSrc} download>
              <span className="agrid__cell-mark">
                <DownloadSimple size={16} weight="bold" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Download CV</span>
                <span className="agrid__cell-meta">PDF · education, skills and projects</span>
              </span>
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.avatarSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={800}
            height={1000}
          />
        </div>
      </div>
    </section>
  )
}
