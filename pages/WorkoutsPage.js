// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage";
import LoadingPage from "./LoadingPage";
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
    useEffect( () => {
        const load = async () => {
            try {
                setWorkouts(await database.readWorkouts());
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

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
        <View style={styles.containerView} >
            <Text>Workouts</Text>
            
            <View style={styles.scrollViewWrapperView}>
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

            <Button title="Add Workout" onPress={ () => props.onNavigate("AddWorkoutPage") } />
            <Button title="Back" onPress={ () => props.onNavigate("LandingPage") } />
        </View>
    );
};

export default WorkoutsPage;

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
        height: "30%"
    }
});
