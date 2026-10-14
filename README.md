# Glamouratti website (React + Vite)

A bilingual (English / Español) site for Glamouratti holiday decorating, with three pages:

| Page | URL | File |
|---|---|---|
| Home: banner, "Start your questionnaire" button, client reviews | `/` | `src/pages/HomePage.jsx` |
| Our Work: photo gallery of past projects | `/work` | `src/pages/WorkPage.jsx` |
| Holiday Questionnaire: the 10-section client form | `/questionnaire` | `src/pages/QuestionnairePage.jsx` |

Pages are wired up in `src/App.jsx` with React Router.

## Run it in VS Code

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). Edits reload instantly.

## Build for hosting

```bash
npm run build
```

This creates a `dist/` folder. Upload it to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). On Netlify or Vercel, connect the repo and use build command `npm run build` with output folder `dist`.

Direct links like `/work` work on every host: `public/_redirects` covers Netlify and Cloudflare, `vercel.json` covers Vercel, and the build copies `index.html` to `404.html` for GitHub Pages.

## Where things live

| To change… | Edit |
|---|---|
| Gallery photos | add the image to `public/gallery/`, then a line in `src/data/gallery.js` |
| Client reviews | `src/data/reviews.js` (real reviews only) |
| Questionnaire questions and choices | `src/data/questions.js` |
| Any button, heading or message text | `src/i18n/strings.js` (both `en` and `es`) |
| Colors and fonts | the `:root` block at the top of `src/styles.css` |
| Where submissions go | `.env.development` (testing) and `.env.production` (live), see below |

Components are in `src/components/`. `Header`, `Hero`, `Gallery`, `Reviews` and `Questionnaire` are the building blocks the pages use. `Question` draws a single question of any type.

Language: `useLang()` (from `src/i18n/LanguageContext.jsx`) gives any component `lang`, `setLang` and `t`, the strings for the current language. The site starts in Spanish for visitors whose browser is set to Spanish and remembers each visitor's choice.

## Where submissions go

Questionnaires and reviews are emailed through [FormSubmit](https://formsubmit.co). No account or backend is needed.

| Command | Uses | Sends to |
|---|---|---|
| `npm run dev` (testing) | `.env.development` | your email, with **[TEST]** in the subject |
| `npm run build` (live site) | `.env.production` | the business owner's email |

During `npm run dev`, a yellow bar at the top of every page shows where submissions are going. It never appears on the live site.

**Going live:** put the owner's email in `.env.production`:

```
VITE_SUBMIT_EMAIL=owner@example.com
```

The build stops with an error until this is set, so the live form can't be published without an inbox.

**First submission to any address:** FormSubmit emails that address an "Activate Form" link, and nothing is delivered until it's clicked. Do one test submission in each mode: you activate yours, and the owner activates hers. In test mode, the page shows FormSubmit's reply if a send is refused.

**Optional, hide the address:** after activating, FormSubmit sends a random-string link. Use it instead of the email so the address isn't visible in the site's code:

```
VITE_SUBMIT_ENDPOINT=https://formsubmit.co/ajax/your-random-string
```

(`VITE_SUBMIT_ENDPOINT` also accepts a Formspree URL if you switch services later.)

Each email has:
- Subject: "Holiday questionnaire – {client name}" or "New website review – 5★ – {name}"
- Reply-To: the client's email (when they gave one), so the owner can just hit Reply
- A table with Name, Phone, Email and every answer, labeled in English, plus the language the client used

To point dev or build somewhere else on your own machine without changing the shared files, use `.env.development.local` or `.env.production.local`.
