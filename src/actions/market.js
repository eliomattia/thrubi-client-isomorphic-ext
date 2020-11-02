import request from "request";
import {uri,spotApi} from "../config/market";
import flareBook from "../config/flare";
import actionType from "../config/actionTypes";
import {INTERVAL_MARKET_WORKER} from "../env/workers";

export const fetchExrate = ccyId => async (dispatch,getState) => {
    if (ccyId) {
        return new Promise((resolve,reject) => {
            request.get({url:uri+ccyId+spotApi,json:{}},(error,response) => {
                if (error) {
                    reject(flareBook.errorFlare.EXRATE_FETCH_ERROR);
                } else {
                    let exrate = parseFloat(response.body.data.amount);
                    dispatch({type:actionType.RECEIVE_EXRATE,payload:{exrate}});
                    resolve(exrate);
                }
            });
        });
    }
};

export const startMarketWorker = () => async (dispatch,getState) => {
    let marketWorker = setInterval((() => {
        const activity = () => {
            dispatch(fetchExrate(getState().client.population.ccyId));
        };
        activity();
        return activity;
    })(),INTERVAL_MARKET_WORKER);
    dispatch({type:actionType.RECEIVE_MARKET_WORKER,payload:{marketWorker}});
};

export const stopMarketWorker = () => async (dispatch,getState) => {
    clearInterval(getState().session.workers.market);
    dispatch({type:actionType.STOP_MARKET_WORKER,payload:{}});
};
