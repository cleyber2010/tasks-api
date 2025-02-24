import fs from 'node:fs/promises'
const databasePath = new URL("../db.json", import.meta.url);
export class Database {
    #database = {};

    /**
     * Faz a leitura do arquivo assim que instanciada
     * caso o arquivo não exista, cria o arquivo vazio
     */
    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then((data) => this.#database = JSON.parse(data))
            .catch(() => this.#persist());
    }

    select(table, search) {
        if (search) {
            return this.#database[table].filter((row) => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                })
            });
        }
        return this.#database[table] ?? [];
    }

    insert(table, data) {
        if (data.title == null && data.description == null) {
            return false;
        }
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();
        return true;
    }

    update (table, id, data) {
        const index = this.#database[table].findIndex(item => item.id === id);
        if (index > -1 && (data.title != null || data.description != null)) {
            this.#database[table][index].updated_at = new Date().toISOString().slice(0, 19);
            this.#database[table][index].title = data.title;
            this.#database[table][index].description = data.description;
            this.#persist();
            return true;
        } else {
            console.log("Task not found");
            return false;
        }
    }

    completed(table, id) {
        const index = this.#database[table].findIndex(item => item.id === id);
        if (index > -1) {
            this.#database[table][index].completed_at = new Date().toISOString().slice(0, 19);
            this.#persist();
            return true;
        } else {
            console.log("Task not found");
            return false;
        }
    }

    createTaskCsv(table, data) {

    }

    delete (table, id) {
        const index = this.#database[table].findIndex(item => item.id === id);
        if (index > -1) {
            this.#database[table].splice(index, 1);
            this.#persist();
            return true;
        }  else {
            console.log("Task not found");
            return false;
        }
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }
}