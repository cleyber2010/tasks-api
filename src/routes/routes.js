import {Database} from "../database/database.js";
import { randomUUID } from "crypto";
import {buildRoutes} from "../utils/build-route.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutes('/tasks'),
        handler: (req, res) => {
            const { search } = req.query;
            res.writeHead(200, {'Content-Type' : 'application/json'})
                .end(JSON.stringify(database.select("tasks", search ? {
                    title: search,
                    description: search
                } : null)));
        }
    },
    {
        method: 'POST',
        path: buildRoutes('/tasks'),
        handler: (req, res) => {
            const data = {
                id: randomUUID(),
                completed_at: null,
                created_at: new Date().toISOString().slice(0, 19),
                updated_at: null,
                ...req.body
            }

            database.insert("tasks", data);

            res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutes('/tasks/:id'),
        handler: (req, res) => {
            res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutes('/tasks/:id'),
        handler: (req, res) => {
            res.writeHead(204).end();
        }
    },
    {
        method: 'PATCH',
        path: buildRoutes('/tasks/:id/complete'),
        handler: (req, res) => {
            res.writeHead(201).end();
        }
    }
];