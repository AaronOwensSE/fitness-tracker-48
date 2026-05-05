// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet, Text, TextInput, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";

// =================================================================================================
// Component
// =================================================================================================
const LabeledTextInput = (props) => {
    // JSX =========================================================================================
    return (
        <View style={[ props.style, componentStyles.container ]}>
            <Text style={styles.text}>{props.label}</Text>
            
            <TextInput
                style={componentStyles.textInput}
                value={props.value}
                keyboardType={props.keyboardType}
                returnKeyType="done"
                onChangeText={props.onChangeText}
            />
        </View>
    );
};

export default LabeledTextInput;

// =================================================================================================
// Stylesheet
// =================================================================================================
const componentStyles = StyleSheet.create({
    container: {
        margin: 5,
        width: "100%"
    },

    textInput: {
        backgroundColor: "beige",
        color: "darkblue"
    }
});
