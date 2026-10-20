# Maheboob Khan — Portfolio

React 18 + Vite 5 + Framer Motion. Dark/light theme, bento project grid, per-project case-study pages with test logins.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/  (deploy to Vercel / Netlify; SPA rewrites already configured)
```

## Where things live
| What | File |
|---|---|
| Name, contact, stats, experience, personal projects | `src/data/profile.js` |
| Every project: overview, how it works, features, tech, highlights, **test credentials** | `src/data/projects.js` |
| Admin-suite module cards (Netcore, Kumo MTA, Caller IQ, …) and their links | `src/data/admin.js` |
| Tech stack groups + marquee | `src/data/stack.js` |
| Design tokens (colours, fonts) | top of `src/styles.css` |

## Screenshots & documents
Drop images into `public/screens/<project-slug>/<feature-id>.png` (`.jpg` / `.webp` also work, up to 3 per feature:
`<id>.png`, `<id>-2.png`, `<id>-3.png`, plus an optional `cover.png`). `public/screens/README.md` lists every expected file name.
Optional PDF write-ups: `public/docs/<project-slug>.pdf`. Anything missing is hidden on the live site.

## Résumé
`resume/Maheboob-Khan-Resume.tex` → paste into Overleaf. `resume/resume.html` is the same content; the portfolio serves
`public/Maheboob-Khan-Resume.pdf` (printed from the HTML with Chrome). Replace it with your Overleaf PDF if you prefer.
Set your portfolio URL in the `.tex` header (`YOUR-PORTFOLIO-URL`).
