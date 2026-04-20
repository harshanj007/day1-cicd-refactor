const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] Request received: ${req.method} ${req.url}`);

  if (req.url === '/health') {
    console.log(`[${timestamp}] Health check endpoint hit`);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: timestamp
    }));
    return;
  }

  if (req.url === '/error') {
    console.error(`[${timestamp}] Simulated error triggered`);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'error',
      message: 'Simulated failure'
    }));
    return;
  }

  if (req.url === '/crash') {
    console.error(`[${timestamp}] Crash prevented`);

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Handled crash safely');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Day 4 Observability App Running');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});