import {createStore,applyMiddleware} from "redux";
import createLogger from "redux-logger";
import thunkWrap from "./customMiddleware/thunkWrap";
import flareWrap from "./customMiddleware/flareWrap";
import reducers from "./reducers";

const NODE_ENV = require("../env/env").NODE_ENV;
const middlewares = [flareWrap,thunkWrap];
if (NODE_ENV!=="production") {
    middlewares.push(createLogger);
}

const thrubiApp = state => {
    if (state===undefined) {
        return createStore(reducers,applyMiddleware(...middlewares));
    } else {
        return createStore(reducers,state,applyMiddleware(...middlewares));
    }
};

export default thrubiApp;

