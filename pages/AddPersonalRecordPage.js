// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
import { Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import ErrorMessagePage from "./ErrorMessagePage.js";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import LabeledTextInput from "../components/LabeledTextInput.js";
import Title from "../components/Title.js";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const AddPersonalRecordPage = (props) => {
    // State =======================================================================================
    const [ name, setName ] = useState(null);
    const [ weight, setWeight ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Handlers ====================================================================================
    const handleAddPersonalRecord = async () => {
        try {
            await database.createPersonalRecord(name, weight);
        } catch (error) {
            setErrorMessage("Data storage error.");
        }

        props.onNavigate("PersonalRecordsPage");
    };

    // JSX =========================================================================================
    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }

    return(
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.head}>
                    <Title />
                </View>

                <View style={styles.body}>
                    <Text style={styles.h2}>Add Personal Record</Text>

                    <View style={styles.centeredView}>
                        <LabeledTextInput label="Name" onChangeText={setName} />
                
                        <LabeledTextInput
                            label="Weight" onChangeText={setWeight}
                        />
                    </View>

                    <FitnessTrackerButton title="Add" onPress={handleAddPersonalRecord} />

                    <FitnessTrackerButton
                        title="Back" onPress={ () => props.onNavigate("PersonalRecordsPage") }
                    />
                </View>
            </View>
        </View>
    );
};

export default AddPersonalRecordPage;
