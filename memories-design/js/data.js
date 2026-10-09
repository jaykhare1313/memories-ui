// Data layer — the ONLY module screens use to get data.
// Today it reads mock/data.json. To go live, set SOURCE = 'api': every function then calls the
// endpoint in API_CONTRACT.md and returns the same shape, so no screen code changes.
const SOURCE = new URLSearchParams(location.search).get('source') || 'mock'; // 'mock' | 'api'
const ROOT = new URL('../', import.meta.url);           // step1/
const MOCK_URL = new URL('mock/data.json', ROOT);
let mock;
const getJSON = async (url, opts) => { const r = await fetch(url, opts); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.json(); };
const loadMock = async () => (mock ??= await getJSON(MOCK_URL));
// ?state=empty simulates a brand-new library (no photos yet) while using mocks.
const emptyMock = () => new URLSearchParams(location.search).get('state') === 'empty';

/** GET /api/library/status -> { hasPhotos, photoCount, videoCount, tripCount } */
export async function getLibraryStatus() {
  if (SOURCE === 'api') return getJSON('/api/library/status');
  const d = await loadMock();
  return emptyMock() ? { hasPhotos: false, photoCount: 0, videoCount: 0, tripCount: 0 } : d.library;
}
/** POST /api/uploads (multipart: files[]) -> { id, status, total } */
export async function startUpload(files) {
  if (SOURCE === 'api') { const fd = new FormData(); [...files].forEach(f => fd.append('files[]', f, f.webkitRelativePath || f.name)); return getJSON('/api/uploads', { method: 'POST', body: fd }); }
  const u = (await loadMock()).upload; return { id: u.id, status: 'queued', total: u.total };
}
/** GET /api/uploads/{id} -> { id, status, processed, total, stage, stages[], tripsFound[], recentThumbs[] } */
export async function getUpload(id) {
  if (SOURCE === 'api') return getJSON(`/api/uploads/${encodeURIComponent(id)}`);
  return (await loadMock()).upload;
}
/** GET /api/trips -> TripSummary[] (newest first, no days[]) */
export async function listTrips() {
  if (SOURCE === 'api') return getJSON('/api/trips');
  if (emptyMock()) return [];
  return (await loadMock()).trips.map(({ days, ...summary }) => summary)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
}
/** GET /api/trips/{id} -> Trip (summary + days[].media[]) */
export async function getTrip(id) {
  if (SOURCE === 'api') return getJSON(`/api/trips/${encodeURIComponent(id)}`);
  const t = (await loadMock()).trips.find(t => t.id === id);
  if (!t) throw new Error(`trip ${id} not found`); return t;
}
/** Media URLs: mock paths are relative files; the API serves /media/{id}/thumb and /media/{id}. */
export const thumbSrc = m => SOURCE === 'api' ? `/media/${m.id}/thumb` : new URL(m.thumbUrl, ROOT).href;
export const mediaSrc = m => SOURCE === 'api' ? `/media/${m.id}` : new URL(m.url, ROOT).href;
export const assetSrc = p => /^(https?:)?\//.test(p) ? p : new URL(p, ROOT).href;   // coverUrl etc.
