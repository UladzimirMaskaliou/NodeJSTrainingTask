import {access, constants, createReadStream, readFileSync} from 'fs';
import { createServer } from 'http';
const file = './Task4/http-servers/index.html';
const msgToReplace = 'myMessage';

createServer().
  on('request', (req, res) => {
    access(file, constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 500;
            res.end("Server Error");
            console.error(err);
        } else {  
            var data = readFileSync(file, 'utf8');
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); 
            res.end(data.replace('{message}', msgToReplace)); 
            //                or
            //createReadStream(file).pipe(res);          
        }
    });
  }).listen(9080);