// =================================================================================================
// External Dependencies
// =================================================================================================
import { Button, StyleSheet, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import LabeledTextInput from "./LabeledTextInput";

// =================================================================================================
// Component
// =================================================================================================
const PRLineItem = (props) => {
    // JSX =========================================================================================
    return(
        <View style={styles.containerView}>
            <View style={styles.dataView}>
                <LabeledTextInput
                    label={props.name}
                    value={ String(props.weight) }
                    onChangeText={props.onChangeText}
                />
            </View>
            
            <View style={styles.buttonsView}>
                <Button 
                    title="Update" onPress={ () => props.onUpdate(props.name, props.weight) }
                />

                <Button title="Delete" onPress={ () => props.onDelete(props.name) } />
            </View>
        </View>
    );
};

export default PRLineItem;

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

    buttonsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    }
});
