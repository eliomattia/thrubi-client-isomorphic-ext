import actionType from "../../config/actionTypes";

const ccyInit = {
    ccys: [],
    id: null,
};

const ccy = (state = ccyInit,action) => {
    switch (action.type) {
        case actionType.RECEIVE_CCYS:
            return Object.assign({},state,{
                ccys: action.payload.ccys,
            });
        case actionType.SELECT_CCY:
            return Object.assign({},state,{
                id: action.payload.ccyId,
            });
        case actionType.DESELECT_CCY:
            return Object.assign({},state,{
                id: null,
            });
        default:
            return state;
    }
};

export default ccy;