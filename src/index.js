import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import App from "./components/App";
import thrubiApp from "./reducers/thrubiApp";
import "./styles/customBootstrap.scss";

const store = thrubiApp(window.REDUX_STATE_INIT);
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,document.getElementById("root")
);