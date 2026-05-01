// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
import { Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import ErrorMessagePage from "./ErrorMessagePage";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import LabeledTextInput from "../components/LabeledTextInput";
import Title from "../components/Title.js";
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
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.head}>
                    <Title />
                </View>

                <View style={styles.body}>
                    <Text style={styles.h2}>Add Exercise</Text>

                    <View style={styles.centeredView}>
                        <LabeledTextInput label="Name" onChangeText={setName} />
                        <LabeledTextInput label="Weight" onChangeText={setWeight} />
                        <LabeledTextInput label="Sets" onChangeText={setSets} />
                        <LabeledTextInput label="Reps" onChangeText={setReps} />
                    </View>

                    <FitnessTrackerButton title="Add" onPress={handleAddExercise} />

                    <FitnessTrackerButton
                        title="Back"
                        onPress={() => props.onNavigate("WorkoutPage", props.workoutId)}
                    />
                </View>
            </View>
        </View>
    );
};

export default AddExercisePage;
