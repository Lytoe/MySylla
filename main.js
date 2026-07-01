// 1. Theme Toggle (Multi-color randomizer restored)
const btn = document.getElementById('theme-toggle');
const root = document.documentElement;
const themes = ["light", "dark", "blue", "green", "purple", "red", "orange", "teal", "gray"];

const saved = localStorage.getItem('theme');
if (saved && themes.includes(saved)) {
  root.setAttribute('data-theme', saved);
}

if (btn) {
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || "light";
    let next;
    do {
      next = themes[Math.floor(Math.random() * themes.length)];
    } while (next === current);

    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.setAttribute('aria-pressed', "true");
  });
}

// 2. Utility Functions
const escapeHtml = (s) => String(s || '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[c]);

// 3. Work Rendering
async function renderWork() {
  try {
    const res = await fetch('data/work.json', { cache: 'no-store' });
    const items = await res.json();
    const byYearDesc = items.sort((a, b) => b.year - a.year);

    const homeTbody = document.querySelector('#latest-work tbody');
    const workTbody = document.querySelector('#work-table tbody');

    const createRow = (item) => {
      const venueStr = item.venue ? `, <span class="venue">${escapeHtml(item.venue)}</span>` : '';
      return `
        <tr>
          <td class="year">${item.year}</td>
          <td class="title"><a href="${item.href || '#'}"><i>${escapeHtml(item.title)}</i></a></td>
          <td class="meta"><span class="company">${escapeHtml(item.company || '')}</span>${venueStr}</td>
        </tr>
      `;
    };

    if (homeTbody) homeTbody.innerHTML = byYearDesc.slice(0, 4).map(createRow).join('');
    if (workTbody) workTbody.innerHTML = byYearDesc.map(createRow).join('');
  } catch (e) {
    console.error('Failed to load work.json', e);
  }
}

// 4. Blog Data & Rendering
const blogPosts = [
  {
    title: "Always in liste d'attente",
    preview: "Good but not good enough....",
    date: "2026-01-13",
    tags: ["waiting list", "eternal", "never ending"],
    href: "blog/liste_d_attente.html"
  },
  {
    title: "Errotic in my different opinion",
    preview: "She is drowned inside the ocean of papers and books...",
    date: "2026-01-13",
    tags: ["Errotic", "Wine", "fine"],
    href: "blog/what-I-Respect.html"
  },
  {
    title: "LLMs = debts",
    preview: "I do think I have lost a part of my brain that was...",
    date: "2025-11-25",
    tags: ["LLM", "debts", "wrong"],
    href: "blog/LLMs-debt.html"
  },
  {
    title: "Invisibility",
    preview: "I am invisible, and that used to be okay in my mind...",
    date: "2025-11-23",
    tags: ["life", "solitude"],
    href: "blog/solitude-sylla.html"
  },
  {
    title: "Reasons that I better live alone",
    preview: "Well, at this point of my life, I've had experiences...",
    date: "2025-11-10",
    tags: ["life", "solitude"],
    href: "blog/solitude-sylla.html"
  },
  {
    title: "Universities after LLM era",
    preview: "So, yeah… it’s 2025 and here I am, moved all the way to France...",
    date: "2025-10-20",
    tags: ["universities", "modern era"],
    href: "blog/blog-role-discourse-markers.html"
  },
  {
    title: "Computational linguistics, myth or goal?",
    preview: "----",
    date: "2025-09-14",
    tags: ["NLP", "CL", "Linguistics"],
    href: "blog/blog-nlp-meaning.html"
  }
];

function renderBlogHub() {
  const blogList = document.getElementById('blog-list');
  if (!blogList) return;

  blogList.innerHTML = blogPosts.map(post => `
    <li class="blog-item" style="list-style: none; margin-bottom: 1.5rem;">
      <a class="link" href="${escapeHtml(post.href)}">
        <strong>${escapeHtml(post.title)}</strong>
      </a>
      <p class="muted blog-preview" style="margin: 4px 0 0; font-size: 0.92rem;">
        ${escapeHtml(post.preview)}<br>
        <span>${escapeHtml(post.date)}</span> &middot; 
        <span>${post.tags.map(t => `<span style="margin-right: 6px;">${escapeHtml(t)}</span>`).join('')}</span>
      </p>
    </li>
  `).join('');
}

// 5. Initialization
renderWork();
renderBlogHub();