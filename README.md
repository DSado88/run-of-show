# Run of Show

A scheduler for designing what a day should actually look like, hour by hour.

I kept trying to map out detailed days in Outlook and Google Calendar, but those
are built around meetings and invites, not laying out a whole day on purpose. I
tried Apple Notes, then Notion, and neither felt right. So I built what I
wanted: something that handles a fully planned day with the polish of a real
calendar app, but made for planning instead of booking meetings.

I built it in the margins of a full-time job and a second one, building
[Orchid](https://orchidstudio.ai). Most of my days repeat, so rather than
rebuilding the week every Sunday, I make a few day templates once (a workday, a
ship day, a travel day) and drop them onto real dates. You can tweak that day's
copy without changing the template it came from.

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
