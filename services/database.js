// =================================================================================================
// External Dependencies
// =================================================================================================
import * as SQLite from "expo-sqlite";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import errors from "../errors.js";

// =================================================================================================
// Shared Resource
// =================================================================================================
// openDatabaseAsync is async, but we don't want a top-level await. We await the promise in our CRUD
// functions instead.
const dbPromise = SQLite.openDatabaseAsync("fitness-tracker.db");   // Unhandled exception?

// =================================================================================================
// API
// =================================================================================================
async function buildSchema() {
    const db = await dbPromise;

    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS prs (
                name VARCHAR(30) PRIMARY KEY,
                weight INTEGER
            );
        `);
    } catch (error) {
        throw new errors.DatabaseSetupError();
    }
}

async function createPR(name, weight) {
    const db = await dbPromise;

    try {
        await db.runAsync("INSERT INTO prs (name, weight) VALUES (?, ?);", [ name, weight ]);
    } catch (error) {
        throw new errors.DataStorageError();
    }
}

async function readPRs() {
    const db = await dbPromise;
    let result;

    try {
        result = await db.getAllAsync("SELECT * FROM prs;");
    } catch (error) {
        throw new errors.DataRetrievalError();
    }

    return result;
}

async function updatePR(name, weight) {
    const db = await dbPromise;

    try {
        await db.runAsync("UPDATE prs SET weight = ? WHERE name = ?;", [ weight, name ]);
    } catch (error) {
        throw new errors.DataStorageError();
    }
}

async function deletePR(name) {
    const db = await dbPromise;

    try {
        await db.runAsync("DELETE FROM prs WHERE name = ?;", [name]);
    } catch (error) {
        throw new errors.DataDeletionError();
    }
}

const database = { buildSchema, createPR, readPRs, updatePR, deletePR };
export default database;
