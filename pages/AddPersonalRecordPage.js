// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage.js";
import LabeledTextInput from "../components/LabeledTextInput.js";
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
        <View style={styles.containerView}>
            <Text>Add Personal Record</Text>

            <View style={styles.inputFieldsView}>
                <LabeledTextInput label="Name" onChangeText={setName} />
                
                <LabeledTextInput
                    label="Weight" onChangeText={setWeight}
                />
            </View>

            <Button title="Add" onPress={handleAddPersonalRecord} />
            <Button title="Back" onPress={ () => props.onNavigate("PersonalRecordsPage") } />
        </View>
    );
};

export default AddPersonalRecordPage;

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
    },

    inputFieldsView: {
        width: "80%"
    }
});
