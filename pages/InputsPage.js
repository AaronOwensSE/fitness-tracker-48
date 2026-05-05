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
import LabeledTextInput from "../components/LabeledTextInput.js";
import Title from "../components/Title.js";
import storage from "../services/storage.js";
import validation from "../services/validation.js";

// =================================================================================================
// Page
// =================================================================================================
const InputsPage = (props) => {
    // State =======================================================================================
    const [ bodyWeightText, setBodyWeightText ] = useState("");
    const [ restingMetabolicRateText, setRestingMetabolicRateText ] = useState("");
    const [ leanMassText, setLeanMassText ] = useState("");
    const [ boneMassText, setBoneMassText ] = useState("");
    const [ targetLeanMassText, setTargetLeanMassText ] = useState("");
    const [ targetBodyFatPercentageText, setTargetBodyFatPercentageText ] = useState("");
    const [ activityLevelText, setActivityLevelText ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect(() => {
        const load = async () => {
            const storedInputs = {};

            try {
                storedInputs.bodyWeight = await storage.getItem("bodyWeight");
                storedInputs.restingMetabolicRate = await storage.getItem("restingMetabolicRate");
                storedInputs.leanMass = await storage.getItem("leanMass");
                storedInputs.boneMass = await storage.getItem("boneMass");
                storedInputs.targetLeanMass = await storage.getItem("targetLeanMass");

                storedInputs.targetBodyFatPercentage =
                    await storage.getItem("targetBodyFatPercentage");

                storedInputs.activityLevel = await storage.getItem("activityLevel");
            } catch (error) {
                setErrorMessage("Data retrieval error.");
                setLoading(false);

                return;
            }

            if (storedInputs.bodyWeight !== null) {
                setBodyWeightText(String(storedInputs.bodyWeight));
            }

            if (storedInputs.restingMetabolicRate !== null) {
                setRestingMetabolicRateText(String(storedInputs.restingMetabolicRate));
            }

            if (storedInputs.leanMass !== null) {
                setLeanMassText(String(storedInputs.leanMass));
            }

            if (storedInputs.boneMass !== null) {
                setBoneMassText(String(storedInputs.boneMass));
            }

            if (storedInputs.targetLeanMass !== null) {
                setTargetLeanMassText(String(storedInputs.targetLeanMass));
            }

            if (storedInputs.targetBodyFatPercentage !== null) {
                setTargetBodyFatPercentageText(String(storedInputs.targetBodyFatPercentage));
            }

            if (storedInputs.activityLevel !== null) {
                setActivityLevelText(String(storedInputs.activityLevel));
            }

            setLoading(false);
        };

        load();
    }, []);

    // Handlers ====================================================================================
    const handleUpdateInputs = async () => {
        const inputsToBeStored = {
            bodyWeight: Number(bodyWeightText),
            restingMetabolicRate: Number(restingMetabolicRateText),
            leanMass: Number(leanMassText),
            boneMass: Number(boneMassText),
            targetLeanMass: Number(targetLeanMassText),
            targetBodyFatPercentage: Number(targetBodyFatPercentageText),
            activityLevel: Number(activityLevelText)
        };

        if (!validation.inputsAreValid(inputsToBeStored)) {
            setErrorMessage("Invalid inputs.");

            return;
        }

        try {
            await storage.setItem( "bodyWeight", inputsToBeStored.bodyWeight );
            await storage.setItem( "restingMetabolicRate", inputsToBeStored.restingMetabolicRate );
            await storage.setItem( "leanMass", inputsToBeStored.leanMass );
            await storage.setItem( "boneMass", inputsToBeStored.boneMass );
            await storage.setItem( "targetLeanMass", inputsToBeStored.targetLeanMass );

            await storage.setItem(
                "targetBodyFatPercentage", inputsToBeStored.targetBodyFatPercentage
            );

            await storage.setItem( "activityLevel", inputsToBeStored.activityLevel );

            props.onNavigate("LandingPage");
        } catch (error) {
            setErrorMessage("Data storage error.");
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
                    <Text style={styles.h2}>Inputs</Text>

                    <View style={styles.centeredView}>
                        <LabeledTextInput
                            label="Body Weight (Pounds)"
                            value={bodyWeightText}
                            keyboardType="decimal-pad"
                            onChangeText={setBodyWeightText}
                        />

                        <LabeledTextInput
                            label="Resting Metabolic Rate (Calories)"
                            value={restingMetabolicRateText}
                            keyboardType="decimal-pad"
                            onChangeText={setRestingMetabolicRateText}
                        />

                        <LabeledTextInput
                            label="Lean Mass (Pounds)"
                            value={leanMassText}
                            keyboardType="decimal-pad"
                            onChangeText={setLeanMassText}
                        />

                        <LabeledTextInput
                            label="Bone Mass (Pounds)"
                            value={boneMassText}
                            keyboardType="decimal-pad"
                            onChangeText={setBoneMassText}
                        />

                        <LabeledTextInput
                            label="Target Lean Mass (Pounds)"
                            value={targetLeanMassText}
                            keyboardType="decimal-pad"
                            onChangeText={setTargetLeanMassText}
                        />

                        <LabeledTextInput
                            label="Target Body Fat %"
                            value={targetBodyFatPercentageText}
                            keyboardType="decimal-pad"
                            onChangeText={setTargetBodyFatPercentageText}
                        />

                        <LabeledTextInput
                            label="Activity Level (Typically 1.2 to 1.9)"
                            value={activityLevelText}
                            keyboardType="decimal-pad"
                            onChangeText={setActivityLevelText}
                        />
                    </View>

                    <FitnessTrackerButton title="Update" onPress={handleUpdateInputs} />
                    
                    <FitnessTrackerButton
                        title="Back" onPress={() => props.onNavigate("LandingPage")}
                    />
                </View>
            </View>
        </View>
    );
};

export default InputsPage;
