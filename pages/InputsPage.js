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

// =================================================================================================
// Page
// =================================================================================================
const InputsPage = (props) => {
    // State =======================================================================================
    const [ bodyWeight, setBodyWeight ] = useState(null);
    const [ restingMetabolicRate, setRestingMetabolicRate ] = useState(null);
    const [ leanMass, setLeanMass ] = useState(null);
    const [ boneMass, setBoneMass ] = useState(null);
    const [ targetLeanMass, setTargetLeanMass ] = useState(null);
    const [ targetBodyFatPercentage, setTargetBodyFatPercentage ] = useState(null);
    const [ activityLevel, setActivityLevel ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                setBodyWeight(await storage.getItem("bodyWeight"));
                setRestingMetabolicRate(await storage.getItem("restingMetabolicRate"));
                setLeanMass(await storage.getItem("leanMass"));
                setBoneMass(await storage.getItem("boneMass"));
                setTargetLeanMass(await storage.getItem("targetLeanMass"));
                setTargetBodyFatPercentage(await storage.getItem("targetBodyFatPercentage"));
                setActivityLevel(await storage.getItem("activityLevel"));
            } catch (error) {
                setErrorMessage("Data retrieval error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

    // Handlers ====================================================================================
    const handleUpdateInputs = async () => {
        try {
            await storage.setItem("bodyWeight", Number(bodyWeight));
            await storage.setItem("restingMetabolicRate", Number(restingMetabolicRate));
            await storage.setItem("leanMass", Number(leanMass));
            await storage.setItem("boneMass", Number(boneMass));
            await storage.setItem("targetLeanMass", Number(targetLeanMass));
            await storage.setItem("targetBodyFatPercentage", Number(targetBodyFatPercentage));
            await storage.setItem("activityLevel", Number(activityLevel));

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
        <View style={styles.screen} >
            <View style={styles.contentContainer} >
                <View style={styles.head} >
                    <Title />
                </View>

                <View style={styles.body}>
                    <Text style={styles.h2}>Inputs</Text>

                    <View style={styles.centeredView}>
                        <LabeledTextInput
                            label="Body Weight (Pounds)"
                            value={ String(bodyWeight) }
                            onChangeText={setBodyWeight}
                        />

                        <LabeledTextInput
                            label="Resting Metabolic Rate (Calories)"
                            value={ String(restingMetabolicRate) }
                            onChangeText={setRestingMetabolicRate}
                        />

                        <LabeledTextInput
                            label="Lean Mass (Pounds)"
                            value={ String(leanMass) }
                            onChangeText={setLeanMass}
                        />

                        <LabeledTextInput
                            label="Bone Mass (Pounds)"
                            value={ String(boneMass) }
                            onChangeText={setBoneMass}
                        />

                        <LabeledTextInput
                            label="Target Lean Mass (Pounds)"
                            value={ String(targetLeanMass) }
                            onChangeText={setTargetLeanMass}
                        />

                        <LabeledTextInput
                            label="Target Body Fat %"
                            value={ String(targetBodyFatPercentage) }
                            onChangeText={setTargetBodyFatPercentage}
                        />

                        <LabeledTextInput
                            label="Activity Level (~1.2 to 1.8)"
                            value={ String(activityLevel) }
                            onChangeText={setActivityLevel}
                        />
                    </View>

                    <FitnessTrackerButton title="Update" onPress={handleUpdateInputs} />
                    
                    <FitnessTrackerButton
                        title="Back" onPress={ () => props.onNavigate("LandingPage") }
                    />
                </View>
            </View>
        </View>
    );
};

export default InputsPage;
