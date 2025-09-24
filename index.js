import { Router } from './router';

const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

function getJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data ? JSON.parse(data) : {}));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;

    const url_test = req.url;
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const body = await getJsonBody(req);

    const router = Router(connection);
    const result = await router.route(parsedUrl, method, body);

    res.writeHead(result.code, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result.content, null, 2));
});

server.listen(port, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});

//REQUISITES
//TODO: DATABASE WITH DOCKER
//TODO: DATABASE CONNECTION
//TODO: <FRONT> CREATE FORM
//TODO: <FRONT> LIST
//TODO: <FRONT> UPDATE FORM
//TODO: <FRONT> DELETE ON LIST
//TODO: TESTS ON EVERY FUNCTIONALITY

//IMPROVEMENTS
//TODO: README (PT/EN)
//TODO: FIELD VALIDATIONS
//TODO: SWAGGER- LIKE
//TODO: JWT

//AT THE END
//PIP FREEZE