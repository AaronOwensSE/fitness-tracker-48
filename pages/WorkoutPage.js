// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import ErrorMessagePage from "./ErrorMessagePage.js";
import LoadingPage from "./LoadingPage.js";
import ExerciseLineItem from "../components/ExerciseLineItem.js";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import Title from "../components/Title.js";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const WorkoutPage = (props) => {
    // State =======================================================================================
    const [ workout, setWorkout ] = useState({});
    const [ exercises, setExercises ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Hooks =======================================================================================
    useEffect(() => {
        const load = async () => {
            try {
                setWorkout(await database.readWorkout(props.workoutId));
                setExercises(await database.readExercisesByWorkoutId(props.workoutId));
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, []);

    // Handlers ====================================================================================
    const handleDeleteExercise = async (id) => {
        const updatedExercises = exercises.filter(exercise => exercise.id !== id);
        setExercises(updatedExercises);

        try {
            await database.deleteExercise(id);
        } catch (error) {
            setErrorMessage("Data deletion error.");
        }
    };

    // JSX =========================================================================================
    if (loading) {
        return <LoadingPage />;
    }
    
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
                    <Text style={styles.h2}>Workout: {workout.name}</Text>

                    <View style={styles.scrollViewContainer}>
                        <ScrollView>
                            {exercises.map(
                                (exercise) => <ExerciseLineItem
                                    key={exercise.id}
                                    id={exercise.id}
                                    name={exercise.name}
                                    weight={exercise.weight}
                                    sets={exercise.sets}
                                    reps={exercise.reps}
                                    onDelete={handleDeleteExercise}
                                />
                            )}
                        </ScrollView>
                    </View>

                    <FitnessTrackerButton
                        title="Add Exercise"
                        onPress={() => props.onNavigate("AddExercisePage", workout.id)}
                    />

                    <FitnessTrackerButton
                        title="Back" onPress={() => props.onNavigate("WorkoutsPage")}
                    />
                </View>
            </View>
        </View>
    );
};

export default WorkoutPage;
