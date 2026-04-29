// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import LoadingPage from "./pages/LoadingPage.js";
import ErrorMessagePage from "./pages/ErrorMessagePage.js";
import LandingPage from "./pages/LandingPage.js";
import InputsPage from "./pages/InputsPage.js";
import OutputsPage from "./pages/OutputsPage.js";
import PersonalRecordsPage from "./pages/PersonalRecordsPage.js";
import AddPersonalRecordPage from "./pages/AddPersonalRecordPage.js";
import WorkoutsPage from "./pages/WorkoutsPage.js";
import AddWorkoutPage from "./pages/AddWorkoutPage.js";
import WorkoutPage from "./pages/WorkoutPage.js";
import AddExercisePage from "./pages/AddExercisePage.js";
import database from "./services/database.js";

// =================================================================================================
// App
// =================================================================================================
export default function App() {
    // State =======================================================================================
    const [ navPage, setNavPage ] = useState("LandingPage");
    const [ navData, setNavData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                await database.buildSchema();
            } catch (error) {
                setErrorMessage("Database setup error.");
            }

            setLoading(false);
        };

        load();
    }, [] );

    // Handlers ====================================================================================
    const handleNavigate = (navPage, navData = null) => {
        setNavPage(navPage);
        setNavData(navData);
    };

    // JSX =========================================================================================
    if (loading) {
        return <LoadingPage />;
    }

    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={handleNavigate} />;
    }

    switch (navPage) {
        case "LandingPage":
            return <LandingPage onNavigate={handleNavigate} />;
        case "InputsPage":
            return <InputsPage onNavigate={handleNavigate} />;
        case "OutputsPage":
            return <OutputsPage onNavigate={handleNavigate} />;
        case "PersonalRecordsPage":
            return <PersonalRecordsPage onNavigate={handleNavigate} />;
        case "AddPersonalRecordPage":
            return <AddPersonalRecordPage onNavigate={handleNavigate} />;
        case "WorkoutsPage":
            return <WorkoutsPage onNavigate={handleNavigate} />;
        case "AddWorkoutPage":
            return <AddWorkoutPage onNavigate={handleNavigate} />;
        case "WorkoutPage":
            return <WorkoutPage onNavigate={handleNavigate} workoutId={navData} />;
        case "AddExercisePage":
            return <AddExercisePage onNavigate={handleNavigate} workoutId={navData} />;
    }
}
