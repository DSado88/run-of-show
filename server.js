#!/usr/bin/env node
// Run of Show — tiny static + state server. Zero dependencies.
// Serves the app and persists the calendar state as data/state.json.
//   PORT=4178 node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');
const PORT = process.env.PORT || 4178;
const HOST = process.env.HOST || '0.0.0.0';
const INDEX = 'Run of Show.dc.html';

fs.mkdirSync(DATA_DIR, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

function sendState(res) {
  fs.readFile(STATE_FILE, (err, buf) => {
    if (err) { res.writeHead(404).end('{}'); return; }
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(buf);
  });
}

function saveState(req, res) {
  let body = '';
  req.on('data', (c) => {
    body += c;
    if (body.length > 25 * 1024 * 1024) { req.destroy(); } // 25MB guard
  });
  req.on('end', () => {
    let incoming;
    try { incoming = JSON.parse(body); } catch (e) { res.writeHead(400).end('invalid json'); return; }

    // Optimistic concurrency: a client sends the revision it based its edit on
    // (X-Base-Rev). If that doesn't match the current stored revision, the
    // client is stale — reject so it can't blindly overwrite newer data.
    let curRev = 0;
    try { curRev = (JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))._rev) || 0; } catch (e) {}
    const baseRev = req.headers['x-base-rev'];
    const guarded = baseRev !== undefined && baseRev !== '';
    if (guarded && String(baseRev) !== String(curRev)) {
      const cur = fs.existsSync(STATE_FILE) ? fs.readFileSync(STATE_FILE) : '{}';
      res.writeHead(409, { 'Content-Type': 'application/json' }).end(cur);
      return;
    }

    const newRev = curRev + 1;
    incoming._rev = newRev;
    const tmp = STATE_FILE + '.tmp';
    fs.writeFile(tmp, JSON.stringify(incoming), (err) => {
      if (err) { res.writeHead(500).end('write failed'); return; }
      fs.rename(tmp, STATE_FILE, (err2) => {
        if (err2) { res.writeHead(500).end('rename failed'); return; }
        res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ _rev: newRev }));
      });
    });
  });
}

function serveStatic(req, res) {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/' + INDEX;
  // prevent path traversal
  const filePath = path.normalize(path.join(ROOT, rel));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
  fs.readFile(filePath, (err, buf) => {
    if (err) { res.writeHead(404).end('not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' };
    // Never cache the app shell — guarantees every device loads the latest
    // HTML/JS (so a stale tab can't run an old, unsafe save path). Images
    // stay cacheable.
    if (ext === '.html' || ext === '.js') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';
    }
    res.writeHead(200, headers);
    res.end(buf);
  });
}

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/api/state') {
    if (req.method === 'GET') return sendState(res);
    if (req.method === 'PUT' || req.method === 'POST') return saveState(req, res);
    res.writeHead(405).end('method not allowed');
    return;
  }
  if (req.method !== 'GET') { res.writeHead(405).end('method not allowed'); return; }
  serveStatic(req, res);
}).listen(PORT, HOST, () => {
  console.log(`Run of Show running at http://${HOST}:${PORT}  (state: ${STATE_FILE})`);
});
