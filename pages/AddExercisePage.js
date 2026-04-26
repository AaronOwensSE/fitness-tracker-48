// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage";
import LabeledTextInput from "../components/LabeledTextInput";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const AddExercisePage = (props) => {
    // State =======================================================================================
    const [ name, setName ] = useState(null);
    const [ weight, setWeight ] = useState(null);
    const [ sets, setSets ] = useState(null);
    const [ reps, setReps ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Handlers ====================================================================================
    const handleAddExercise = async () => {
        try {
            await database.createExercise(
                name, Number(weight), Number(sets), Number(reps), props.workoutId
            );
        } catch (error) {
            setErrorMessage("Data storage error.");
        }

        props.onNavigate("WorkoutPage", props.workoutId);
    };

    // JSX =========================================================================================
    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }

    return(
        <View style={styles.containerView} >
            <Text>Add Exercise</Text>

            <View style={styles.inputFieldsView} >
                <LabeledTextInput label="Name" onChangeText={setName} />
                <LabeledTextInput label="Weight" onChangeText={setWeight} />
                <LabeledTextInput label="Sets" onChangeText={setSets} />
                <LabeledTextInput label="Reps" onChangeText={setReps} />
            </View>

            <Button title="Add" onPress={handleAddExercise} />

            <Button
                title="Back" onPress={ () => props.onNavigate("WorkoutPage", props.workoutId) }
            />
        </View>
    );
};

export default AddExercisePage;

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
