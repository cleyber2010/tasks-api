import {Database} from "../database/database.js";
import { randomUUID } from "crypto";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            res.writeHead(200).end();
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const data = {
                id: randomUUID(),
                ...req.body
            }

            console.log(data);

            res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: '/tasks/:id',
        handler: (req, res) => {
            res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (req, res) => {
            res.writeHead(204).end();
        }
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        handler: (req, res) => {
            res.writeHead(201).end();
        }
    }
];