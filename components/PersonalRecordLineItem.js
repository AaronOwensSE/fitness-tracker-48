// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
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
    // State =======================================================================================
    const [ flash, setFlash ] = useState(false);

    // Handlers ====================================================================================
    const handlePress = () => {
        props.onUpdate(props.name, props.weight);
    };

    // JSX =========================================================================================
    return(
        <View style={[
            componentStyles.containerView, props.style, flash && componentStyles.flashContainerView
        ]}>
            <View style={componentStyles.dataView}>
                <LabeledTextInput
                    label={props.name}
                    value={props.weight}
                    keyboardType="decimal-pad"
                    onChangeText={props.onChangeText}
                />
            </View>
            
            <View style={componentStyles.buttonsView}>
                <FitnessTrackerButton 
                    title="Update"
                    onPress={handlePress}
                    onPressIn={() => setFlash(true)}
                    onPressOut={() => setFlash(false)}
                />

                <FitnessTrackerButton title="Delete" onPress={() => props.onDelete(props.name)} />
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
        margin: 5,
        flex: 1,
        flexDirection: "row"
    },

    flashContainerView: {
        backgroundColor: "beige"
    },

    dataView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start"
    },

    buttonsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
});
