import actionType from "../../config/actionTypes";

const flareInit = {
    deactivated: true,
    next: 0,
    flares: {},
};

const flare = (state = flareInit, action) => {
    switch (action.type) {
        case actionType.INCREASE_FLARE_NEXT:
            return Object.assign({},state,{
                next:           state.next+1,
            });
        case actionType.EMIT_FLARE:
            return Object.assign({},state,{
                deactivated:    false,
                flares:         Object.assign({},state.flares,{
                    [action.payload.index]:{
                        flareType:      action.payload.flareType,
                        message:        action.payload.message,
                        details:        action.payload.details,
                        deleteTimeout:  action.payload.deleteTimeout,
                    }
                }),
            });
        case actionType.DELETE_FLARE:
            return Object.assign({},state,{
                deactivated:    (Object.keys(state.flares).length===1)&&(Object.keys(state.flares)[0]===action.payload.index),
                flares:         Object.assign({},
                    ...Object.keys(state.flares)
                        .map(index => {if (index.toString()!==action.payload.index.toString()) return {[index]:state.flares[index]}; else return null;})
                        .filter(flare => flare!==null)),
            });
        case actionType.REFRESH_FLARE_TIMEOUT:
            return Object.assign({},state,{
                deactivated:    state.deactivated,
                flares:         Object.assign({},state.flares,{
                    [action.payload.index]:{
                        flareType:      state.flares[action.payload.index].flareType,
                        message:        state.flares[action.payload.index].message,
                        details:        state.flares[action.payload.index].details,
                        deleteTimeout:  action.payload.deleteTimeout,
                    }
                }),
            });
        default:
            return state;
    }
};

export default flare;