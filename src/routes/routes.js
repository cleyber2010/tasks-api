import {Database} from "../database/database.js";
import { randomUUID } from "crypto";
import {buildRoutes} from "../utils/build-route.js";
import fs from 'node:fs';
import { parse } from "csv-parse";

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
        method: 'POST',
        path: buildRoutes('/csv'),
        handler: (req, res) => {
            const filePath = new URL('../../tasks.csv', import.meta.url);
            const processFile = async () => {
                const records = [];
                const parser = fs.createReadStream(filePath)
                    .pipe(parse());
                for await (const record of parser) {
                    records.push(record);
                }
                return records;
            }
            const records = async () => {
                const records = await processFile();
                records.shift();
                for (const task of records) {
                    const [title, description] = task.join(",").split(",");
                    let data = {
                        id: randomUUID(),
                        completed_at: null,
                        created_at: new Date().toISOString().slice(0, 19),
                        updated_at: null,
                        title,
                        description
                    }
                    database.insert("tasks", data);
                }
            }

            records()
                .then(() => console.log('Done'));

            res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutes('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const data = {
                ...req.body
            }
            database.update("tasks", id, data);
            res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutes('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            database.delete("tasks", id);
            res.writeHead(204).end();
        }
    },
    {
        method: 'PATCH',
        path: buildRoutes('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;
            database.completed("tasks", id);
            res.writeHead(201).end();
        }
    }
];