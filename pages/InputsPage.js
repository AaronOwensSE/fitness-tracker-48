// External Dependencies
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Internal Dependencies
import ErrorMessagePage from "./ErrorMessagePage.js";
import LoadingPage from "./LoadingPage.js";
import LabeledTextInput from "../components/LabeledTextInput.js";
import storage from "../services/storage.js";

// Page
const InputsPage = (props) => {
    const [ rmr, setRmr ] = useState(null);
    const [ leanMass, setLeanMass ] = useState(null);
    const [ boneMass, setBoneMass ] = useState(null);
    const [ targetBodyFatPercentage, setTargetBodyFatPercentage ] = useState(null);
    const [ plan, setPlan ] = useState(null);
    const [ activityLevel, setActivityLevel ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        const load = async () => {
            try {
                setRmr(await storage.getItem("rmr"));
                setLeanMass(await storage.getItem("leanMass"));
                setBoneMass(await storage.getItem("boneMass"));
                setTargetBodyFatPercentage(await storage.getItem("targetBodyFatPercentage"));
                setPlan(await storage.getItem("plan"));
                setActivityLevel(await storage.getItem("activityLevel"));
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

    const update = async () => {
        try {
            await storage.setItem("rmr", Number(rmr));
            await storage.setItem("leanMass", Number(leanMass));
            await storage.setItem("boneMass", Number(boneMass));
            await storage.setItem("targetBodyFatPercentage", Number(targetBodyFatPercentage));
            await storage.setItem("plan", plan);
            await storage.setItem("activityLevel", Number(activityLevel));
        } catch (error) {
            setErrorMessage("Data storage error.");
        }
    };

    if (loading) {
        return <LoadingPage />;
    }

    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }

    return(
        <View style={styles.containerView}>
            <Text>Inputs</Text>

            <View style={styles.inputFieldsView}>
                <LabeledTextInput
                    label="RMR (calories)" value={ String(rmr) } onChangeText={setRmr}
                />

                <LabeledTextInput
                    label="Lean Mass (pounds)" value={ String(leanMass) } onChangeText={setLeanMass}
                />

                <LabeledTextInput
                    label="Bone Mass (pounds)" value={ String(boneMass) } onChangeText={setBoneMass}
                />

                <LabeledTextInput
                    label="Target Body Fat %"
                    value={ String(targetBodyFatPercentage) }
                    onChangeText={setTargetBodyFatPercentage}
                />

                <LabeledTextInput label="Plan" value={plan} onChangeText={setPlan} />

                <LabeledTextInput
                    label="Activity Level"
                    value={ String(activityLevel) }
                    onChangeText={setActivityLevel}
                />
            </View>

            <Button title="Update" onPress={update} />
            <Button title="Back" onPress={ () => { props.onNavigate("LandingPage"); } } />
        </View>
    );
};

export default InputsPage;

// Stylesheet
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 51,
        marginBottom: 51,
        justifyContent: "center",
        alignItems: "center",
    },

    inputFieldsView: {
        width: "80%",
    }
});
