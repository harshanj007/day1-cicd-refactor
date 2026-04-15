const http = require('http');

const PORT = process.env.PORT || 3000;
const APP_SECRET = process.env.APP_SECRET || 'not-set';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy' }));
    return;
  }

  if (req.url === '/secret-check') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ secretConfigured: APP_SECRET !== 'not-set' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Day 1 DevOps CI/CD Pipeline Project is running');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});