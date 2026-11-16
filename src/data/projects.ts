/**
 * The Projects page: one card per project, each opening a detail window.
 *
 * Status is what the project actually is today. Projects 1-4 still say
 * "Status TBC" - change each to Completed, In development or Prototype once
 * confirmed. `repo` / `demo` stay '#' until there is a real link; screenshots
 * go in public/projects/ and are referenced through `shots`.
 */

export type ProjectStatus = 'Completed' | 'In development' | 'Prototype' | 'Planned' | 'Concept' | 'Status TBC'
export type ProjectCat = 'school' | 'business' | 'ai'

export type PortfolioProject = {
  id: string
  title: string
  /** Small kicker above the title. */
  kicker: string
  summary: string
  status: ProjectStatus
  cat: ProjectCat
  /** Shown as "Key features" or, for Planned / Concept, "Planned features". */
  features: string[]
  tech: string[]
  /** Brand marks for the card head (public/icons). */
  logos: string[]
  note?: string
  repo: string
  demo: string
  shots: string[]
}

const I = {
  php: '/icons/tech/php.svg',
  laravel: '/icons/tech/laravel.svg',
  mysql: '/icons/tech/mysql.svg',
  js: '/icons/tech/javascript.svg',
  python: '/icons/tech/python.svg',
  react: '/icons/ai/react.svg',
  tailwind: '/icons/ai/tailwindcss.svg',
  jquery: '/icons/tech/jquery.svg',
  n8n: '/icons/ai/n8n.svg',
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'qr-attendance',
    title: 'QR-Based Attendance Monitoring System',
    kicker: 'Education · Web system',
    summary: 'A teacher-managed attendance system that uses student QR codes to make attendance recording faster and easier to organize.',
    status: 'Status TBC',
    cat: 'school',
    features: [
      'Teacher registration and login',
      'Student registration and profile management',
      'Unique student QR code generation',
      'QR scanning through a camera or uploaded image',
      'Duplicate attendance detection for the same day',
      'Attendance records with dates, times and status',
      'Teacher profile management',
    ],
    tech: ['PHP', 'MySQL / MariaDB', 'JavaScript', 'HTML', 'html5-qrcode'],
    logos: [I.php, I.mysql, I.js],
    repo: '#',
    demo: '#',
    shots: [],
  },
  {
    id: 'ecoscan',
    title: 'Smart EcoScan',
    kicker: 'AI · Education',
    summary: 'Recyclables detector and map that helps elementary students identify recyclable materials and find nearby trash bins in Barangay Parada.',
    status: 'Status TBC',
    cat: 'ai',
    features: [
      'Image-based recyclable detection using YOLOv8',
      'Classifies plastic bottles, plastic wrappers, paper, cans and glass bottles',
      'Educational feedback about detected materials',
      'Disposal instructions and recyclability information',
      'Location mapping and nearby bin identification',
    ],
    tech: ['Laravel', 'PHP', 'Python', 'YOLOv8', 'MySQL', 'jQuery', 'Tailwind CSS'],
    logos: [I.laravel, I.python, I.tailwind],
    repo: '#',
    demo: '#',
    shots: [],
  },
  {
    id: 'wild-sugar',
    title: 'Wild Sugar',
    kicker: 'Business · Ordering & inventory',
    summary: 'Milk tea ordering and inventory system: customers customize and order drinks, admins manage products, stock and sales.',
    status: 'Status TBC',
    cat: 'business',
    features: [
      'Drink customization by flavor, size, sugar level and add-ons',
      'Shopping cart and peso-based totals',
      'Cash and GCash payment options',
      'Order status tracking and reordering',
      'Product and inventory management',
      'Low-stock alerts',
      'Sales reports and forecasting',
      'Receipt generation',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    logos: [I.php, I.mysql, I.js],
    repo: '#',
    demo: '#',
    shots: [],
  },
  {
    id: 'restaurant',
    title: 'Restaurant Reservation & Food Ordering',
    kicker: 'Business · Reservations',
    summary: 'One platform for table and kubo reservations, food orders, payments and admin monitoring.',
    status: 'Status TBC',
    cat: 'business',
    features: [
      'Table or kubo reservations',
      'Reservation schedules and guest details',
      'Dine-in and takeout ordering',
      'Downpayment and payment tracking',
      'Order preparation and serving status',
      'Menu management',
      'Customer booking and order history',
      'Sales and reservation reports',
    ],
    tech: ['PHP', 'MySQL'],
    logos: [I.php, I.mysql],
    note: 'Planned integrations: PayMongo / GCash payments and customer reminders.',
    repo: '#',
    demo: '#',
    shots: [],
  },
  {
    id: 'smartcampus',
    title: 'SmartCampus LMS',
    kicker: 'Education · Learning management',
    summary: 'A learning management system concept with course materials, programming activities with automated assessment, attendance and grading.',
    status: 'Planned',
    cat: 'school',
    features: [
      'Student, instructor and MIS roles',
      'Learning modules and course materials',
      'Programming activity submission',
      'Automated programming assessment',
      'Deadline tracking',
      'Attendance monitoring',
      'Grade management',
    ],
    tech: ['Python', 'Java', 'HTML', 'CSS', 'JavaScript', 'PHP'],
    logos: [I.php, I.python, I.js],
    note: 'Programming coverage for automated assessment: Python, Java, HTML, CSS, JavaScript and PHP.',
    repo: '#',
    demo: '#',
    shots: [],
  },
  {
    id: 'accesslens',
    title: 'AccessLens',
    kicker: 'AI · Accessibility',
    summary: 'An AI accessibility assistant concept: visual recognition and automation to help people who are blind or have low vision.',
    status: 'Concept',
    cat: 'ai',
    features: [
      'Object detection for everyday surroundings',
      'Python-based AI services',
      'Web or mobile interface',
      'n8n automation',
    ],
    tech: ['Python', 'Object detection', 'n8n'],
    logos: [I.python, I.n8n],
    repo: '#',
    demo: '#',
    shots: [],
  },
  {
    id: 'smart-ordering',
    title: 'QR Smart Ordering',
    kicker: 'Business · Kiosk ordering',
    summary: 'Customers scan a QR code at their table and order through a kiosk-style interface.',
    status: 'Planned',
    cat: 'business',
    features: [
      'Table-specific QR code access',
      'Digital menu browsing',
      'Item selection and cart',
      'Table-linked order submission',
      'Backend order management',
    ],
    tech: ['React', 'Laravel'],
    logos: [I.react, I.laravel],
    repo: '#',
    demo: '#',
    shots: [],
  },
  {
    id: 'jm-aquatics',
    title: 'JM Aquatics',
    kicker: 'Business · E-commerce',
    summary: 'An aquarium and fish supplies platform with tools that help customers plan a suitable setup.',
    status: 'Planned',
    cat: 'business',
    features: [
      'Fish species compatibility filtering',
      'Tank size and filter calculators',
      'Product and stock management',
      'Sales analytics and forecasting',
    ],
    tech: ['Tailwind CSS', 'jQuery'],
    logos: [I.tailwind, I.jquery],
    repo: '#',
    demo: '#',
    shots: [],
  },
]
