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
import validation from "../services/validation.js";

// =================================================================================================
// Page
// =================================================================================================
const AddExercisePage = (props) => {
    // State =======================================================================================
    const [ name, setName ] = useState(null);
    const [ weightText, setWeightText ] = useState(null);
    const [ setsText, setSetsText ] = useState(null);
    const [ repsText, setRepsText ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Handlers ====================================================================================
    const handleAddExercise = async () => {
        const weight = Number(weightText);
        const sets = Number(setsText);
        const reps = Number(repsText);

        if (!validation.isValidExercise({ name, weight, sets, reps })) {
            setErrorMessage("Invalid exercise.");

            return;
        }

        try {
            await database.createExercise(
                name, weight, sets, reps, props.workoutId
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
                        <LabeledTextInput
                            label="Name" keyboardType="default" onChangeText={setName}
                        />

                        <LabeledTextInput
                            label="Weight" keyboardType="decimal-pad" onChangeText={setWeightText}
                        />

                        <LabeledTextInput
                            label="Sets" keyboardType="decimal-pad" onChangeText={setSetsText}
                        />

                        <LabeledTextInput
                            label="Reps" keyboardType="decimal-pad" onChangeText={setRepsText}
                        />
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
