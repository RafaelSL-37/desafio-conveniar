const http = require('http');
import Router from './router';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello from Node.js backend!\n');

    res.writeHead(200, { 'Content-Type': 'text/html' });

    const url = req.url;
    const method = 'XXXXXXXXXXXXXXXXXXXX'; //TODO: GET METHOD

    router = Router(connection);
    page = route(res, url, method)

    res.write(page);
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at http://${localhost}:${port}/`); //TODO: CHECK ENV VARS
});


//TODO: DOCKER
//TODO: SWAGGER
//TODO: JWT
//TODO: MIGRATIONS