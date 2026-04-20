// External Dependencies
import { Button, StyleSheet, View } from "react-native";

// Internal Dependencies
import LabeledTextInput from "./LabeledTextInput";

// name
// weight
// update -> update
// delete -> delete and refresh PRsPage

// Component
const PRLineItem = (props) => {
    return(
        <View style={styles.containerView}>
            <View style={styles.dataView}>
                <LabeledTextInput label={props.name} value={ String(props.weight) } />
            </View>
            <View style={styles.buttonsView}>
                <Button title="Update" />
                <Button title="Delete" />
            </View>
        </View>
    );
};

export default PRLineItem;

//Stylesheet
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: "row",
    },

    dataView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
    },

    buttonsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    }
});
