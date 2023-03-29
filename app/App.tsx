import React, { FC } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { RootNavigation } from "./modules/navigation/rootNavigation";
import { store } from "./modules/redux/store";

const App: FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <Provider {...{ store }}>
                <RootNavigation />
            </Provider>
        </View>
    );
};

export default App;
