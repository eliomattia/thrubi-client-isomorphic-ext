import actionType from "../../config/actionTypes";

const statsInit = {
    nUser: 0,
    nCountry: 0,
    nCcy: 0,
};

const stats = (state = statsInit,action) => {
    switch (action.type) {
        case actionType.RECEIVE_GLOBAL_STATS:
            return {
                nUser: action.payload.globalStats.nUser,
                nCountry: action.payload.globalStats.nCountry,
                nCcy: action.payload.globalStats.nCcy,
            };
        default:
            return state;
    }
};

export default stats;