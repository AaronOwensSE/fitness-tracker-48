// API
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

const errors = { DataRetrievalError, DataStorageError };
export default errors;
