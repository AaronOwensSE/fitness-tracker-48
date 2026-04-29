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

// =================================================================================================
// Page
// =================================================================================================
const PersonalRecordsPage = (props) => {
    // State =======================================================================================
    const [ personalRecords, setPersonalRecords ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                setPersonalRecords(await database.readPersonalRecords());
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

    // Handlers ====================================================================================
    const handleChangeText = (index, text) => {
        // State is immutable. We cannot modify prs directly, so we copy both the array and the
        // object in question so that we are not modifying a reference at any point.
        const updatedPersonalRecords = [...personalRecords];
        updatedPersonalRecords[index] = { ...updatedPersonalRecords[index], weight: text };
        setPersonalRecords(updatedPersonalRecords);
    };

    const handleUpdatePersonalRecord = async (name, weight) => {
        try {
            await database.updatePersonalRecord(name, weight);
        } catch (error) {
            setErrorMessage("Data storage error.");
        }
    };

    const handleDeletePersonalRecord = async (name) => {
        // Again, state is immutable. We create a copy of prs with the deleted item absent.
        const updatedPRs = personalRecords.filter(personalRecord => personalRecord.name !== name);
        setPersonalRecords(updatedPRs);

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
        <View style={styles.screen} >
            <View style={styles.contentContainer} >
                <View style={styles.head}>
                    <Title />
                </View>

                <View style={styles.body} >
                    <Text style={styles.h2}>Personal Records</Text>

                    <View style={styles.scrollViewContainer}>
                        <ScrollView>
                            {personalRecords.map(
                                (personalRecord, index) => <PersonalRecordLineItem 
                                    key={personalRecord.name}
                                    name={personalRecord.name}
                                    weight={personalRecord.weight}
                                    onChangeText={(text) => handleChangeText(index, text)}
                                    onUpdate={handleUpdatePersonalRecord}
                                    onDelete={handleDeletePersonalRecord}
                                />
                            )}
                        </ScrollView>
                    </View>

                    <FitnessTrackerButton
                        title="Add Personal Record"
                        onPress={ () => props.onNavigate("AddPersonalRecordPage") }
                    />

                    <FitnessTrackerButton
                        title="Back" onPress={ () => props.onNavigate("LandingPage") }
                    />
                </View>
            </View>
        </View>
    );
};

export default PersonalRecordsPage;
