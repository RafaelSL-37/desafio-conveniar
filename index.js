import Router from './router';

const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    const url_test = req.url;
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    const router = Router(connection);
    const result = router.route(res, parsedUrl, method);

    res.writeHead(result.code, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result.content, null, 2));
});

server.listen(PORT, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});

//REQUISITES
//TODO: DATABASE
//TODO: DATABASE CONNECTION
//TODO: <FRONT> CREATE FORM
//TODO: <FRONT> LIST
//TODO: <FRONT> UPDATE FORM
//TODO: <FRONT> DELETE ON LIST
//TODO: TESTS ON EVERY FUNCTIONALITY

//IMPROVEMENTS
//TODO: README (PT/EN)
//TODO: FIELD VALIDATIONS
//TODO: DOCKER
//TODO: SWAGGER
//TODO: JWT

//AT THE END
//PIP FREEZE