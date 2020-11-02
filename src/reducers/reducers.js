import {combineReducers} from "redux";
import session from "./session";
import global from "./global";
import client from "./client";

const reducers = combineReducers({
    session,
    global,
    client,
});

export default reducers;

