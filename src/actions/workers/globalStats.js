import {processRequest} from "../server";
import {emitFlare} from "../flare";
import {requestType} from "../../config/http";
import flareBook from "../../config/flare";
import actionType from "../../config/actionTypes";
import {endpoint} from "../../config/server";
import {INTERVAL_FETCH_GLOBAL_STATS_WORKER} from "../../env/workers";

const fetchGlobalStats = () => async (dispatch,getState) => {
    let globalStats = {};
    return Promise.all([
            dispatch(processRequest(requestType.GET,endpoint.STATS_NUSER,null)),
            dispatch(processRequest(requestType.GET,endpoint.STATS_NCOUNTRY,null)),
            dispatch(processRequest(requestType.GET,endpoint.STATS_NCCY,null))
        ])
        .then(results => {
            for (let i=0;i<=2;i++) for (let key in results[i]) globalStats[key] = results[i][key];
            return globalStats;
        })
        .catch(error => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.ERR_FETCH_GLOBAL_STATS))));
};

export const startGlobalStatsWorker = () => async (dispatch,getState) => {
    let globalStatsWorker = setInterval((() => {
        const activity = () => {
            return Promise.resolve()
                .then (()               => dispatch(fetchGlobalStats()))
                .then (globalStats      => {dispatch({type:actionType.RECEIVE_GLOBAL_STATS,payload:{globalStats}});})
                .catch(error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.ERR_RECEIVE_GLOBAL_STATS)));});
        };
        activity();
        return activity;
    })(),INTERVAL_FETCH_GLOBAL_STATS_WORKER);
    dispatch({type:actionType.RECEIVE_GLOBAL_STATS_WORKER,payload:{globalStatsWorker}});
};

export const stopGlobalStatsWorker = () => async (dispatch,getState) => {
    let globalStatsWorker = getState().session.workers.globalStats;
    clearInterval(globalStatsWorker);
    dispatch({type:actionType.STOP_GLOBAL_STATS_WORKER,payload:{}});
};