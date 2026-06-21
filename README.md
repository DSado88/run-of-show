# Run of Show

A fast, local-first timeline scheduler. Build reusable **time-block schedules**
("run of show" timelines) by time only, then assign them onto real calendar
dates. Zero dependencies — it's one HTML file plus a tiny Node server.

## Features

- **Timeline editor** — click or drag to create time blocks; resize, move,
  duplicate, recolor. Snap to 5/10/15-minute steps.
- **Reusable schedules** — build a schedule once, then "Assign to days" to drop
  it onto any dates (templates → calendar).
- **Folders & organization** — group schedules into folders with drag-and-drop;
  resizable side panel.
- **Calendar views** — day and week; each day can hold several plans you toggle
  between.
- **Safety** — undo/redo, an undo toast on deletes, keyboard shortcuts.
- **Settings** — 12/24-hour time, week start, day range, snap interval, default
  block length, and named color labels.
- **Portable** — export/import everything as a JSON file.

## Run

Requires [Node.js](https://nodejs.org) (no `npm install` — there are no
dependencies).

```bash
PORT=4178 node server.js
```

Then open <http://localhost:4178>. State is saved to `data/state.json`
(created on first save) and also mirrored to your browser's local storage.

Environment:

- `PORT` — port to listen on (default `4178`)
- `HOST` — interface to bind (default `0.0.0.0`)

## How it works

- `Run of Show.dc.html` — the entire app (UI + logic), built on a small
  React-based template runtime bundled in `support.js`.
- `server.js` — a ~110-line static-file + JSON-state server. `GET /api/state`
  returns the saved document; `PUT /api/state` saves it with optimistic
  concurrency (a stale client can't clobber newer data).

The app works fully offline from local storage; the server just persists a
shared copy so multiple devices can sync.

## License

[MIT](LICENSE)
