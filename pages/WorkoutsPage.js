// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import ErrorMessagePage from "./ErrorMessagePage";
import LoadingPage from "./LoadingPage";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import Title from "../components/Title.js";
import WorkoutLineItem from "../components/WorkoutLineItem.js";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const WorkoutsPage = (props) => {
    // State =======================================================================================
    const [ workouts, setWorkouts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Hooks =======================================================================================
    useEffect(() => {
        const load = async () => {
            try {
                setWorkouts(await database.readWorkouts());
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, []);

    // Handlers ====================================================================================
    const handleDeleteWorkout = async (id) => {
        const updatedWorkouts = workouts.filter(workout => workout.id !== id);
        setWorkouts(updatedWorkouts);
        
        try {
            await database.deleteWorkout(id);
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
                    <Text style={styles.h2}>Workouts</Text>
                    
                    <View style={styles.scrollViewContainer}>
                        <ScrollView>
                            {workouts.map(
                                (workout) => <WorkoutLineItem
                                    key={workout.id}
                                    id={workout.id}
                                    name={workout.name}
                                    onNavigate={props.onNavigate}
                                    onDelete={handleDeleteWorkout}
                                />
                            )}
                        </ScrollView>
                    </View>
                    
                    <FitnessTrackerButton
                        title="Add Workout" onPress={() => props.onNavigate("AddWorkoutPage")}
                    />

                    <FitnessTrackerButton
                        title="Back" onPress={() => props.onNavigate("LandingPage")}
                    />
                </View>
            </View>
        </View>
    );
};

export default WorkoutsPage;
