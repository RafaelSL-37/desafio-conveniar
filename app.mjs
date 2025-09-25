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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204); 
    res.end();
    return;
  }

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
//TODO: TESTS ON EVERY FUNCTIONALITY
//TODO: FINISH README
//TODO: PAGINATION
//TODO: <FRONT> FIELD VALIDATIONS

//IMPROVEMENTS
//REFACTOR TO USE ORM
//SWAGGER-LIKE DOCUMENTATION
//AUTHENTICATION