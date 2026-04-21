// External Dependencies
import { Button, StyleSheet, Text, View } from "react-native";

// Page
const ErrorMessagePage = (props) => {
    <View style={styles.containerView}>
        <Text>{props.errorMessage}</Text>
        <Button title="Back" onPress={ () => { props.onNavigate("LandingPage"); } } />
    </View>
};

export default ErrorMessagePage;

// Stylesheet
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
