# Memories — Step 1 API contract (future local backend)

The UI never fetches data directly. Every screen calls the data layer in `js/data.js`
(`getLibraryStatus`, `startUpload`, `getUpload`, `listTrips`, `getTrip`, `thumbSrc`, `mediaSrc`).
**Today** those functions read `mock/data.json`. **Later**, set `SOURCE = 'api'` and they call the endpoints below,
which return exactly the same JSON shapes, so the screens don't change.
The server runs locally (e.g. `http://127.0.0.1:<port>`). There are no accounts and no cloud.

## Endpoints

| Method | Path | Used by | Returns |
|---|---|---|---|
| GET | `/api/library/status` | app start (route to Empty or Home) | `LibraryStatus` |
| POST | `/api/uploads` | Empty / "Upload more" | `{ id, status: "queued", total }`, `202 Accepted` |
| GET | `/api/uploads/{id}` | Uploading (poll ~1 s) | `Upload` |
| GET | `/api/trips` | Home | `TripSummary[]`, newest first |
| GET | `/api/trips/{id}` | Trip | `Trip` |
| GET | `/media/{id}/thumb` | grids, covers | JPEG, ~480 px on the long edge |
| GET | `/media/{id}` | viewer / film (later) | original file (supports Range for video) |

`POST /api/uploads` takes `multipart/form-data` with repeated `files[]` fields (the folder-relative path goes in the filename).
Errors use `{ "error": { "code": "not_found", "message": "…" } }` with the matching HTTP status.

## Shapes (see `mock/data.json` for the full example)

```jsonc
// LibraryStatus
{ "hasPhotos": true, "photoCount": 50, "videoCount": 7, "tripCount": 6 }

// Upload
{ "id": "up_7f3a", "status": "queued|processing|done|failed", "processed": 248, "total": 612,
  "stage": "reading|finding_dates_places|grouping",
  "stages": [{ "key": "reading", "label": "Reading photos" }, …],
  "tripsFound": [{ "id": "amalfi-coast-2026", "title": "Amalfi Coast", "photoCount": 118 }],
  "recentThumbs": ["/media/m_123/thumb", …] }

// TripSummary  (GET /api/trips)
{ "id": "amalfi-coast-2026", "title": "Amalfi Coast", "place": "Amalfi Coast", "country": "Italy",
  "startDate": "2026-09-12", "endDate": "2026-09-18", "coverUrl": "/media/m_1/thumb",
  "photoCount": 20, "videoCount": 3 }

// Trip  (GET /api/trips/{id}) = TripSummary + days
{ …TripSummary, "days": [ { "day": 1, "date": "2026-09-12", "place": "Naples",
    "media": [ { "id": "m_1", "type": "photo|video", "url": "/media/m_1", "thumbUrl": "/media/m_1/thumb",
                 "takenAt": "2026-09-12T09:00:00+02:00", "lat": 40.852, "lon": 14.268,
                 "durationSec": null } ] } ] }
```

Notes: dates are ISO-8601. `takenAt` keeps the local offset where the photo was taken. `lat`/`lon` may be `null`.
`durationSec` is set only for videos. In the mock, `url`/`thumbUrl`/`coverUrl` are relative file paths. The API returns `/media/...` URLs instead.
