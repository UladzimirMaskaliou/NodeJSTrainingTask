import { createServer } from 'http';

createServer()
    .on('request', (req, res) => {
        req.pipe(res);
    }).listen(9080);  