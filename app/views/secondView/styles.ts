import { StyleSheet } from "react-native";

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
        },
        timer: {
            fontSize: 16,
            lineHeight: 20,
            color: "#000000"
        }
    });
    return styles;
};
