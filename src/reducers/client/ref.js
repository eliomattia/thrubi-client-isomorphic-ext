import actionType from "../../config/actionTypes";

const refInit = {
    populations:    [],
    exists:         null,
    id:             null,
    countryId:      null,
    countryName:    null,
    ccyId:          null,
    ccyName:        null,
    ccySymbol:      null,
    filter:         null,
    thrubiPriceSilver:      0,
    thrubiPriceSilverNext:  0,
    thrubiPriceGold:        0,
    brake:                  0,
    mincome:                0,
    equality:               0,
    warperMincome:          0,
    warperEquality:         0,
    thrubiFees:             0.005, // 0.5%
};

const ref = (state = refInit,action) => {
    switch (action.type) {
        case actionType.APP_SHUTDOWN:
        case actionType.LOGOUT:
            return refInit;
        case actionType.CLEAR_REF:
            return Object.assign({},refInit,{
                populations:            state.populations,
            });
        case actionType.RECEIVE_REFS:
            return Object.assign({},state,{
                populations:            action.payload.populations,
            });
        case actionType.SELECT_REF:
            return Object.assign({},state,{
                id:                     parseInt(action.payload.population.populationId),
                countryId:              action.payload.population.countryId,
                countryName:            action.payload.population.countryName,
                ccyId:                  action.payload.population.ccyId,
                ccyName:                action.payload.population.ccyName,
                ccySymbol:              action.payload.population.ccySymbol,
            });
        case actionType.REF_EXISTS:
            return Object.assign({},state,{
                exists:                 action.payload.exists,
            });
        case actionType.RECEIVE_REF_FILTER:
            return Object.assign({},state,{
                filter:                 action.payload.filter,
            });
        default:
            return state;
    }
};

export default ref;

