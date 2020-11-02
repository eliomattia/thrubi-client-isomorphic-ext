import actionType from "../../config/actionTypes";

const busyInit = {
    component: {
        app:                false,
        titlebar:           false,
        viewport:           false,
        dashboard:          false,
        client:             false,
        auth:               false,
        user:               false,
        claim:              false,
        transform:          false,
        userMenu:           false,
        adminMenu:          false,
    },
    action: {
        fetchPopulations:   false,
        activation:         false,
        claim:              false,
        transform:          false,
        userDetails:        false,
        activateUser:       false,
        declareIncome:      false,
        populations:        false,
    }
};

const busy = (state = busyInit,action) => {
    switch (action.type) {
        case actionType.SET_BUSY:
            return Object.assign({},state,{
                [action.payload.busyType]: Object.assign({}, state[action.payload.busyType], {
                    [action.payload.busyId]: true
                })
            });
        case actionType.SET_NOT_BUSY:
            return Object.assign({},state,{
                [action.payload.busyType]: Object.assign({}, state[action.payload.busyType], {
                    [action.payload.busyId]: false
                })
            });
        default:
            return state;
    }
};

export default busy;