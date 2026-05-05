// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
import validation from "../services/validation.js";

// =================================================================================================
// Page
// =================================================================================================
const OutputsPage = (props) => {
    // State =======================================================================================
    const [ targetWeight, setTargetWeight ] = useState(null);
    const [ totalDailyEnergyExpenditure, setTotalDailyEnergyExpenditure ] = useState(null);
    const [ dailyCaloriesForCut, setDailyCaloriesForCut ] = useState(null);
    const [ dailyCaloriesForBulk, setDailyCaloriesForBulk ] = useState(null);
    const [ proteinInGrams, setProteinInGrams ] = useState(null);
    const [ proteinPercentageForCut, setProteinPercentageForCut ] = useState(null);
    const [ proteinPercentageForMaintenance, setProteinPercentageForMaintenance ] = useState(null);
    const [ proteinPercentageForBulk, setProteinPercentageForBulk ] = useState(null);
    const [ fatInGrams, setFatInGrams ] = useState(null);
    const [ fatPercentageForCut, setFatPercentageForCut ] = useState(null);
    const [ fatPercentageForMaintenance, setFatPercentageForMaintenance ] = useState(null);
    const [ fatPercentageForBulk, setFatPercentageForBulk ] = useState(null);
    const [ carbsPercentageForCut, setCarbsPercentageForCut ] = useState(null);
    const [ carbsPercentageForMaintenance, setCarbsPercentageForMaintenance ] = useState(null);
    const [ carbsPercentageForBulk, setCarbsPercentageForBulk ] = useState(null);
    const [ errorMessage, setErrorMessage ]  = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect(() => {
        const load = async () => {
            const storedInputs = {};

            try {
                storedInputs.bodyWeight = await storage.getItem("bodyWeight");
                storedInputs.targetLeanMass = await storage.getItem("targetLeanMass");
                storedInputs.targetBodyFatPercentage = await storage.getItem("targetBodyFatPercentage");
                storedInputs.leanMass = await storage.getItem("leanMass");
                storedInputs.boneMass = await storage.getItem("boneMass");
                storedInputs.restingMetabolicRate = await storage.getItem("restingMetabolicRate");
                storedInputs.activityLevel = await storage.getItem("activityLevel");
            } catch (error) {
                setErrorMessage("Data retrieval error.");
                setLoading(false);

                return;
            }

            if (!validation.inputsAreValid(storedInputs)) {
                setErrorMessage("Complete inputs to view outputs.");
                setLoading(false);

                return;
            }

            const targetWeight =
                formulas.targetWeight(
                    storedInputs.targetBodyFatPercentage,
                    storedInputs.targetLeanMass,
                    storedInputs.boneMass
                );
            
            const totalDailyEnergyExpenditure =
                formulas.totalDailyEnergyExpenditure(
                    storedInputs.restingMetabolicRate, storedInputs.activityLevel
                );
            
            const dailyCaloriesForCut =
                formulas.dailyCaloriesForCut(
                    storedInputs.bodyWeight, totalDailyEnergyExpenditure
                );
            
            const dailyCaloriesForBulk =
                formulas.dailyCaloriesForBulk(
                    storedInputs.bodyWeight, totalDailyEnergyExpenditure
                );
            
            const proteinInGrams = formulas.proteinInGrams(storedInputs.leanMass);

            const proteinPercentageForCut =
                formulas.proteinPercentage( proteinInGrams, dailyCaloriesForCut );
            
            const proteinPercentageForMaintenance =
                formulas.proteinPercentage( proteinInGrams, totalDailyEnergyExpenditure );
            
            const proteinPercentageForBulk =
                formulas.proteinPercentage( proteinInGrams, dailyCaloriesForBulk );
            
            const fatInGrams = formulas.fatInGrams(targetWeight);
            const fatPercentageForCut = formulas.fatPercentage( fatInGrams, dailyCaloriesForCut );

            const fatPercentageForMaintenance =
                formulas.fatPercentage( fatInGrams, totalDailyEnergyExpenditure );
            
            const fatPercentageForBulk = formulas.fatPercentage( fatInGrams, dailyCaloriesForBulk );

            const carbsPercentageForCut =
                formulas.carbsPercentage( proteinPercentageForCut, fatPercentageForCut );
            
            const carbsPercentageForMaintenance =
                formulas.carbsPercentage(
                    proteinPercentageForMaintenance, fatPercentageForMaintenance
                );
            
            const carbsPercentageForBulk =
                formulas.carbsPercentage( proteinPercentageForBulk, fatPercentageForBulk );
            
            setTargetWeight(targetWeight);
            setTotalDailyEnergyExpenditure(totalDailyEnergyExpenditure);
            setDailyCaloriesForCut(dailyCaloriesForCut);
            setDailyCaloriesForBulk(dailyCaloriesForBulk);
            setProteinInGrams(proteinInGrams);
            setProteinPercentageForCut(proteinPercentageForCut);
            setProteinPercentageForMaintenance(proteinPercentageForMaintenance);
            setProteinPercentageForBulk(proteinPercentageForBulk);
            setFatInGrams(fatInGrams);
            setFatPercentageForCut(fatPercentageForCut);
            setFatPercentageForMaintenance(fatPercentageForMaintenance);
            setFatPercentageForBulk(fatPercentageForBulk);
            setCarbsPercentageForCut(carbsPercentageForCut);
            setCarbsPercentageForMaintenance(carbsPercentageForMaintenance);
            setCarbsPercentageForBulk(carbsPercentageForBulk);

            setLoading(false);
        };

        load();
    }, []);

    // JSX =========================================================================================
    if (loading) {
        return <LoadingPage />;
    }

    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={props.onNavigate} />;
    }
    
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

                        <Text style={[ pageStyles.subHeadings, styles.h3 ]}>Cut</Text>
                        <OutputLineItem name="Daily Calories: " data={dailyCaloriesForCut} />

                        <OutputLineItem
                            name="Protein: "
                            data={proteinInGrams + " grams (" + proteinPercentageForCut + "%)"}
                        />

                        <OutputLineItem
                            name="Fat: "
                            data={fatInGrams + " grams (" + fatPercentageForCut + "%)"}
                        />

                        <OutputLineItem name="Carbs: " data={carbsPercentageForCut + "%"} />
                        
                        <Text style={[ pageStyles.subHeadings, styles.h3 ]}>Maintain</Text>

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

                        <Text style={[ pageStyles.subHeadings, styles.h3 ]}>Bulk</Text>
                        <OutputLineItem name="Daily Calories: " data={dailyCaloriesForBulk} />

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
                        title="Back" onPress={() => props.onNavigate("LandingPage")}
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
const pageStyles = StyleSheet.create({
    subHeadings: {
        alignSelf: "flex-start"
    }
});
