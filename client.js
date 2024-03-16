const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = '127.0.0.1'; // Escucha en todas las interfaces de red

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  // Si la URL solicitada es '/', entonces se redirige a 'index.html'
  if (filePath === './') {
    filePath = './index.html';
  }

  // Obtener la extensión del archivo solicitado
  const extname = String(path.extname(filePath)).toLowerCase();

  // Mapear tipos MIME para las extensiones de archivo comunes
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

  // Verificar si el archivo solicitado existe
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Si el archivo no existe, devolver un error 404
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        return res.end('404 Not Found');
      }
      // Si hay otro tipo de error, devolver un error 500
      res.writeHead(500);
      return res.end('Internal Server Error');
    }

    // Obtener el tipo MIME del archivo
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Establecer el encabezado Content-Type
    res.writeHead(200, {'Content-Type': contentType});

    // Escribir los datos del archivo en la respuesta
    res.write(data);
    return res.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor web Node.js funcionando en http://${HOST}:${PORT}`);
});
