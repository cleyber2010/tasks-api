import http from 'node:http'
import {routes} from "./routes/routes.js";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    const route = routes.filter(item => item.method === method && item.path.test(url))[0];

    if (route) {
        console.log(url.match(route.path));
        return route.handler(req, res);
    }

    return res.writeHead(404).end();
});

server.listen(3333);