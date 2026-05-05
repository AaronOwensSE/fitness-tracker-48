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
import validation from "../services/validation.js";

// =================================================================================================
// Page
// =================================================================================================
const AddPersonalRecordPage = (props) => {
    // State =======================================================================================
    const [ name, setName ] = useState(null);
    const [ weightText, setWeightText ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Handlers ====================================================================================
    const handleAddPersonalRecord = async () => {
        const personalRecord = {
            name: name,
            weight: Number(weightText)
        };

        if (!validation.isValidPersonalRecord(personalRecord)) {
            setErrorMessage("Invalid personal record.");

            return;
        }

        try {
            await database.createPersonalRecord(personalRecord.name, personalRecord.weight);
        } catch (error) {
            setErrorMessage("Data storage error.");

            return;
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
                        <LabeledTextInput
                            label="Name" keyboardType="default" onChangeText={setName}
                        />

                        <LabeledTextInput
                            label="Weight" keyboardType="decimal-pad" onChangeText={setWeightText}
                        />
                    </View>

                    <FitnessTrackerButton title="Add" onPress={handleAddPersonalRecord} />

                    <FitnessTrackerButton
                        title="Back" onPress={() => props.onNavigate("PersonalRecordsPage")}
                    />
                </View>
            </View>
        </View>
    );
};

export default AddPersonalRecordPage;
