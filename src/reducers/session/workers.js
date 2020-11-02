import actionType from "../../config/actionTypes";

const workersInit = {
    ethNetwork: null,
    ethAddress: null,
    refreshTokens: null,
    globalStats: null,
    user: null,
    member: null,
    market: null,
    population: null,
};

const workers = (state = workersInit,action) => {
    switch (action.type) {
        case actionType.RECEIVE_ETH_NETWORK_WORKER:
            return Object.assign({},state,{ethNetwork:action.payload.ethNetworkWorker,});
        case actionType.RECEIVE_ETH_ADDRESS_WORKER:
            return Object.assign({},state,{ethAddress:action.payload.ethAddressWorker,});
        case actionType.RECEIVE_REFRESH_TOKENS_WORKER:
            return Object.assign({},state,{refreshTokens:action.payload.refreshTokensWorker,});
        case actionType.RECEIVE_GLOBAL_STATS_WORKER:
            return Object.assign({},state,{globalStats:action.payload.globalStatsWorker,});
        case actionType.RECEIVE_USER_WORKER:
            return Object.assign({},state,{user:action.payload.userWorker,});
        case actionType.RECEIVE_MEMBER_WORKER:
            return Object.assign({},state,{member:action.payload.memberWorker,});
        case actionType.RECEIVE_MARKET_WORKER:
            return Object.assign({},state,{market:action.payload.marketWorker,});
        case actionType.RECEIVE_POPULATION_WORKER:
            return Object.assign({},state,{population:action.payload.populationWorker,});
        case actionType.STOP_ETH_NETWORK_WORKER:
            return Object.assign({},state,{ethNetwork:null,});
        case actionType.STOP_ETH_ADDRESS_WORKER:
            return Object.assign({},state,{ethAddress:null,});
        case actionType.STOP_REFRESH_TOKENS_WORKER:
            return Object.assign({},state,{refreshTokens:null,});
        case actionType.STOP_GLOBAL_STATS_WORKER:
            return Object.assign({},state,{globalStats:null,});
        case actionType.STOP_USER_WORKER:
            return Object.assign({},state,{user:null,});
        case actionType.STOP_MEMBER_WORKER:
            return Object.assign({},state,{member:null,});
        case actionType.STOP_MARKET_WORKER:
            return Object.assign({},state,{market:null,});
        case actionType.STOP_POPULATION_WORKER:
            return Object.assign({},state,{population:null,});
        default:
            return state;
    }
};


export default workers;