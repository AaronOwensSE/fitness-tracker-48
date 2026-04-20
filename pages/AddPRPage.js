// External Dependencies
import { Button, StyleSheet, Text, View } from "react-native";

// Internal Dependencies
import LabeledTextInput from "../components/LabeledTextInput";

// PR
// name
// weight
// Add -> Add PR and return to PRs Page
// Back -> PRs Page

// Page
const AddPRPage = (props) => {
    return(
        <View style={styles.containerView}>
            <Text>Add PR</Text>

            <View style={styles.inputFieldsView}>
                <LabeledTextInput label="Name" style={styles.textInput} />
                <LabeledTextInput label="Weight" style={styles.textInput} />
            </View>

            <Button title="Add" onPress={ () => { props.onNavigate("PRsPage"); } } />
            <Button title="Back" onPress={ () => { props.onNavigate("PRsPage"); } } />
        </View>
    );
};

export default AddPRPage;

// Stylesheet
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 51,
        marginBottom: 51,
        justifyContent: "center",
        alignItems: "center"
    },

    inputFieldsView: {
        width: "80%"
    }
});
