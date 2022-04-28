import React from "react";
import MainApp from "./src/screen/MainApp";
import {Provider} from "react-redux";
import store from "./src/redux";

const App = (): React.ReactElement => {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    );
};

export default App;
