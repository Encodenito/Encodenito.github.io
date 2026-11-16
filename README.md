# Ralph Cedric Gelongo - Portfolio

Personal portfolio of Ralph Cedric M. Gelongo, BSIT student, web developer and freelance programmer.

Stack: Vite 6, React 19, TypeScript, plain CSS custom properties, Three.js, GSAP, Lenis, React Router 7, Phosphor icons, Poppins.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run lint       # ESLint with the TypeScript parser and the React hooks rules
```

## Where the content lives

| What | Where |
|---|---|
| Name, handle, photo, email, socials, Home headline, phone stats, CV path | `src/data/profile.ts` |
| Projects (cards, status, features, tech, links) | `src/data/projects.ts` |
| Skills (Home "Skills" chips) | `src/data/ai-stack.ts` |
| FAQs | `src/data/faqs.ts` |
| Services | `src/components/ServicesGrid.tsx` |
| About page | `src/components/AboutGrid.tsx` |
| Home cards | `src/components/HomeBento.tsx` (desktop), `src/components/HomeMobile.tsx` (phone) |
| Tools marquee | `src/components/ToolsMarquee.tsx` (logos in `public/icons/`) |
| Photo / CV | `public/avatar.webp`, `public/cv.pdf` |
| Visit counter | `src/lib/visits.ts` |
| Contact form | `src/lib/contact.ts` (opens the visitor's email app; set `VITE_CONTACT_ENDPOINT` in `.env.production` to post to a form backend - see `.env.example`) |
| SEO, favicon | `index.html`, `public/favicon.svg` |
| Colors | `src/styles/tokens.css` |

Values in `[square brackets]` are still placeholders.

## Notes

- The background shader measures the visitor's frame rate and steps down on slow machines (`src/lib/perf.ts`). Keep any large `backdrop-filter` blur off the layers above it.
- From 1100px down, the site switches to the phone layout (`src/styles/mobile-app.css`, `src/styles/mobile-pass.css`). Everything respects `prefers-reduced-motion` and the site's own Reduce motion switch.
- Anything new added above the fold on Home must join the intro hold-back list in `src/styles/boot.css`, or it shows through the intro animation.

## Credits

- Built on [portfolio-template](https://github.com/brewed-ops/portfolio-template) by BrewedOps.
- Contour background technique inspired by the landonorris.com site by OFF+BRAND. The simplex noise is Ashima Arts / Ian McEwan (MIT).
- Icons: [Phosphor](https://phosphoricons.com) (MIT). Tech logos from [Simple Icons](https://simpleicons.org) (CC0); the marks are trademarks of their owners.
- Font: Poppins (SIL Open Font License).

## License

[PolyForm Noncommercial 1.0.0](LICENSE), with the template's additional permission to use it for your own portfolio, including one that promotes your own freelance services. See `LICENSE` for the full terms and the required notice.
