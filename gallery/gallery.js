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
