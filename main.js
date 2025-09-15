// Theme toggle (CSS variables, no gimmicks)
const btn = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'dark') root.setAttribute('data-theme', 'dark');

if (btn) {
  btn.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
    localStorage.setItem('theme', dark ? 'light' : 'dark');
    btn.setAttribute('aria-pressed', String(!dark));
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
