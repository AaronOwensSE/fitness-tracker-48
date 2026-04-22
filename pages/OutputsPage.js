// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import ErrorMessagePage from "./ErrorMessagePage.js";
import LoadingPage from "./LoadingPage.js";
import formulas from "../services/formulas.js";
import storage from "../services/storage.js";

// =================================================================================================
// Page
// =================================================================================================
const OutputsPage = (props) => {
    // State =======================================================================================
    const [ targetBodyFatPercentage, setTargetBodyFatPercentage ] = useState(null);
    const [ leanMass, setLeanMass ] = useState(null);
    const [ boneMass, setBoneMass ] = useState(null);
    const [ rmr, setRmr ] = useState(null);
    const [ activityLevel, setActivityLevel ] = useState(null);
    const [ plan, setPlan ] = useState(null);
    const [ errorMessage, setErrorMessage ]  = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                setTargetBodyFatPercentage(await storage.getItem("targetBodyFatPercentage"));
                setLeanMass(await storage.getItem("leanMass"));
                setBoneMass(await storage.getItem("boneMass"));
                setRmr(await storage.getItem("rmr"));
                setActivityLevel(await storage.getItem("activityLevel"));
                setPlan(await storage.getItem("plan"));
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

    // JSX =========================================================================================
    if (loading) {
        return <LoadingPage />;
    }

    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }

    const targetWeight = formulas.targetWeight(targetBodyFatPercentage, leanMass, boneMass);
    const tdee = formulas.tdee(rmr, activityLevel);
    const dailyCalories = formulas.dailyCalories(plan, tdee);
    const proteinInGrams = formulas.proteinInGrams(leanMass);
    const proteinPercentage = formulas.proteinPercentage(proteinInGrams, dailyCalories);
    const fatInGrams = formulas.fatInGrams(targetWeight);
    const fatPercentage = formulas.fatPercentage(fatInGrams, dailyCalories);
    const carbsPercentage = formulas.carbsPercentage(proteinPercentage, fatPercentage);

    return (
        <View style={styles.containerView}>
            <Text>Outputs</Text>

            <View style={styles.outputsView}>
                <Text>Target Weight: {targetWeight} pounds</Text>
                <Text>TDEE: {tdee} calories</Text>
                <Text>Daily Calories: {dailyCalories}</Text>
                <Text>Protein: {proteinInGrams} grams ({proteinPercentage}%)</Text>
                <Text>Fat: {fatInGrams} grams ({fatPercentage}%)</Text>
                <Text>Carbs: {carbsPercentage}%</Text>
            </View>

            <Button title="Back" onPress={ () => props.onNavigate("LandingPage") } />
        </View>
    );
};

export default OutputsPage;

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

    outputsView: {
        width: "80%",
        alignItems: "flex-start"
    }
});
