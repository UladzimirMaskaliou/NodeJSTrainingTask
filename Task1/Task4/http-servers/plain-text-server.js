import { createServer } from 'http';

createServer().
  on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
  }).listen(9080);