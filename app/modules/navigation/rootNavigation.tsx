import React, { FC } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainView } from "../../views/mainView";
import { SecondView } from "../../views/secondView";

const Stack = createNativeStackNavigator();

export const RootNavigation: FC = () => {

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"MainView"}>
                    <Stack.Screen name={"MainView"} component={MainView} />
                    <Stack.Screen name={"SecondView"} component={SecondView} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};
