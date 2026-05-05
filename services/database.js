// =================================================================================================
// External Dependencies
// =================================================================================================
import * as SQLite from "expo-sqlite";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import constants from "../constants.js";
import errors from "../errors.js";

// =================================================================================================
// Shared Resource
// =================================================================================================
// openDatabaseAsync is async, but we don't want a top-level await. We await the promise in our CRUD
// functions instead.
const dbPromise = SQLite.openDatabaseAsync("fitness-tracker.db");

// =================================================================================================
// API
// =================================================================================================
/**
 * @throws {DatabaseSetupError}
 */
async function createSchema() {
    try {
        const db = await dbPromise;

        await db.execAsync(`
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS personal_records (
                name VARCHAR(${constants.MAX_PERSONAL_RECORD_NAME_LENGTH}) PRIMARY KEY,
                weight REAL
            );

            CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY,
                name VARCHAR(${constants.MAX_WORKOUT_NAME_LENGTH})
            );

            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY,
                name VARCHAR(${constants.MAX_EXERCISE_NAME_LENGTH}),
                weight REAL,
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

// Testing
async function deleteSchema() {
    try {
        const db = await dbPromise;

        await db.execAsync(`
            DROP TABLE exercises;
            DROP TABLE workouts;
            DROP TABLE personal_records;
        `);
    } catch (error) {
    }
}

/**
 * @throws {DataStorageError}
 */
async function createPersonalRecord(name, weight) {
    try {
        const db = await dbPromise;

        await db.runAsync(
            "INSERT INTO personal_records (name, weight) VALUES (?, ?);", [ name, weight ]
        );
    } catch (error) {
        throw new errors.DataStorageError();
    }
}

/**
 * @throws {DataRetrievalError}
 */
async function readPersonalRecords() {
    try {
        const db = await dbPromise;
        const result = await db.getAllAsync("SELECT * FROM personal_records ORDER BY name;");

        return result;
    } catch (error) {
        throw new errors.DataRetrievalError();
    }
}

/**
 * @throws {DataStorageError}
 */
async function updatePersonalRecord(name, weight) {
    try {
        const db = await dbPromise;

        await db.runAsync(
            "UPDATE personal_records SET weight = ? WHERE name = ?;", [ weight, name ]
        );
    } catch (error) {
        throw new errors.DataStorageError();
    }
}

/**
 * @throws {DataDeletionError}
 */
async function deletePersonalRecord(name) {
    try {
        const db = await dbPromise;
        await db.runAsync("DELETE FROM personal_records WHERE name = ?;", [name]);
    } catch (error) {
        throw new errors.DataDeletionError();
    }
}

/**
 * @throws {DataStorageError}
 */
async function createWorkout(name) {
    try {
        const db = await dbPromise;

        const result = await db.getFirstAsync(
            "INSERT INTO workouts (name) VALUES (?) RETURNING id;", [name]
        );

        const id = result.id;
        
        return id;
    } catch (error) {
        throw new errors.DataStorageError();
    }
}

/**
 * @throws {DataRetrievalError}
 */
async function readWorkouts() {
    try {
        const db = await dbPromise;
        const result = await db.getAllAsync("SELECT * FROM workouts ORDER BY id DESC;");

        return result;
    } catch (error) {
        throw new errors.DataRetrievalError();
    }
}

/**
 * @throws {DataRetrievalError}
 */
async function readWorkout(id) {
    try {
        const db = await dbPromise;
        const result = await db.getFirstAsync("SELECT * FROM workouts WHERE id = ?;", [id]);

        return result;
    } catch (error) {
        throw new errors.DataRetrievalError();
    }
}

/**
 * @throws {DataDeletionError}
 */
async function deleteWorkout(id) {
    try {
        const db = await dbPromise;
        await db.runAsync("DELETE FROM workouts WHERE id = ?;", [id]);
    } catch (error) {
        throw new errors.DataDeletionError();
    }
}

/**
 * @throws {DataStorageError}
 */
async function createExercise(name, weight, sets, reps, workout) {
    try {
        const db = await dbPromise;

        const result = await db.getFirstAsync(
            `INSERT INTO exercises (name, weight, sets, reps, workout)
            VALUES (?, ?, ?, ?, ?)
            RETURNING id;`,
            [ name, weight, sets, reps, workout ]
        );

        const id = result.id;

        return id;
    } catch (error) {
        throw new errors.DataStorageError();
    }
}

/**
 * @throws {DataRetrievalError}
 */
async function readExercisesByWorkoutId(workoutId) {
    try {
        const db = await dbPromise;

        const result = await db.getAllAsync(
            "SELECT * FROM exercises WHERE workout = ? ORDER BY id;", [workoutId]
        );

        return result;
    } catch (error) {
        throw new errors.DataRetrievalError();
    }
}

/**
 * @throws {DataDeletionError}
 */
async function deleteExercise(exerciseId) {
    try {
        const db = await dbPromise;
        await db.runAsync("DELETE FROM exercises WHERE id = ?;", [exerciseId]);
    } catch (error) {
        throw new errors.DataDeletionError();
    }
}

/**
 * @throws {DataDeletionError}
 */
async function deleteExercisesByWorkoutId(workoutId) {
    try {
        const db = await dbPromise;

        await db.runAsync(
            "DELETE FROM exercises WHERE workout = ?;", [workoutId]
        );
    } catch (error) {
        throw new errors.DataDeletionError();
    }
}

const database = {
    createSchema,
    deleteSchema,

    createPersonalRecord,
    readPersonalRecords,
    updatePersonalRecord,
    deletePersonalRecord,

    createWorkout,
    readWorkouts,
    readWorkout,
    deleteWorkout,
    
    createExercise,
    readExercisesByWorkoutId,
    deleteExercise,
    deleteExercisesByWorkoutId
};

export default database;
