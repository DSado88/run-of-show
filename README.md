# Run of Show

A planner for people running too many lives at once — a demanding day job, a
personal life, and a side project that only happens if you carve out the hours
on purpose.

Most calendars assume your week is unique. It usually isn't. Your mornings
repeat. Your "deep work" block is the same every day you actually get one.
Run of Show lets you **design a day once** — the work meetings, the gym, the
school run, the two hours of coding — and then **drop that template onto real
dates** whenever you need it. Build a "Heavy Meeting Day," a "Ship Day," a
"Kids Have Practice" day, and stamp them onto the calendar instead of
rebuilding from scratch every week.

It's deliberately tiny and local-first: one HTML file plus a ~110-line Node
server, no accounts, no dependencies, your data in a plain JSON file you own.

## Why you'd use it

- **Protect time that doesn't protect itself.** Block the coding hours, the
  workout, the family dinner — *before* the workday floods in and takes them.
- **Stop rebuilding the same week.** Keep a handful of reusable day templates
  and assign them to dates in a couple of clicks.
- **See work, life, and side-project in one timeline.** Color-code by area
  (meetings, focus, personal, exercise…) and read your real day at a glance.
- **Plan variations without losing the original.** Each day can hold several
  plans — an A/B "if the meeting moves" version — that you toggle between.

## How it works in practice

1. **Build a schedule** in the timeline: click or drag to lay down blocks
   (a 9am standup, a 2-hour focus block, gym at 6), name and color them.
2. **Keep a library** of these schedules, grouped into folders
   (Workdays, Weekends, Travel…).
3. **Assign to dates** — pick a schedule and drop it onto today, this week, or
   any future days. Adjust the copy without touching the template.
4. **Live in the calendar** — day and week views show what's actually planned,
   with the current time marked.

## Features

- **Timeline editor** — click or drag to create blocks; resize, move,
  duplicate, recolor. Snaps to 5/10/15-minute steps.
- **Reusable day templates** — build once, assign to any dates.
- **Color labels** — name your palette ("Meeting", "Focus", "Personal") so a
  glance tells you where the time is going.
- **Folders & a resizable rail** — organize a growing library of schedules.
- **Day / week views** with multiple plans per day.
- **Undo everywhere** — undo/redo, an undo toast on deletes, keyboard shortcuts.
- **Settings** — 12/24-hour time, week start, day range, snap interval, default
  block length.
- **Your data, portable** — export/import everything as a JSON file.

## Run it

Requires [Node.js](https://nodejs.org) — there's nothing to install
(zero dependencies).

```bash
PORT=4178 node server.js
```

Open <http://localhost:4178>. Your schedule saves to `data/state.json` (created
on first save) and is mirrored to the browser's local storage, so it keeps
working offline. Run the server on a home machine and reach it from your phone
and laptop to stay in sync.

Environment:

- `PORT` — port to listen on (default `4178`)
- `HOST` — interface to bind (default `0.0.0.0`)

## Under the hood

- `Run of Show.dc.html` — the entire app (UI + logic), on a small React-based
  template runtime bundled in `support.js`.
- `server.js` — a static-file + JSON-state server. `GET /api/state` returns the
  saved document; `PUT /api/state` saves it with optimistic concurrency so a
  stale tab can't clobber newer data.

## License

[MIT](LICENSE)
