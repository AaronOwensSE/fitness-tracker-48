// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import FitnessTrackerButton from "./FitnessTrackerButton";
import LabeledTextInput from "./LabeledTextInput";

// =================================================================================================
// Component
// =================================================================================================
const PersonalRecordLineItem = (props) => {
    // JSX =========================================================================================
    return(
        <View style={[ props.style, componentStyles.containerView ]}>
            <View style={componentStyles.dataView}>
                <LabeledTextInput
                    label={props.name}
                    value={ String(props.weight) }
                    onChangeText={props.onChangeText}
                />
            </View>
            
            <View style={componentStyles.buttonsView}>
                <FitnessTrackerButton 
                    title="Update" onPress={ () => props.onUpdate(props.name, props.weight) }
                />

                <FitnessTrackerButton title="Delete" onPress={ () => props.onDelete(props.name) } />
            </View>
        </View>
    );
};

export default PersonalRecordLineItem;

// =================================================================================================
// Stylesheet
// =================================================================================================
const componentStyles = StyleSheet.create({
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
