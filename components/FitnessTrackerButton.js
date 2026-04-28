// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";

// =================================================================================================
// Component
// =================================================================================================
const FitnessTrackerButton = (props) => {
    // JSX =========================================================================================
    return(
        <TouchableOpacity
            style={[ props.style, componentStyles.fitnessTrackerButton ]}
            onPress={props.onPress}
        >
            <Text style={styles.text} >{props.title}</Text>
        </TouchableOpacity>
    );
};

export default FitnessTrackerButton;

// =================================================================================================
// Stylesheet
// =================================================================================================
const componentStyles = StyleSheet.create({
    fitnessTrackerButton: {
        margin: 5,
        borderRadius: 2,
        backgroundColor: "dodgerblue",
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    }
});
