// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import FitnessTrackerButton from "./FitnessTrackerButton";

// =================================================================================================
// Component
// =================================================================================================
const WorkoutLineItem = (props) => {
    // JSX =========================================================================================    
    return(
        <View style={[ props.style, componentStyles.containerView ]}>
            <View style={componentStyles.workoutButtonView}>
                <FitnessTrackerButton
                    style={componentStyles.workoutButton}
                    title={props.name}
                    onPress={() => props.onNavigate("WorkoutPage", props.id)}
                />
            </View>

            <View style={componentStyles.deleteButtonView}>
                <FitnessTrackerButton
                    style={componentStyles.deleteButton}
                    title="Delete"
                    onPress={() => props.onDelete(props.id)}
                />
            </View>
        </View>
    );
};

export default WorkoutLineItem;

// =================================================================================================
// Stylesheet
// =================================================================================================
const componentStyles = StyleSheet.create({
    containerView: {
        margin: 5,
        flex: 1,
        flexDirection: "row"
    },

    workoutButtonView: {
        flex: 3,
        alignItems: "flex-start"
    },

    workoutButton: {
        width: "100%",

        // To avoid doubling the margin between buttons already created by the container
        marginTop: 0,
        marginBottom: 0
    },

    deleteButtonView: {
        flex: 1,
        alignItems: "flex-end"
    },

    deleteButton: {
        // To avoid doubling the margin between buttons already created by the container
        marginTop: 0,
        marginBottom: 0
    }
});
