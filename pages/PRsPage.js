// External Dependencies
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

// Internal Dependencies
import PRLineItem from "../components/PRLineItem.js";

// Page
const PRsPage = (props) => {
    return(
        <View style={styles.containerView}>
            <Text>PRs</Text>

            <View style={styles.scrollViewWrapperView}>
                <ScrollView>
                    <PRLineItem name="Squat" weight={285} />
                    <PRLineItem name="Deadlift" weight={300} />
                    <PRLineItem name="Press" weight={142.5} />
                    <PRLineItem name="Bench Press" weight={185} />
                </ScrollView>
            </View>

            <Button title="Add PR" onPress={ () => { props.onNavigate("AddPRPage"); } } />
            <Button title="Back" onPress={ () => { props.onNavigate("LandingPage"); } } />
        </View>
    );
};

export default PRsPage;

// Stylesheet
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 51,
        marginBottom: 51,
        justifyContent: "center",
        alignItems: "center"
    },

    scrollViewWrapperView: {
        width: "80%",
        height: "30%",
    }
});
