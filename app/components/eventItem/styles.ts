import { StyleSheet } from "react-native";

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
            borderRadius: 10,
            marginBottom: 10
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 6
        },
        infoWrapper: {
            flex: 1,
            justifyContent: "space-between",
            paddingLeft: 8
        },
        infoText: {
            fontSize: 16,
            lineHeight: 20,
            color: "#000000"
        },
        dateText: {
            fontSize: 12,
            lineHeight: 16,
            color: "#4f4f4f"
        }
    });
    return styles;
};
