// External Dependencies
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Internal Dependencies
import LoadingPage from "./LoadingPage.js";
import formulas from "../services/formulas.js";
import storage from "../services/storage.js";

// Page
const OutputsPage = (props) => {
    const [ targetBodyFatPercentage, setTargetBodyFatPercentage ] = useState(null);
    const [ leanMass, setLeanMass ] = useState(null);
    const [ boneMass, setBoneMass ] = useState(null);
    const [ rmr, setRmr ] = useState(null);
    const [ activityLevel, setActivityLevel ] = useState(null);
    const [ plan, setPlan ] = useState(null);
    const [ errorMessage, setErrorMessage ]  = useState(null);
    const [ loading, setLoading ] = useState(true);

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

    if (loading) {
        return <LoadingPage />;
    }

    if (errorMessage !== null) {
        return(
            <View style={styles.containerView}>
                <Text>{errorMessage}</Text>
                <Button title="Back" onPress={ () => { props.onNavigate("LandingPage"); } } />
            </View>
        );
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
            <View>
                <Text>Target Weight (pounds): {targetWeight}</Text>
                <Text>TDEE (calories): {tdee}</Text>
                <Text>Daily Calories: {dailyCalories}</Text>
                <Text>Protein (grams): {proteinInGrams}</Text>
                <Text>Protein %: {proteinPercentage}</Text>
                <Text>Fat (grams): {fatInGrams}</Text>
                <Text>Fat %: {fatPercentage}</Text>
                <Text>Carbs %: {carbsPercentage}</Text>
                <Button title="Back" onPress={ () => { props.onNavigate("LandingPage"); } } />
            </View>
        </View>
    );
};

export default OutputsPage;

// Stylesheet
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "white",
        marginTop: "51px",
        justifyContent: "center",
        alignItems: "center"
    },

    outputsView: {
        width: "80%"
    }
});
