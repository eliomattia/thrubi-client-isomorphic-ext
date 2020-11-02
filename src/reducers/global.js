import market from "./global/market";
import stats from "./global/stats";
import country from "./global/country";
import ccy from "./global/ccy";
import {combineReducers} from "redux";

const global = combineReducers({
    market,
    stats,
    country,
    ccy,
});

export default global;
