# mysylla — Personal Website

This is my personal website: a small, static site where I collect my work, experiments, photos, and writing. It’s built with plain HTML, CSS, and a bit of JavaScript for theming and dynamic content.
its js code for theme toggeling is really sophosticated 
## Features

- Multiple pages: home, about, work, contact, gallery, FAQ, and blog.
- Theme toggle that cycles through several color palettes and remembers the last one in `localStorage`.
- “Latest work” section automatically populated from a JSON file.
- Simple blog hub rendered from a small in‑code list of posts.
- Photo gallery page with a minimal, quiet layout.

## Tech stack

- HTML5 templates for each page.
- CSS (single main stylesheet + gallery stylesheet).
- Vanilla JavaScript (`main.js`) for:
  - theme toggling via CSS variables and `data-theme` on `<html>`;
  - 6 themes-handpicked :) I love em soooo much
  - rendering the work table from `data/work.json`;
  - rendering a list of recent blog posts on the blog hub.
- Hosted as a static site (for example on Netlify or similar).

## Structure

The project is organised roughly as:

- `index.html` – home page (intro, latest work, services).
- `about.html` – bio, background, and a portrait.
- `work.html` – full list of selected work (filled from `data/work.json`).
- `gallery.html` – “Through My Eyes” photography page.
- `contact.html`, `faq.html`, `blog.html` – contact, Q&A, and blog hub.
- `styles.css` – global styles (typography, layout, colors, buttons).
- `gallery/styles/gallery.css` – extra styling for the gallery layout.
- `main.js` – theme toggle, work table rendering, blog list rendering.
- `data/work.json` – work items rendered into the tables.
- `assets/` – icons, photos, gallery images, Ko‑fi button assets.



