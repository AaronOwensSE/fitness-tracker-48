// =================================================================================================
// External Dependencies
// =================================================================================================
import { StyleSheet } from "react-native";

// =================================================================================================
// Stylesheet
// =================================================================================================
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "beige",
    },

    contentContainer: {
        flex: 1,
        backgroundColor: "deepskyblue",
        marginTop: 55,
        marginBottom: 55
    },

    head: {
        justifyContent: "center",
        alignItems: "center"
    },

    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    centeredView: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },

    scrollViewContainer: {
        width: "80%",
        height: "60%"
    },

    h1: {
        marginTop: 5,
        marginBottom: 5,
        fontFamily: "Poppins_700Bold",
        fontSize: 28.43,
        color: "white"
    },

    h2: {
        marginTop: 5,
        marginBottom: 5,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 21.33,
        color: "white"
    },

    h3: {
        marginTop: 3,
        marginBottom: 3,
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        color: "white"
    },

    text: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        color: "darkblue"
    }
});

export default styles;
