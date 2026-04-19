// External Dependencies
import { Button, StyleSheet, View } from "react-native";

// Page
const LandingPage = (props) => {
    return(
        <View contentContainerStyle={styles.contentContainer}>
            <Button title="Inputs" onPress={ () => { props.onNavigate("InputsPage"); } } />
            <Button title="Outputs" onPress={ () => { props.onNavigate("OutputsPage"); } } />
        </View>
    );
};

export default LandingPage;

// Stylesheet
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "white",
        marginTop: "51px",
        justifyContent: "center",
    }
});
