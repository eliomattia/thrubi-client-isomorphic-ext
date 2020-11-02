import actionType from "../../config/actionTypes";

const userInit = {
    id:                 null,
    role:               null,
    deactivated:        null,
    emailVerified:      null,
    emailVerifyError:   false,
    identityCertified:  null,
    incomeApproved:     null,
    name:               null,
    surname:            null,
    email:              null,
    document:           null,
    profilePicture:     null,
    optionUserMenu:     null,
    optionAdvancedMode: false,
    optionViewHistory:  false,
};

const user = (state = userInit,action) => {
    switch (action.type) {
        case actionType.APP_SHUTDOWN:
        case actionType.LOGOUT:
            return Object.assign({},userInit);
        case actionType.LOGIN:
            return Object.assign({},state,{
                id:                     parseInt(action.payload.userId),
                role:                   parseInt(action.payload.userRole),
            });
        case actionType.SIGNAL_EMAIL_VERIFY_ERROR:
            return Object.assign({},state,{
                emailVerifyError:       true,
            });
        case actionType.RECEIVE_USER_FLAGS:
            return Object.assign({},state,{
                deactivated:            parseInt(action.payload.deactivated)        === state.deactivated       ? state.deactivated         : parseInt(action.payload.deactivated),
                emailVerified:          parseInt(action.payload.emailVerified)      === state.emailVerified     ? state.emailVerified       : parseInt(action.payload.emailVerified),
                identityCertified:      parseInt(action.payload.identityCertified)  === state.identityCertified ? state.identityCertified   : parseInt(action.payload.identityCertified),
                incomeApproved:         parseInt(action.payload.incomeApproved)     === state.incomeApproved    ? state.incomeApproved      : parseInt(action.payload.incomeApproved),
            });
        case actionType.SET_USER_ACTIVATED:
            return Object.assign({},state, {
                deactivated:            0,
            });
        case actionType.SET_USER_DEACTIVATED:
            return Object.assign({},state, {
                deactivated:            1,
            });
        case actionType.RECEIVE_USER_DETAILS:
            return Object.assign({},state,{
                name:                   action.payload.name             ? action.payload.name           : userInit.name,
                surname:                action.payload.surname          ? action.payload.surname        : userInit.surname,
                email:                  action.payload.email            ? action.payload.email          : userInit.email,
                document:               action.payload.document         ? action.payload.document       : userInit.document,
                profilePicture:         action.payload.profilePicture   ? action.payload.profilePicture : userInit.profilePicture,
            });
        case actionType.DELETE_USER_DETAILS:
            return Object.assign({},state,{
                name:                   null,
                surname:                null,
                email:                  null,
                document:               null,
                profilePicture:         null,
            });
        case actionType.DELETE_PROFILE_PICTURE:
            return Object.assign({},state,{
                profilePicture:         null,
            });
        case actionType.SWITCH_OPTION_USER_MENU:
            return Object.assign({},state,{
                optionUserMenu:         action.payload.optionUserMenu,
            });
        case actionType.SET_OPTION_ADVANCED_MODE:
            return Object.assign({},state,{
                optionAdvancedMode:     action.payload.optionAdvancedMode,
                optionViewHistory:      action.payload.optionAdvancedMode ? action.payload.optionViewHistory : false,
            });
        case actionType.SET_OPTION_VIEW_HISTORY:
            return Object.assign({},state,{
                optionViewHistory:      action.payload.optionViewHistory,
            });
        default:
            return state;
    }
};

export default user;
