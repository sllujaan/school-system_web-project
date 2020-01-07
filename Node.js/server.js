const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  /*res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');*/

  if (req.url === '/home' || req.url === '/') {
    res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
    res.end('I am home\n');

    
  }

  if (req.url === '/contect') {
    res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
    res.end('I am contect\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});