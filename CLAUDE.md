# CLAUDE.md

Personal portfolio site for Asim Ahmed, served as static files by GitHub Pages at https://asim-aa.github.io. There is no build step, package manager or test suite. Edit the files and push.

## Layout

- `index.html`, `projects.html`, `about.html`, `learning.html`, `resume.html`, `contact.html`, `404.html`: top-level pages.
- `project-*.html`: one page per project (linked from `projects.html`).
- `styles.css`: shared styles. `resume.css`: styles for `resume.html` only.
- `app.js`: shared behavior (nav toggle etc.), loaded by every page except the résumé. `hero.js`: home-page hero only.
- `shots/`: project screenshots and `og-card.png` (social preview). `thumbs/`: Learning Lab video thumbnails, named by YouTube ID.
- `Asim_Ahmed_Resume.pdf`: the LaTeX résumé shown on `resume.html`.
- `sitemap.xml`, `robots.txt`, `.well-known/security.txt`, favicons, `.nojekyll`.

## Conventions

- Every page ships a strict Content-Security-Policy meta tag (`default-src 'none'`, scripts and styles from `'self'` only). Do not add inline `<script>`/`<style>`, inline event handlers, or third-party scripts, fonts or CDNs. Put code in `app.js` / `styles.css` instead.
- Keep the shared nav identical across pages, and mark the current page with `class="active"`.
- When adding a page, also add it to `sitemap.xml` and link it from the nav or `projects.html`.
- Use relative links and keep file names lowercase with hyphens.
- Compress images before adding them to `shots/` or `thumbs/`.

## Preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Git

Develop on the branch you were given and push there. Open a pull request only when asked.
