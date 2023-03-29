import { StyleSheet } from "react-native";

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 12,
            backgroundColor: "white"
        },
        line: {
            height: 0.5,
            backgroundColor: "#a6a6a6",
            marginBottom: 10
        },
        emptyState: {
            fontSize: 20,
            lineHeight: 24,
            color: "#000000",
            textAlign: "center"
        },
        labelWrapper: {
            position: "absolute",
            zIndex: 10,
            paddingVertical: 10,
            borderRadius: 100,
            bottom: 70,
            right: 20,
            width: 210,
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "#000000"
        },
        timer: {
            fontSize: 16,
            lineHeight: 20,
            color: "#FFFFFF"
        }
    });
    return styles;
};
