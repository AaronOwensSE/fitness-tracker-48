// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
import { Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import ErrorMessagePage from "./ErrorMessagePage.js";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import LabeledTextInput from "../components/LabeledTextInput";
import Title from "../components/Title.js";
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

    return(
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.head}>
                    <Title />
                </View>

                <View style={styles.body}>
                    <Text style={styles.h2}>Add Workout</Text>

                    <View style={styles.centeredView}>
                        <LabeledTextInput label="Name" onChangeText={setName} />
                    </View>
                    
                    <FitnessTrackerButton title="Add" onPress={handleAddWorkout} />

                    <FitnessTrackerButton
                        title="Back" onPress={() => props.onNavigate("WorkoutsPage")}
                    />
                </View>
            </View>
        </View>
    );
};

export default AddWorkoutPage;
