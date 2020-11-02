import actionType from "../../config/actionTypes";

const marketInit = {
    exrate: 0,
};

const market = (state = marketInit,action) => {
    switch (action.type) {
        case actionType.RECEIVE_EXRATE:
            return Object.assign({},state,{exrate: action.payload.exrate});
        case actionType.STOP_MARKET_WORKER:
            return ({exrate:0});
        default:
            return state;
    }
};

export default market;