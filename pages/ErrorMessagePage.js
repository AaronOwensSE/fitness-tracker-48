// =================================================================================================
// External Dependencies
// =================================================================================================
import { Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import Title from "../components/Title.js";

// =================================================================================================
// Page
// =================================================================================================
const ErrorMessagePage = (props) => {
    // JSX =========================================================================================
    return(
        <View style={styles.screen} >
            <View style={styles.contentContainer} >
                <View style={styles.head} >
                    <Title />
                </View>

                <View style={styles.body} >
                    <Text style={styles.text} >{props.errorMessage + "\n"}</Text>

                    <FitnessTrackerButton 
                        style={styles.fitnessTrackerButton}
                        title="Back"
                        onPress={ () => props.onNavigate("LandingPage") }
                    />
                </View>
            </View>
        </View>
    );
};

export default ErrorMessagePage;
