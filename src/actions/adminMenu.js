import {processRequest} from "./server";
import {deselectPopulation} from "./population";
import {emitFlare} from "./flare";
import {requestType} from "../config/http";
import flareBook from "../config/flare";
import actionType,{busyPayload} from "../config/actionTypes";
import {endpoint} from "../config/server";

export const fetchCcys = () => async (dispatch,getState) => {
    processRequest(requestType.GET,endpoint.CCY_LIST,null)(dispatch,getState)
        .then ((ccys) => {
            dispatch({type:actionType.RECEIVE_CCYS,payload:{ccys}});
        })
        .catch(error => dispatch(emitFlare(flareBook.flareType.ERROR,error)));
};

export const fetchCountries = () => async (dispatch,getState) => {
    processRequest(requestType.GET,endpoint.COUNTRY_LIST,null)(dispatch,getState)
        .then ((countries) => {
            dispatch({type:actionType.RECEIVE_COUNTRIES,payload:{countries}});
        })
        .catch(error => dispatch(emitFlare(flareBook.flareType.ERROR,error)));
};

export const selectCcy = (ccyId) => async (dispatch,getState) => {
    dispatch({type:actionType.SELECT_CCY,payload:{ccyId}});
};

export const deselectCcy = () => async (dispatch,getState) => {
    dispatch({type:actionType.DESELECT_CCY,payload:{}});
};


export const selectCountry = (countryId) => async (dispatch,getState) => {
    dispatch({type:actionType.SELECT_COUNTRY,payload:{countryId}});
};

export const deselectCountry = () => async (dispatch,getState) => {
    dispatch({type:actionType.DESELECT_COUNTRY,payload:{}});
};


export const populationExists = (countryId,ccyId) => async (dispatch,getState) => {
    return processRequest(requestType.GET,endpoint.POPULATION_EXISTS+"/"+countryId+"/"+ccyId,null)(dispatch,getState)
        .then (result => {
            dispatch({type:actionType.POPULATION_EXISTS,payload:{exists:result.exists}});
        })
        .catch(error => dispatch(emitFlare(flareBook.flareType.ERROR,error)));
};

export const createPopulation = (countryId,ccyId) => async (dispatch,getState) => {
    dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS});
    return processRequest(requestType.POST,endpoint.POPULATION_CREATE+"/"+countryId+"/"+ccyId,null)(dispatch,getState)
        .then (result => {
            dispatch({type:actionType.POPULATION_EXISTS,payload:{exists:1}});
        })
        .catch(error => dispatch(emitFlare(flareBook.flareType.ERROR,error)))
        .then (() => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS}));
};

export const deletePopulation = () => async (dispatch,getState) => {
    dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS});
    return processRequest(requestType.POST,endpoint.POPULATION_DELETE+"/"+getState().client.population.id,null)(dispatch,getState)
        .then (result => {
            deselectPopulation()(dispatch,getState);
        })
        .catch(error => dispatch(emitFlare(flareBook.flareType.ERROR,error)))
        .then (() => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS}));
};

export const tunePopulation = (brake,warperMincome,warperEquality) => async (dispatch,getState) => {
    dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS});
    return processRequest(requestType.POST,endpoint.POPULATION_CONFIG_CHANGE+"/"+getState().client.population.id,{brake,warperMincome,warperEquality},null)(dispatch,getState)
        .then (result => {})
        .catch(error => dispatch(emitFlare(flareBook.flareType.ERROR,error)))
        .then (() => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_POPULATIONS}));
};



