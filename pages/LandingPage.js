// =================================================================================================
// External Dependencies
// =================================================================================================
import { Button, StyleSheet, View } from "react-native";

// =================================================================================================
// Page
// =================================================================================================
const LandingPage = (props) => {
    // JSX =========================================================================================
    return(
        <View style={styles.containerView}>
            <Button title="Inputs" onPress={ () => props.onNavigate("InputsPage") } />
            <Button title="Outputs" onPress={ () => props.onNavigate("OutputsPage") } />
            <Button title="PRs" onPress={ () => props.onNavigate("PRsPage") } />
        </View>
    );
};

export default LandingPage;

// =================================================================================================
// Stylesheet
// =================================================================================================
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 51,
        marginBottom: 51,
        justifyContent: "center",
        alignItems: "center"
    }
});
