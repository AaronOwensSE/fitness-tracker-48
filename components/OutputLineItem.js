// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";

// =================================================================================================
// Component
// =================================================================================================
const OutputLineItem = (props) => {
    // JSX =========================================================================================
    return(
        <View style={[ props.style, componentStyles.container ]}>
            <View style={componentStyles.column}>
                <Text style={styles.text}>{props.name}</Text>
            </View>

            <View style={componentStyles.column}>
                <Text style={styles.text}>{props.data}</Text>
            </View>
        </View>
    );
};

export default OutputLineItem;

// =================================================================================================
// Stylesheet
// =================================================================================================
const componentStyles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },

    column: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    }
});
