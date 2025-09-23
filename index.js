const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello from Node.js backend!\n');

    res.writeHead(200, { 'Content-Type': 'text/html' });

    const url = req.url;
    const method = true; //TODO: GET METHOD
    const connection = 'XXXXXXXXXXXXXXXXXXXXX'; //TODO: CONNECT TO POSTGRES

    router = Router(connection);
    route(res, url, method)
});

server.listen(port, () => {
    console.log(`Server running at http://${localhost}:${port}/`); //TODO: CHECK ENV VARS
});


//TODO: DOCKER
//TODO: SWAGGER
//TODO: JWT
//TODO: MIGRATIONS