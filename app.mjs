import { Router } from './router.js';
import http from 'http';
import url from 'url';

const port = process.env.APP_PORT || 3000;

function getJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data ? JSON.parse(data) : {}));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
    const urlData = url.parse(req.url, true);
    const method = req.method;
    const body = await getJsonBody(req);

    const router = new Router();
    const result = await router.route(urlData, method, body);

    res.writeHead(result.code)
    res.end(JSON.stringify(result.content, null, 2));
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

//REQUISITES
//TODO: DATABASE CONNECTION
//TODO: <FRONT> CREATE FORM
//TODO: <FRONT> LIST
//TODO: <FRONT> UPDATE FORM
//TODO: <FRONT> DELETE ON LIST
//TODO: TESTS ON EVERY FUNCTIONALITY

//IMPROVEMENTS
//TODO: README (PT/EN)
//TODO: CHANGE DELETE TO SOFT DELETE
//TODO: FIELD VALIDATIONS
//TODO: REFACTOR TO USE ORM
//TODO: SWAGGER-LIKE DOCUMENTATION
//TODO: JWT

//AT THE END
//PIP FREEZE