// API
class DatabaseSetupError extends Error {
    constructor(message = "") {
        super(message);
        this.name = "DatabaseSetupError";
    }
}

class DataDeletionError extends Error {
    constructor(message = "") {
        super(message);
        this.name = "DataDeletionError";
    }
}

class DataRetrievalError extends Error {
    constructor(message = "") {
        super(message);
        this.name = "DataRetrievalError";
    }
}

class DataStorageError extends Error {
    constructor(message = "") {
        super(message);
        this.name = "DataStorageError";
    }
}

const errors = { DatabaseSetupError, DataDeletionError, DataRetrievalError, DataStorageError };
export default errors;
