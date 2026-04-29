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
        height: "40%"
    },

    h1: {
        margin: 5,
        fontSize: 28.43,
        fontWeight: "bold",
        color: "white"
    },

    h2: {
        margin: 5,
        fontSize: 21.33,
        fontWeight: "bold",
        color: "white"
    },

    h3: {
        margin: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },

    text: {
        fontSize: 16,
        color: "darkblue"
    }
});

export default styles;
