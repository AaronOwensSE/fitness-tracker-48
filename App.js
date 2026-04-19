// External Dependencies
import { useState } from "react";

// Internal Dependencies
import LandingPage from "./pages/LandingPage.js";
import InputsPage from "./pages/InputsPage.js";
import OutputsPage from "./pages/OutputsPage.js";

export default function App() {
    const [ navPage, setNavPage ] = useState("LandingPage");

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
