// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage.js";
import LabeledTextInput from "../components/LabeledTextInput";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const AddWorkoutPage = (props) => {
    // State =======================================================================================
    const [ name, setName ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Handlers ====================================================================================
    const handleAddWorkout = async () => {
        try {
            const workoutId = await database.createWorkout(name);
            props.onNavigate("WorkoutPage", workoutId);
        } catch (error) {
            setErrorMessage("Data storage error.");
        }
    };

    // JSX =========================================================================================
    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }

    return (
        <View style={styles.containerView} >
            <Text>Add Workout</Text>

            <View style={styles.inputFieldsView}>
                <LabeledTextInput label="Name" style={styles.textInput} onChangeText={setName} />
            </View>
            
            <Button title="Add" onPress={handleAddWorkout} />
            <Button title="Back" onPress={ () => props.onNavigate("WorkoutsPage") } />
        </View>
    );
};

export default AddWorkoutPage;

// =================================================================================================
// Stylesheet
// =================================================================================================
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 51,
        marginBottom: 51,
        justifyContent: "center",
        alignItems: "center"
    },

    inputFieldsView: {
        width: "80%"
    }
});
