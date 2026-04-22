// =================================================================================================
// External Dependencies
// =================================================================================================
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage.js";
import LabeledTextInput from "../components/LabeledTextInput";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const AddPRPage = (props) => {
    // State =======================================================================================
    const [ name, setName ] = useState(null);
    const [ weight, setWeight ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Handlers ====================================================================================
    const handleAddPR = async () => {
        try {
            await database.createPR(name, weight);
            props.onNavigate("PRsPage");
        } catch (error) {
            setErrorMessage("Data storage error.");
        }
    };

    // JSX =========================================================================================
    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }

    return(
        <View style={styles.containerView}>
            <Text>Add PR</Text>

            <View style={styles.inputFieldsView}>
                <LabeledTextInput label="Name" style={styles.textInput} onChangeText={setName} />
                
                <LabeledTextInput
                    label="Weight" style={styles.textInput} onChangeText={setWeight}
                />
            </View>

            <Button title="Add" onPress={handleAddPR} />
            <Button title="Back" onPress={ () => props.onNavigate("PRsPage") } />
        </View>
    );
};

export default AddPRPage;

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
