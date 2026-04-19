// API
class DataStorageError extends Error {
    constructor(message = "") {
        super(message);
        this.name = "DataStorageError";
    }
}

class DataRetrievalError extends Error {
    constructor(message = "") {
        super(message);
        this.name = "DataRetrievalError";
    }
}

const errors = { DataStorageError, DataRetrievalError };
export default errors;
