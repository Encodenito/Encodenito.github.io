export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I develop websites and web applications, fix programming errors, design databases, and provide coding tutorials and technical support.',
  },
  {
    q: 'What technologies do you use?',
    a: 'I work with PHP, Laravel, React, JavaScript, HTML, CSS, Tailwind CSS, Python, and MySQL.',
  },
  {
    q: 'Can you help me understand my own code?',
    a: 'Yes. I can explain your code step by step, help you find errors, and guide you through improvements.',
  },
  {
    q: 'How much do you charge?',
    a: 'Rates depend on the scope, complexity, and deadline. Send a short description of the work, and I will provide a quote.',
  },
  {
    q: 'What happens after I write?',
    a: 'I will review your request, clarify the requirements, and discuss the price and timeline with you before starting.',
  },
]
