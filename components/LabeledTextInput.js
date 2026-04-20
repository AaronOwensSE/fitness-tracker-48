// External Dependencies
import { StyleSheet, Text, TextInput, View } from "react-native";

// Component
const LabeledTextInput = (props) => {
    return (
        <View style={styles.containerView}>
            <Text>{props.label}</Text>
            <TextInput
                style={styles.textInput} value={props.value} onChangeText={props.onChangeText}
            />
        </View>
    );
};

export default LabeledTextInput;

// Stylesheet
const styles = StyleSheet.create({
    containerView: {
        width: "100%"
    },

    textInput: {
        backgroundColor: "lightgrey"
    }
});
