import {processRequest} from "./server";
import {requestType} from "../config/http";
import {endpoint} from "../config/server";
import {emitFlare} from "./flare";
import flareBook from "../config/flare";
import actionType from "../config/actionTypes";
import {logAction} from "../actions/log";
import {loggableActionType} from "../config/user";

export const showMenu = () => async (dispatch,getState) => {
    return dispatch({type:actionType.SHOW_MENU,payload:{}});
};

export const hideMenu = () => async (dispatch,getState) => {
    return dispatch({type:actionType.HIDE_MENU,payload:{}});
};

export const toggleMenu = () => async (dispatch,getState) => {
    return dispatch({type:actionType.TOGGLE_MENU,payload:{}});
};

export const submitSuggestion = (suggestionType,country,suggestionText) => async (dispatch,getState) => {
    return Promise.resolve()
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.GUEST_SUBMITSUGGESTION,{suggestionType,country,suggestionText})))
        .then   (()               => dispatch(emitFlare(flareBook.flareType.INFO,flareBook.infoFlare.THANK_YOU)));
};

export const chooseGuestMenu = guestMenuOption => async (dispatch,getState) => {
    return Promise.resolve()
        .then   (()               => dispatch(logAction(loggableActionType.clickGuestMenu,guestMenuOption)))
        .then   (()               => dispatch({type:actionType.RECEIVE_GUEST_MENU_OPTION,payload:{guestMenuOption}}));
};

export const toggleFaq = actionValue => async (dispatch,getState) => {
    return Promise.resolve()
        .then   (()               => {if (!getState().client.guest.faqState[actionValue]) dispatch(logAction(loggableActionType.clickFaq,actionValue));})
        .then   (()               => dispatch({type:actionType.TOGGLE_FAQ_STATE,payload:{actionValue}}))
        .catch  (()               => {throw flareBook.infoFlare.CANNOT_TOGGLE_FAQ_STATE;});
};

export const subscribeNewsletterReset = () => async (dispatch,getState) => {
    return Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_GUEST_SUBSCRIBED,payload:{guestSubscribed:false}}))
        .catch  (()               => {throw flareBook.infoFlare.CANNOT_SUBSCRIBE_NEWSLETTER;});
};

export const subscribeNewsletter = guestEmail => async (dispatch,getState) => {
    return Promise.resolve()
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.GUEST_SUBSCRIBENEWSLETTER,{guestEmail})))
        .then   (()               => dispatch({type:actionType.SET_GUEST_SUBSCRIBED,payload:{guestSubscribed:true}}))
        .catch  (()               => {throw flareBook.infoFlare.CANNOT_SUBSCRIBE_NEWSLETTER;});
};