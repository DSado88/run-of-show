# Run of Show

A small scheduler for planning a packed day. I built it to juggle a full-time
job, personal life, and time for a side project, the kind of week where the
coding hours and the gym quietly disappear unless you put them on a plan first.

Most of my days repeat. So instead of rebuilding the week every Sunday, I make
a few day templates once (a workday, a ship day, a day the kids have practice)
and drop them onto real dates. You can tweak that day's copy without changing
the template it came from.

It runs as one HTML file and a small Node server. No accounts, no build step,
no dependencies. Your data is a JSON file you own.

## What it does

- Lay out a day on a timeline. Click or drag to add blocks, then resize, move,
  duplicate, or recolor them. Times snap to 5, 10, or 15 minutes.
- Save those days as reusable templates and group them into folders.
- Assign a template to today, this week, or any future dates. Editing the
  assigned copy leaves the original alone.
- Color-code blocks by area (work, focus, personal, exercise) and name the
  colors, so the day is easy to read.
- Day and week views. A day can hold more than one plan when you want to
  compare options.
- Undo and redo. Deleting shows a toast you can undo from. Keyboard shortcuts
  for the common actions.
- Settings for 12 or 24-hour time, week start, the hours shown, snap interval,
  and default block length.
- Export and import everything as a JSON file.

## Running it

You need [Node](https://nodejs.org). There is nothing to install.

```bash
PORT=4178 node server.js
```

Open http://localhost:4178. Your data saves to `data/state.json` and also to the
browser's local storage, so it keeps working offline. Run the server on a
machine at home and you can reach it from your phone and laptop on the same
network.

`PORT` defaults to 4178 and `HOST` to 0.0.0.0.

## How it's built

`Run of Show.dc.html` is the whole app, both the interface and the logic. It
runs on a small React-based template runtime in `support.js`. `server.js`
serves the files and stores the state: `GET /api/state` returns the saved
document, and `PUT /api/state` writes it but refuses the write if the client is
working from a stale version.

## License

[MIT](LICENSE).
