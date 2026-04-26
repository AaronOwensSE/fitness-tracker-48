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
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS prs (
                name VARCHAR(30) PRIMARY KEY,
                weight INTEGER
            );

            CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY,
                name VARCHAR(30)
            );

            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY,
                name VARCHAR(30),
                weight INTEGER,
                sets INTEGER,
                reps INTEGER,
                workout INTEGER,
                FOREIGN KEY (workout)
                    REFERENCES workouts(id)
                    ON DELETE CASCADE
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
        result = await db.getAllAsync("SELECT * FROM prs ORDER BY name;");
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

async function createWorkout(name) {
    const db = await dbPromise;
    let result;
    
    try {
        result = await db.getFirstAsync(
            "INSERT INTO workouts (name) VALUES (?) RETURNING id;", [name]
        );
    } catch (error) {
        throw new errors.DataStorageError();
    }

    const id = result.id;

    return id;
}

async function readWorkouts() {
    const db = await dbPromise;
    let result;

    try {
        result = await db.getAllAsync("SELECT * FROM workouts ORDER BY id DESC;");
    } catch (error) {
        throw new errors.DataRetrievalError();
    }

    return result;
}

async function readWorkout(id) {
    const db = await dbPromise;
    let result;

    try {
        result = await db.getFirstAsync("SELECT * FROM workouts WHERE id = ?;", [id]);
    } catch (error) {
        throw new errors.DataRetrievalError();
    }

    return result;
}

async function deleteWorkout(id) {
    const db = await dbPromise;

    try {
        await db.runAsync("DELETE FROM workouts WHERE id = ?;", [id]);
    } catch (error) {
        throw new errors.DataDeletionError();
    }
}

async function createExercise(name, weight, sets, reps, workout) {
    const db = await dbPromise;
    let result;

    try {
        result = await db.getFirstAsync(
            `INSERT INTO exercises (name, weight, sets, reps, workout)
            VALUES (?, ?, ?, ?, ?)
            RETURNING id;`,
            [ name, weight, sets, reps, workout ]
        );
    } catch (error) {
        throw new errors.DataStorageError();
    }

    const id = result.id;
    
    return id;
}

async function readExercisesByWorkoutId(workoutId) {
    const db = await dbPromise;
    let result;

    try {
        result = await db.getAllAsync(
            "SELECT * FROM exercises WHERE workout = ? ORDER BY id;", [workoutId]
        );
    } catch (error) {
        throw new errors.DataRetrievalError();
    }

    return result;
}

async function deleteExercise(exerciseId) {
    const db = await dbPromise;

    try {
        await db.runAsync("DELETE FROM exercises WHERE id = ?;", [exerciseId]);
    } catch (error) {
        throw new errors.DataDeletionError();
    }
}

const database = {
    buildSchema,
    createPR,
    readPRs,
    updatePR,
    deletePR,
    createWorkout,
    readWorkouts,
    readWorkout,
    deleteWorkout,
    createExercise,
    readExercisesByWorkoutId,
    deleteExercise
};

export default database;
