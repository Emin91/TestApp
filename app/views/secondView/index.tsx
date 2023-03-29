import React, { FC, useMemo, memo } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { getStyle } from "./styles";

export const SecondView: FC = memo(({ }) => {
    const styles = useMemo(() => getStyle(), []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.timer} numberOfLines={1}>Second screen</Text>
            </View>
        </SafeAreaView>
    );
});
