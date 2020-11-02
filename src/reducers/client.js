import guest from "./client/guest";
import user from "./client/user";
import userAccess from "./client/userAccess";
import population from "./client/population";
import ref from "./client/ref";
import member from "./client/member";
import {combineReducers} from "redux";

const client = combineReducers({
    guest,
    user,
    userAccess,
    population,
    ref,
    member,
});

export default client;

