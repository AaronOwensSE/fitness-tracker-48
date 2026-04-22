// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage.js";
import LoadingPage from "./LoadingPage.js";
import PRLineItem from "../components/PRLineItem.js";
import database from "../services/database.js";

// =================================================================================================
// Page
// =================================================================================================
const PRsPage = (props) => {
    // State =======================================================================================
    const [ prs, setPrs ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                setPrs(await database.readPRs());
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

    // Handlers ====================================================================================
    const handleChangeText = (index, text) => {
        // We can't just set updatedPRs = prs or set updatedPRs[index].weight because everything is
        // a reference to prs, and we don't want to modify prs directly. It must be done through
        // setPrs.
        const updatedPRs = [...prs];
        updatedPRs[index] = { ...updatedPRs[index], weight: text };

        setPrs(updatedPRs);
    };

    const handleUpdatePR = async (name, weight) => {
        try {
            await database.updatePR(name, weight);
        } catch (error) {
            setErrorMessage("Data storage error.");
        }
    };

    const handleDeletePR = async (name) => {
        // updatedPRs equals prs with the pr having pr.name of name filtered out.
        const updatedPRs = prs.filter(pr => pr.name !== name);
        setPrs(updatedPRs);

        try {
            await database.deletePR(name);
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
        <View style={styles.containerView}>
            <Text>PRs</Text>

            <View style={styles.scrollViewWrapperView}>
                <ScrollView>
                    {prs.map(
                        (pr, index) => <PRLineItem 
                            key={pr.name}
                            name={pr.name}
                            weight={pr.weight}
                            onChangeText={(text) => handleChangeText(index, text)}
                            onUpdate={handleUpdatePR}
                            onDelete={handleDeletePR}
                        />
                    )}
                </ScrollView>
            </View>

            <Button title="Add PR" onPress={ () => { props.onNavigate("AddPRPage"); } } />
            <Button title="Back" onPress={ () => { props.onNavigate("LandingPage"); } } />
        </View>
    );  // Can we fix nav?
};

export default PRsPage;

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

    scrollViewWrapperView: {
        width: "80%",
        height: "30%",
    }
});
