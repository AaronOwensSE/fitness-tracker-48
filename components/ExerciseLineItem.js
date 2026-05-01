// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles";
import FitnessTrackerButton from "./FitnessTrackerButton";

// =================================================================================================
// Page
// =================================================================================================
const ExerciseLineItem = (props) => {
    // JSX =========================================================================================
    return(
        <View style={[ props.style, componentStyles.containerView ]}>
            <View style={componentStyles.dataView}>
                <Text style={styles.h3}>{props.name}</Text>
                <Text style={styles.text}>{props.sets} x {props.reps} @ {props.weight}</Text>

                <View style={componentStyles.percentagesView}>
                    <Text style={styles.text}>50%: {Math.round(props.weight * 0.5)}</Text>
                    <Text style={styles.text}> | </Text>
                    <Text style={styles.text}>75%: {Math.round(props.weight * 0.75)}</Text>
                    <Text style={styles.text}> | </Text>
                    <Text style={styles.text}>90%: {Math.round(props.weight * 0.9)}</Text>
                </View>
            </View>

            <View style={componentStyles.buttonView}>
                <FitnessTrackerButton title="Delete" onPress={ () => props.onDelete(props.id) } />
            </View>
        </View>
    );
};

export default ExerciseLineItem;

// =================================================================================================
// Stylesheet
// =================================================================================================
const componentStyles = StyleSheet.create({
    containerView: {
        margin: 5,
        flex: 1,
        flexDirection: "row"
    },

    dataView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start"
    },

    percentagesView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start"
    },

    buttonView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    }
});
