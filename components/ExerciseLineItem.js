// =================================================================================================
// External Dependencies
// =================================================================================================
import { Button, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Page
// =================================================================================================
const ExerciseLineItem = (props) => {
    // JSX =========================================================================================
    return(
        <View style={styles.containerView} >
            <View style={styles.dataView} >
                <Text>{props.name}</Text>
                <Text>{props.sets} x {props.reps} @ {props.weight}</Text>

                <View style={styles.percentagesView} >
                    <Text>50%: {Math.round(props.weight * 0.5)}</Text>
                    <Text> | </Text>
                    <Text>75%: {Math.round(props.weight * 0.75)}</Text>
                    <Text> | </Text>
                    <Text>90%: {Math.round(props.weight * 0.9)}</Text>
                </View>
            </View>

            <View style={styles.buttonView} >
                <Button title="Delete" onPress={ () => props.onDelete(props.id) } />
            </View>
        </View>
    );
};

export default ExerciseLineItem;

// =================================================================================================
// Stylesheet
// =================================================================================================
const styles = StyleSheet.create({
    containerView: {
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
        justifyContent: "flex-end"
    }
});
