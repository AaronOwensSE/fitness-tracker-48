// External Dependencies
import { StyleSheet, Text, TextInput, View } from "react-native";

// Component
const LabeledTextInput = (props) => {
    return (
        <View>
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
    textInput: {
        backgroundColor: "lightgrey",
    }
});
