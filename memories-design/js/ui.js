// Tiny view helpers shared by the screens (no framework).
const ROOT = new URL('../', import.meta.url);
export async function mountIcons() {               // inline the SVG sprite so <use href="#id"> works
  const html = await (await fetch(new URL('icons.html', ROOT))).text();
  document.body.insertAdjacentHTML('afterbegin', html);
}
export const icon = (id, cls = 'i') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const D = s => new Date(s + 'T12:00:00');
const M = d => d.toLocaleString('en-US', { month: 'short' });
export function dateRange(a, b) {                   // "12 – 18 Sep 2026", "29 Dec 2025 – 2 Jan 2026"
  const x = D(a), y = D(b);
  if (x.getFullYear() !== y.getFullYear()) return `${x.getDate()} ${M(x)} ${x.getFullYear()} – ${y.getDate()} ${M(y)} ${y.getFullYear()}`;
  if (x.getMonth() !== y.getMonth()) return `${x.getDate()} ${M(x)} – ${y.getDate()} ${M(y)} ${y.getFullYear()}`;
  return `${x.getDate()} – ${y.getDate()} ${M(y)} ${y.getFullYear()}`;
}
export const dayLabel = s => D(s).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
export const nDays = (a, b) => Math.round((D(b) - D(a)) / 864e5) + 1;
export const plural = (n, w) => `${n.toLocaleString('en-US')} ${w}${n === 1 ? '' : 's'}`;
export const duration = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
export const ready = () => { document.body.dataset.ready = '1'; };   // screenshot / test hook
