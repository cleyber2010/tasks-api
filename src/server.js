import http from 'node:http'
import {routes} from "./routes/routes.js";

const server = http.createServer((req, res) => {
    const { method, url } = req;

    const route = routes.filter(item => item.method === method && item.path === url)[0];

    if (route) {
        return route.handler(req, res);
    }

    return res.writeHead(404).end();
});

server.listen(3333);