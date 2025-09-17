// Back-to-top visibility + behavior
const btn1 = document.getElementById('to-top');
const showAt = 220;
const onScroll = () => {
  if (window.scrollY > showAt) btn1.classList.add('show');
  else btn1.classList.remove('show');
};
window.addEventListener('scroll', onScroll, { passive: true });
btn1.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Optional: honor prefers-reduced-motion for smooth scroll
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  btn1.addEventListener('click', () => window.scrollTo(0, 0));
}
(() => {
  const root = document.documentElement;

  // Build modal once
  const modal = document.createElement('dialog');
  modal.className = 'lb';
  modal.innerHTML = `
    <button class="lb__close" aria-label="Close">×</button>
    <img class="lb__img" alt="">
    <p class="lb__cap mono"></p>`;
  document.body.appendChild(modal);

  const img = modal.querySelector('.lb__img');
  const cap = modal.querySelector('.lb__cap');

  document.addEventListener('click', ev => {
    const a = ev.target.closest('[data-lightbox]');
    if (!a) return;
    ev.preventDefault();
    const fig = a.closest('figure');
    const big = a.getAttribute('href');
    const caption = fig?.querySelector('.shot__meta')?.textContent || '';
    img.src = big;
    img.alt = a.querySelector('img')?.alt || '';
    cap.textContent = caption;
    modal.showModal();
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.classList.contains('lb__close')) modal.close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.open) modal.close();
  });
})();

