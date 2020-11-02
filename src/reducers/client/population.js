import actionType from "../../config/actionTypes";

const populationInit = {
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
    thrubiPriceGold:        1.5,
    brake:                  0,
    mincome:                0,
    equality:               0,
    warperMincome:          0,
    warperEquality:         0,
    thrubiFees:             0.005, // 0.5%
};

const population = (state = populationInit,action) => {
    switch (action.type) {
        case actionType.APP_SHUTDOWN:
        case actionType.LOGOUT:
            return populationInit;
        case actionType.CLEAR_POPULATION:
            return Object.assign({},populationInit,{
                populations:            state.populations,
            });
        case actionType.RECEIVE_POPULATIONS:
            return Object.assign({},state,{
                populations:            action.payload.populations,
            });
        case actionType.SELECT_POPULATION:
            return Object.assign({},state,{
                id:                     parseInt(action.payload.population.populationId),
                countryId:              action.payload.population.countryId,
                countryName:            action.payload.population.countryName,
                ccyId:                  action.payload.population.ccyId,
                ccyName:                action.payload.population.ccyName,
                ccySymbol:              action.payload.population.ccySymbol,
            });
        case actionType.RECEIVE_THRUBI_PRICE_SILVER:
            return Object.assign({},state,{
                thrubiPriceSilver:      action.payload.thrubiPriceSilver,
            });
        case actionType.RECEIVE_THRUBI_PRICE_SILVER_NEXT:
            return Object.assign({},state,{
                thrubiPriceSilverNext:  action.payload.thrubiPriceSilverNext,
            });
        case actionType.RECEIVE_STATS:
            return Object.assign({},state,{
                mincome:                parseFloat(action.payload.stats.mincome),
                equality:               parseFloat(action.payload.stats.equality),
            });
        case actionType.RECEIVE_CONFIG:
            return Object.assign({},state,{
                brake:                  parseFloat(action.payload.config.brake),
                warperMincome:          parseFloat(action.payload.config.warperMincome),
                warperEquality:         parseFloat(action.payload.config.warperEquality),
            });
        case actionType.POPULATION_EXISTS:
            return Object.assign({},state,{
                exists:                 action.payload.exists,
            });
        case actionType.RECEIVE_POPULATION_FILTER:
            return Object.assign({},state,{
                filter:                 action.payload.filter,
            });
        default:
            return state;
    }
};

export default population;

