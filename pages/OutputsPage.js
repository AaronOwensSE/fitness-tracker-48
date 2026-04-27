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
    const [ bodyWeight, setBodyWeight ] = useState(null);
    const [ targetLeanMass, setTargetLeanMass ] = useState(null);
    const [ targetBodyFatPercentage, setTargetBodyFatPercentage ] = useState(null);
    const [ leanMass, setLeanMass ] = useState(null);
    const [ boneMass, setBoneMass ] = useState(null);
    const [ restingMetabolicRate, setRestingMetabolicRate ] = useState(null);
    const [ activityLevel, setActivityLevel ] = useState(null);
    const [ errorMessage, setErrorMessage ]  = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                setBodyWeight(await storage.getItem("bodyWeight"));
                setTargetLeanMass(await storage.getItem("targetLeanMass"));
                setTargetBodyFatPercentage(await storage.getItem("targetBodyFatPercentage"));
                setLeanMass(await storage.getItem("leanMass"));
                setBoneMass(await storage.getItem("boneMass"));
                setRestingMetabolicRate(await storage.getItem("restingMetabolicRate"));
                setActivityLevel(await storage.getItem("activityLevel"));
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

    const targetWeight = formulas.targetWeight(targetBodyFatPercentage, targetLeanMass, boneMass);

    const totalDailyEnergyExpenditure =
        formulas.totalDailyEnergyExpenditure(restingMetabolicRate, activityLevel);
    const dailyCutCalories = formulas.dailyCaloriesForCut(bodyWeight, totalDailyEnergyExpenditure);
    const dailyBulkCalories =
        formulas.dailyCaloriesForBulk(bodyWeight, totalDailyEnergyExpenditure);

    const proteinInGrams = formulas.proteinInGrams(leanMass);
    const proteinPercentageForCut = formulas.proteinPercentage(proteinInGrams, dailyCutCalories);
    const proteinPercentageForMaintenance =
        formulas.proteinPercentage(proteinInGrams, totalDailyEnergyExpenditure);
    const proteinPercentageForBulk = formulas.proteinPercentage(proteinInGrams, dailyBulkCalories);

    const fatInGrams = formulas.fatInGrams(targetWeight);
    const fatPercentageForCut = formulas.fatPercentage(fatInGrams, dailyCutCalories);
    const fatPercentageForMaintenance =
        formulas.fatPercentage(fatInGrams, totalDailyEnergyExpenditure);
    const fatPercentageForBulk = formulas.fatPercentage(fatInGrams, dailyBulkCalories);

    const carbsPercentageForCut =
        formulas.carbsPercentage(proteinPercentageForCut, fatPercentageForCut);
    const carbsPercentageForMaintenance =
        formulas.carbsPercentage(
            proteinPercentageForMaintenance, fatPercentageForMaintenance
        );
    const carbsPercentageForBulk =
        formulas.carbsPercentage(proteinPercentageForBulk, fatPercentageForBulk);

    return (
        <View style={styles.containerView}>
            <Text>Outputs</Text>

            <View style={styles.outputsView}>
                <Text>Target Weight: {targetWeight} pounds</Text>
                <Text>Total Daily Energy Expenditure: {totalDailyEnergyExpenditure} calories</Text>

                <Text>Cut</Text>
                <Text>Daily Calories: {dailyCutCalories}</Text>
                <Text>Protein: {proteinInGrams} grams ({proteinPercentageForCut}%)</Text>
                <Text>Fat: {fatInGrams} grams ({fatPercentageForCut}%)</Text>
                <Text>Carbs: {carbsPercentageForCut}%</Text>

                <Text>Maintain</Text>
                <Text>Daily Calories: {totalDailyEnergyExpenditure}</Text>
                <Text>Protein: {proteinInGrams} grams ({proteinPercentageForMaintenance}%)</Text>
                <Text>Fat: {fatInGrams} grams ({fatPercentageForMaintenance}%)</Text>
                <Text>Carbs: {carbsPercentageForMaintenance}%</Text>

                <Text>Bulk</Text>
                <Text>Daily Calories: {dailyBulkCalories}</Text>
                <Text>Protein: {proteinInGrams} grams ({proteinPercentageForBulk}%)</Text>
                <Text>Fat: {fatInGrams} grams ({fatPercentageForBulk}%)</Text>
                <Text>Carbs: {carbsPercentageForBulk}%</Text>
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
