// Theme toggle (CSS variables, multiple palettes)
const btn = document.getElementById('theme-toggle');
const root = document.documentElement;

// Define available themes (must exist in styles.css)
const themes = ["light", "dark", "blue", "green", "purple", "red", "orange", "teal", "gray"];

// Load saved theme if valid
const saved = localStorage.getItem('theme');
if (saved && themes.includes(saved)) {
  root.setAttribute('data-theme', saved);
}

// Handle click → pick random theme (different from current)
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

// Render latest work on home (top 4) and full table on /work.html
async function renderWork() {
  try {
    const res = await fetch('data/work.json', { cache: 'no-store' });
    const items = await res.json();

    const byYearDesc = items.sort((a, b) => b.year - a.year);

    const homeTbody = document.querySelector('#latest-work tbody');
    if (homeTbody) {
      byYearDesc.slice(0, 4).forEach(addRow(homeTbody));
    }

    const workTbody = document.querySelector('#work-table tbody');
    if (workTbody) {
      byYearDesc.forEach(addRow(workTbody));
    }
  } catch (e) {
    console.error('Failed to load work.json', e);
  }
}

function addRow(tbody) {
  return (item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="year">${item.year}</td>
      <td class="title"><a href="${item.href || '#'}"><i>${escapeHtml(item.title)}</i></a></td>
      <td class="meta"><span class="company">${escapeHtml(item.company || '')}</span>${item.venue ? ', <span class="venue">' + escapeHtml(item.venue) + '</span>' : ''}</td>
    `;
    tbody.appendChild(tr);
  };
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

renderWork();

const blogPosts = [
  {
    title: "LLMs = debts",
    preview: "I do think I have lost a part of my brain that was...",
    date: "25/11/2025",
    tags: ["LLM", "debts", "wrong"],
    href: "blog/LLMs-debt.html"
  },
  {
    title: "Invisibility",
    preview: "I am invisbible, and that's used to be no okay in my mind,...",
    date: "2025-11-23",
    tags: ["life", "Nima", "solitude"],
    href: "blog/solitude-sylla.html"
  },
  {
    title: "Reasons that I better live alone",
    preview: "well, at this point of my life, I've had experieces that led me to make this decesion",
    date: "2025-11-10",
    tags: ["life", "Me", "solitude"],
    href: "blog/solitude-sylla.html"
  },
  {
    title: "Univeristies after LLM era",
    preview: "So, yeah… it’s 2025 and here I am, moved all the way to France just for the chance to sit in a..",
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
  if (blogList && blogPosts && blogPosts.length) {
    blogPosts.forEach(post => {
      const li = document.createElement('li');
      li.style.listStyle = 'none';

      li.innerHTML = `
        <a class="link" href="${post.href}">
          <strong>${escapeHtml(post.title)}</strong>
        </a>
        <p class="muted" style="margin:4px 0 0;font-size:.92rem;">
          ${escapeHtml(post.preview)}<br>
          <span>${escapeHtml(post.date)}</span>
          ·
          <span>${post.tags.map(t => `<span style="margin-right:6px">${escapeHtml(t)}</span>`).join('')}</span>
        </p>
      `;
      blogList.appendChild(li);
    });
  }
}

// Call the function on page load (just like renderWork)
renderBlogHub();
