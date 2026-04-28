// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import Title from "../components/Title.js";

// =================================================================================================
// Page
// =================================================================================================
const LandingPage = (props) => {
    // JSX =========================================================================================
    return(
        <View style={styles.screen} >
            <View style={styles.contentContainer}>
                <View style={styles.head} >
                    <Title />
                </View>

                <View style={styles.body} >
                    <FitnessTrackerButton 
                        style={pageStyles.landingPageButton}
                        title="Inputs"
                        onPress={ () => props.onNavigate("InputsPage") }
                    />

                    <FitnessTrackerButton
                        style={pageStyles.landingPageButton}
                        title="Outputs"
                        onPress={ () => props.onNavigate("OutputsPage") }
                    />

                    <FitnessTrackerButton
                        style={pageStyles.landingPageButton}
                        title="PRs"
                        onPress={ () => props.onNavigate("PRsPage") }
                    />

                    <FitnessTrackerButton
                        style={pageStyles.landingPageButton}
                        title="Workouts"
                        onPress={ () => props.onNavigate("WorkoutsPage") }
                    />
                </View>
            </View>
        </View>
    );
};

export default LandingPage;

// =================================================================================================
// Stylesheet
// =================================================================================================
const pageStyles = StyleSheet.create({
    landingPageButton: {
        width: "80%"
    }
});
