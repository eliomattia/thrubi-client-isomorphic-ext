import {processRequest} from "./server";
import {emitFlare} from "./flare";
import {startPopulationWorker,stopPopulationWorker} from "./population";
import {startMarketWorker,stopMarketWorker} from "./market";
import flareBook from "../config/flare";
import {requestType} from "../config/http";
import actionType,{busyPayload} from "../config/actionTypes";
import {endpoint} from "../config/server";
import {INTERVAL_MEMBER_WORKER} from "../env/workers";

export const createMember = populationId => async (dispatch,getState) => {
    return Promise.resolve()
        .then   (()     => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS}))
        .then   (()     => dispatch(processRequest(requestType.POST,endpoint.MEMBER_CREATE+"/"+populationId,null)))
        .then   (()     => dispatch(startMemberWorker()))
        .then   (()     => dispatch(startPopulationWorker()))
        .then   (()     => dispatch(startMarketWorker()))
        .catch  (error  => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareType.ERR_GENERIC_USERMENU)))
        .finally(()     => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS}));
};

export const fetchMember = () => async (dispatch,getState) => {
    return Promise.resolve()
        .then (()       => dispatch(processRequest(requestType.GET,endpoint.MEMBER+"/"+getState().client.population.id,null)))
        .then (packet   => dispatch({type:actionType.RECEIVE_MEMBER,payload:{member:packet}}))
        .catch(error    => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareType.ERR_GENERIC_USERMENU)));
};

export const removeMembership = () => async (dispatch,getState) => {
    return Promise.resolve()
        .then (()       => dispatch(stopPopulationWorker()))
        .then (()       => dispatch(stopMemberWorker()))
        .then (()       => dispatch(stopMarketWorker()))
        .then (()       => dispatch(processRequest(requestType.POST,endpoint.MEMBER_DELETE+"/"+getState().client.population.id,null)))
        .then (()       => dispatch({type:actionType.CLEAR_POPULATION,payload:{}}))
        .then (()       => dispatch({type:actionType.CLEAR_MEMBER,payload:{}}));
};

export const startMemberWorker = () => async (dispatch,getState) => {
    let memberWorker = setInterval((() => {
        const activity = () => {
            dispatch(fetchMember());
        };
        activity();
        return activity;
    })(),INTERVAL_MEMBER_WORKER);
    dispatch({type:actionType.RECEIVE_MEMBER_WORKER,payload:{memberWorker}});
};

export const stopMemberWorker = () => async (dispatch,getState) => {
    clearInterval(getState().session.workers.member);
    dispatch({type:actionType.STOP_MEMBER_WORKER,payload:{}});
};

export const claim = () => async (dispatch,getState) => {
    const ethAddress = getState().client.userAccess.ethAddress;
    const populationId = getState().client.population.id;
    return await dispatch(processRequest(requestType.GET,endpoint.MEMBER_REQUEST_CLAIM+"/"+ethAddress+"/"+populationId,null));
};

export const advancedMode = optionAdvancedMode => async (dispatch,getState) => {
    return dispatch({type:actionType.SET_OPTION_ADVANCED_MODE,payload:{optionAdvancedMode}});
};

export const viewHistory = optionViewHistory => async (dispatch,getState) => {
    return dispatch({type:actionType.SET_OPTION_VIEW_HISTORY,payload:{optionViewHistory}});
};