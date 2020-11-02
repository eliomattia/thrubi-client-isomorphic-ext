import actionType from "../../config/actionTypes";

const blockchainInit = {
    thrubiContract: {},
};

const blockchain = (state = blockchainInit,action) => {
    switch (action.type) {
        case actionType.RECEIVE_THRUBI_CONTRACT:
            return Object.assign({},state,{thrubiContract:action.payload.thrubiContract});
        default:
            return state;
    }
};


export default blockchain;