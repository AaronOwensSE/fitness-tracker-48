// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage.js";
import LoadingPage from "./LoadingPage.js";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const WorkoutPage = (props) => {
    // State =======================================================================================
    const [ workout, setWorkout ] = useState([]);
    const [ exercises, setExercises ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                setWorkout(await database.readWorkout(props.workoutId));
                //setExercises(await database.readExercises(props.workoutId));
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

    // Handlers ====================================================================================
    const handleAddExercise = async () => {
    };

    // JSX =========================================================================================
    if (loading) {
        return <LoadingPage />;
    }
    
    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }

    return (
        <View style={styles.containerView} >
            <Text>Workout: {workout.name}</Text>

            <View style={styles.scrollViewWrapperView}>
                <ScrollView>
                    {exercises.map(
                        (exercise) => <ExerciseLineItem
                            key={exercise.id}
                            name={exercise.name}
                            weight={exercise.weight}
                            sets={exercise.sets}
                            reps={exercise.reps}
                        />
                    )}
                </ScrollView>
            </View>

            <Button title="Add Exercise" onPress={handleAddExercise} />
            <Button title="Back" onPress={ () => props.onNavigate("WorkoutsPage") } />
        </View>
    );
};

export default WorkoutPage;

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

    scrollViewWrapperView: {
        width: "80%",
        height: "30%",
    }
});
