import {processRequest} from "./server";
import {requestType} from "../config/http";
import {endpoint} from "../config/server";

export const logAction = (actionType,actionValue) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()           => dispatch(processRequest(requestType.POST,endpoint.ACTIONS_LOG,{actionType,actionValue})))
};

export const logAuthAction = (actionType,actionValue) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()           => dispatch(processRequest(requestType.POST,endpoint.ACTIONS_AUTH,{actionType,actionValue})))
};