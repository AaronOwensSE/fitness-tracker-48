// External Dependencies
import AsyncStorage from "@react-native-async-storage/async-storage";

// Internal Dependencies
import errors from "../errors.js";

// API
/**
 * @throws {DataStorageError}
 */
async function setItem(key, value) {
    const jsonValue = JSON.stringify(value);

    try {
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        throw new errors.DataStorageError();
    }
}

/**
 * @throws {DataRetrievalError}
 */
async function getItem(key) {
    let jsonValue;

    try {
        jsonValue = await AsyncStorage.getItem(key);
    } catch (error) {
        throw new errors.DataRetrievalError();
    }

    const value = JSON.parse(jsonValue);

    return value;
}

const storage = { setItem, getItem };
export default storage;
