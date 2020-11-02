import blockchain from "./session/blockchain";
import flare from "./session/flare";
import workers from "./session/workers";
import busy from "./session/busy";
import {combineReducers} from "redux";

const session = combineReducers({
    blockchain,
    workers,
    busy,
    flare,
});

export default session;
