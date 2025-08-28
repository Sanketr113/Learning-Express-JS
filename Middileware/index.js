const express = require('express');
const app = express();
app.use(express.json());

// Custom logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} -> ${res.statusCode} in ${Date.now() - start}ms`);
  });
  next();
});

// API key middleware
app.use((req, res, next) => {
  if (!req.headers['x-api-key']) {
    return res.status(401).json({ error: 'Missing API key' });
    }
  else if (req.headers['x-api-key'] !== 123456789) {
      return res.status(403).jason({ error: 'Invalid API key' });
    }
  next();
});

app.get('/ping', (req, res) => res.json({ pong: true }));

app.listen(3000);
