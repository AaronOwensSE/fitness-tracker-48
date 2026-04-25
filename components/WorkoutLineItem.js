// =================================================================================================
// External Dependencies
// =================================================================================================
import { Button, StyleSheet, View } from "react-native";

// =================================================================================================
// Component
// =================================================================================================
const WorkoutLineItem = (props) => {
    // JSX =========================================================================================
    return(
        <View style={styles.containerView} >
            <View style={styles.workoutLinkView}>
                <Button
                    title={props.name}
                    onPress={ () => props.onNavigate("WorkoutPage", props.id) }
                />
            </View>

            <View style={styles.buttonView}>
                <Button title="Delete" onPress={ () => props.onDelete(props.id) } />
            </View>
        </View>
    );
};

export default WorkoutLineItem;

// =================================================================================================
// Stylesheet
// =================================================================================================
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: "row"
    },

    workoutLinkView: {
        flex: 1,
        alignItems: "flex-start"
    },

    buttonView: {
        flex: 1,
        alignItems: "flex-end"
    }
});
