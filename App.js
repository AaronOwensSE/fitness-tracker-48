// =================================================================================================
// External Dependencies
// =================================================================================================
import { useEffect, useState } from "react";

// =================================================================================================
// Internal Dependencies
// =================================================================================================
import LandingPage from "./pages/LandingPage.js";
import InputsPage from "./pages/InputsPage.js";
import OutputsPage from "./pages/OutputsPage.js";
import PRsPage from "./pages/PRsPage.js";
import AddPRPage from "./pages/AddPRPage.js";
import database from "./services/database.js";
import ErrorMessagePage from "./pages/ErrorMessagePage.js";

// =================================================================================================
// App
// =================================================================================================
export default function App() {
    // State =======================================================================================
    const [ navPage, setNavPage ] = useState("LandingPage");
    const [ errorMessage, setErrorMessage ] = useState(null);

    // Hooks =======================================================================================
    useEffect( () => {
        const load = async () => {
            try {
                await database.buildSchema();
            } catch (error) {
                setErrorMessage("Database setup error.");
            }
        };

        load();
    }, [] );

    // JSX =========================================================================================
    if (errorMessage !== null) {
        return <ErrorMessagePage errorMessage={errorMessage} onNavigate={setNavPage} />;
    }

    switch (navPage) {
        case "LandingPage":
            return <LandingPage onNavigate={setNavPage} />;
        case "InputsPage":
            return <InputsPage onNavigate={setNavPage} />;
        case "OutputsPage":
            return <OutputsPage onNavigate={setNavPage} />;
        case "PRsPage":
            return <PRsPage onNavigate={setNavPage} />;
        case "AddPRPage":
            return <AddPRPage onNavigate={setNavPage} />;
    }
}
