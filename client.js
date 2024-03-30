const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = '127.0.0.1'; 

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        return res.end('404 Not Found');
      }
      res.writeHead(500);
      return res.end('Internal Server Error');
    }

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    res.writeHead(200, {'Content-Type': contentType});

    res.write(data);
    return res.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor web Node.js funcionando en http://${HOST}:${PORT}`);
});
