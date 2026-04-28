// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import styles from "../styles.js";
import ErrorMessagePage from "./ErrorMessagePage.js";
import LoadingPage from "./LoadingPage.js";
import FitnessTrackerButton from "../components/FitnessTrackerButton.js";
import OutputLineItem from "../components/OutputLineItem.js";
import Title from "../components/Title.js";
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
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.head}>
                    <Title />
                </View>

                <View style={styles.body}>
                    <Text style={styles.h2}>Outputs</Text>

                    <View style={styles.centeredView}>
                        <OutputLineItem name="Target Weight: " data={targetWeight + " pounds"} />
                        <OutputLineItem
                            name="Total Daily Energy Expenditure: "
                            data={totalDailyEnergyExpenditure + " calories"}
                        />

                        <Text style={styles.h3}>Cut</Text>
                        <OutputLineItem name="Daily Calories: " data={dailyCutCalories} />
                        <OutputLineItem
                            name="Protein: "
                            data={proteinInGrams + " grams (" + proteinPercentageForCut + "%)"}
                        />
                        <OutputLineItem
                            name="Fat: "
                            data={fatInGrams + " grams (" + fatPercentageForCut + "%)"}
                        />
                        <OutputLineItem name="Carbs: " data={carbsPercentageForCut + "%"} />
                        
                        <Text style={styles.h3}>Maintain</Text>
                        <OutputLineItem
                            name="Daily Calories: "
                            data={totalDailyEnergyExpenditure}
                        />
                        <OutputLineItem
                            name="Protein: "
                            data={proteinInGrams
                                + " grams ("
                                + proteinPercentageForMaintenance
                                + "%)"
                            }
                        />
                        <OutputLineItem
                            name="Fat: "
                            data={fatInGrams + " grams (" + fatPercentageForMaintenance + "%)"}
                        />
                        <OutputLineItem name="Carbs: " data={carbsPercentageForMaintenance + "%"} />

                        <Text style={styles.h3}>Bulk</Text>
                        <OutputLineItem name="Daily Calories: " data={dailyBulkCalories} />
                        <OutputLineItem
                            name="Protein: "
                            data={proteinInGrams
                                + " grams ("
                                + proteinPercentageForBulk
                                + "%)"
                            }
                        />
                        <OutputLineItem
                            name="Fat: "
                            data={fatInGrams + " grams (" + fatPercentageForBulk + "%)"}
                        />
                        <OutputLineItem name="Carbs: " data={carbsPercentageForBulk + "%"} />
                    </View>

                    <FitnessTrackerButton
                        title="Back" onPress={ () => props.onNavigate("LandingPage") }
                    />
                </View>
            </View>
        </View>
    );
};

export default OutputsPage;

// =================================================================================================
// Stylesheet
// =================================================================================================
/*const pageStyles = StyleSheet.create({
    outputsView: {
        width: "80%",
        alignItems: "flex-start"
    }
});*/

/*

<Text style={styles.text}>Target Weight: {targetWeight} pounds</Text>
                        <Text style={styles.text}>
                            Total Daily Energy Expenditure: {totalDailyEnergyExpenditure} calories
                        </Text>

                        <Text style={styles.h3}>Cut</Text>
                        <Text style={styles.text}>Daily Calories: {dailyCutCalories}</Text>
                        <Text style={styles.text}>
                            Protein: {proteinInGrams} grams ({proteinPercentageForCut}%)
                        </Text>
                        <Text style={styles.text}>
                            Fat: {fatInGrams} grams ({fatPercentageForCut}%)
                        </Text>
                        <Text style={styles.text}>Carbs: {carbsPercentageForCut}%</Text>

                        <Text style={styles.h3}>Maintain</Text>
                        <Text style={styles.text}>
                            Daily Calories: {totalDailyEnergyExpenditure}
                        </Text>
                        <Text style={styles.text}>
                            Protein: {proteinInGrams} grams ({proteinPercentageForMaintenance}%)
                        </Text>
                        <Text style={styles.text}>
                            Fat: {fatInGrams} grams ({fatPercentageForMaintenance}%)
                        </Text>
                        <Text style={styles.text}>Carbs: {carbsPercentageForMaintenance}%</Text>

                        <Text style={styles.h3}>Bulk</Text>
                        <Text style={styles.text}>Daily Calories: {dailyBulkCalories}</Text>
                        <Text style={styles.text}>
                            Protein: {proteinInGrams} grams ({proteinPercentageForBulk}%)
                        </Text>
                        <Text style={styles.text}>
                            Fat: {fatInGrams} grams ({fatPercentageForBulk}%)
                        </Text>
                        <Text style={styles.text}>Carbs: {carbsPercentageForBulk}%</Text>

*/