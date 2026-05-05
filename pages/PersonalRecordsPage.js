// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import ErrorMessagePage from "./ErrorMessagePage.js";
import LoadingPage from "./LoadingPage.js";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import PersonalRecordLineItem from "../components/PersonalRecordLineItem.js";
import Title from "../components/Title.js";
import database from "../services/database.js";
import validation from "../services/validation.js";

// =================================================================================================
// Page
// =================================================================================================
const PersonalRecordsPage = (props) => {
    // State =======================================================================================
    const [ personalRecordsText, setPersonalRecordsText ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect(() => {
        const load = async () => {
            let personalRecords;

            try {
                personalRecords = await database.readPersonalRecords();
            } catch (error) {
                setErrorMessage("Data retrieval error.");
                setLoading(false);

                return;
            }

            const personalRecordsConversion = [...personalRecords];

            for (let i = 0; i < personalRecordsConversion.length; i++) {
                personalRecordsConversion[i].weight = String(personalRecords[i].weight);
            }

            setPersonalRecordsText(personalRecordsConversion);
            setLoading(false);
        };

        load();
    }, []);

    // Handlers ====================================================================================
    const handleChangeText = ( index, text ) => {
        // State is immutable. We cannot modify PRs directly, so we copy both the array and the
        // object in question so that we are not modifying a reference at any point.
        const updatedPersonalRecordsText = [...personalRecordsText];
        updatedPersonalRecordsText[index] = { ...updatedPersonalRecordsText[index], weight: text };
        setPersonalRecordsText(updatedPersonalRecordsText);
    };

    const handleUpdatePersonalRecord = async ( name, weightText ) => {
        const weight = Number(weightText);

        if (!validation.isValidPersonalRecordWeight(weight)) {
            setErrorMessage("Invalid personal record.");

            return;
        }

        try {
            await database.updatePersonalRecord( name, weight );
        } catch (error) {
            setErrorMessage("Data storage error.");
        }
    };

    const handleDeletePersonalRecord = async (name) => {
        // Again, state is immutable. We create a copy of prs with the deleted item absent.
        const updatedPersonalRecordsText =
            personalRecordsText.filter(personalRecordText => personalRecordText.name !== name);
        
        setPersonalRecordsText(updatedPersonalRecordsText);

        try {
            await database.deletePersonalRecord(name);
        } catch (error) {
            setErrorMessage("Data deletion error.");
        }
    };

    // JSX =========================================================================================
    if (loading) {
        return <LoadingPage />;
    }

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
                    <Text style={styles.h2}>Personal Records</Text>

                    <View style={styles.scrollViewContainer}>
                        <ScrollView>
                            {personalRecordsText.map(
                                ( personalRecordText, index ) => <PersonalRecordLineItem 
                                    key={personalRecordText.name}
                                    name={personalRecordText.name}
                                    weight={personalRecordText.weight}
                                    onChangeText={(text) => handleChangeText( index, text )}
                                    onUpdate={handleUpdatePersonalRecord}
                                    onDelete={handleDeletePersonalRecord}
                                />
                            )}
                        </ScrollView>
                    </View>

                    <FitnessTrackerButton
                        title="Add Personal Record"
                        onPress={() => props.onNavigate("AddPersonalRecordPage")}
                    />

                    <FitnessTrackerButton
                        title="Back" onPress={() => props.onNavigate("LandingPage")}
                    />
                </View>
            </View>
        </View>
    );
};

export default PersonalRecordsPage;
