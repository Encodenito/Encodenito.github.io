/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline.
 *
 * Values in [square brackets] are still placeholders - replace them once
 * confirmed (location, CV).
 *
 * Page-specific copy (projects, services, FAQs) lives in the other files in
 * src/data/ and at the top of each view component.
 */

import { GraduationCap, FolderOpen, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Square transparent cut-out for the desktop sidebar (rail). */
  railAvatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  /** GitHub username: the About page contribution graph and the GitHub link. */
  github: string
  location: string
  /** Public path of the CV PDF (drop the file in public/). */
  cvSrc: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Ralph Cedric Gelongo',
  firstName: 'Ralph',
  handle: '@Encodenito',
  role: 'BSIT Student · Web Developer · Freelance Programmer',
  avatarSrc: '/avatar.webp',
  railAvatarSrc: '/avatar-rail.webp',
  verifiedLabel: 'BSIT student, Carlos Hilado Memorial State University',
  email: 'ralphcedricgelongo4@gmail.com',
  github: 'Encodenito',
  location: '[City, Province]',
  cvSrc: '/cv.pdf',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: '4th yr', label: 'BSIT student', Icon: GraduationCap },
    { value: '8', label: 'Projects', Icon: FolderOpen },
    { value: 'GMT+8', label: 'Philippines', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'I build practical', line2: 'web apps.' },
  hero: {
    body: 'Fourth-year BSIT student building web apps, databases and AI-assisted tools for schools and small businesses.',
    portraitSrc: '/avatar.webp',
    portraitAlt: 'Portrait of Ralph Cedric Gelongo',
  },
  socials: [
    { label: 'GitHub profile', href: 'https://github.com/Encodenito', iconPath: '/icons/ai/github.svg' },
    { label: 'Facebook profile', href: 'https://www.facebook.com/ralph.cedric.m.gelongo', iconPath: '/icons/facebook.svg' },
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/ralph-cedric-gelongo-5ab007383', iconPath: '/icons/linkedin.svg' },
  ],
}
