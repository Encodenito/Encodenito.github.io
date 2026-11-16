/**
 * The skills tree: shown as scrolling chips on the Home "Skills" card.
 *
 * Shape rules:
 * - The root is you. Its children are the skill categories (branches).
 * - Each category's children are the technologies (leaves).
 * - `status` is optional; skills leave it unset.
 *
 * List only technologies you can confidently explain or demonstrate.
 */

import {
  Sparkle,
  Browser,
  HardDrives,
  Database,
  Code,
  Wrench,
  PenNib,
  Robot,
  DeviceMobile,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

/** A vendor mark, masked to a single ink colour. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

/** One category whose leaves share its icon. */
const category = (id: string, name: string, what: string, Icon: Icon, skills: string[]): StackNode => ({
  id,
  name,
  what,
  Icon,
  children: skills.map((s) => ({
    id: `${id}-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: s,
    what: `${s} - ${name.toLowerCase()}.`,
    Icon,
  })),
})

export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'Web development, database systems and practical AI integration.',
  stack: 'BSIT · Carlos Hilado Memorial State University',
  children: [
    category('frontend', 'Frontend development', 'Interfaces people use every day.', Browser, ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'jQuery']),
    category('backend', 'Backend development', 'Server logic, auth and APIs.', HardDrives, ['PHP', 'Laravel', 'Python']),
    category('databases', 'Databases', 'Schema design, queries and integration.', Database, ['MySQL', 'MariaDB', 'SQL Server', 'Oracle Database', 'Microsoft Access']),
    category('languages', 'Other languages', 'Languages from coursework and side projects.', Code, ['C', 'C++', 'Java', 'Swift']),
    category('tools', 'Development tools', 'Everyday tooling.', Wrench, ['VS Code', 'GitHub', 'phpMyAdmin', 'Android Studio']),
    category('design', 'Design tools', 'Mockups and visuals.', PenNib, ['Figma', 'Canva']),
    category('ai', 'AI and automation', 'Detection models and workflow automation.', Robot, ['YOLO object detection', 'Image recognition', 'n8n', 'AI integration']),
    category('mobile', 'Mobile exploration', 'Mobile frameworks being explored.', DeviceMobile, ['Kotlin', 'Flutter', 'React Native', 'Expo']),
  ],
}
