import actionType from "../../config/actionTypes";

const userAccessInit = {
    ethNetwork:     null,
    ethAddress:     null,
    autoLogin:      false,
    loggedIn:       false,
    loginChannel:               null,
    payChannel:                 null,
    receiveChannel:             null,
    channels: {
        TWITTER:                0,
        FACEBOOK:               0,
        GOOGLE:                 0,
        LINKEDIN:               0,
        BLOCKCHAIN_ETHEREUM:    0,
        PAYPAL:                 0,
        KEYBOARD:               0,
    },
    facebookStatus:         null,
    facebookUserId:         null,
    facebookUserAccessToken:null,
    linkedInWindow:         null,
    linkedInListener:       null,
    linkedInCode:           null,
    linkedInState:          null,
    googleWindow:           null,
    googleListener:         null,
    googleCode:             null,
    twitterWindow:          null,
    twitterListener:        null,
    twitterRequestToken:    null,
    twitterOAuthVerifier:   null,
    accessJwt:              null,
    refreshJwt:             null,
};

const userAccess = (state = userAccessInit,action) => {
    switch (action.type) {
        case actionType.APP_SHUTDOWN:
            return Object.assign({},userAccessInit);
        case actionType.LOGOUT:
            return Object.assign({},userAccessInit,{
                ethNetwork:             state.ethNetwork,
                ethAddress:             state.ethAddress,
                autoLogin:              (action.payload&&action.payload.autoLogin) ? action.payload.autoLogin : false,
            });
        case actionType.STOP_AUTO_LOGIN:
            return Object.assign({},userAccessInit,{
                autoLogin:              false,
            });
        case actionType.UPDATE_ETH_NETWORK:
            return Object.assign({},state,{
                ethNetwork:             action.payload.ethNetwork,
            });
        case actionType.UPDATE_ETH_ADDRESS:
            return Object.assign({},state,{
                ethAddress:             action.payload.ethAddress,
            });
        case actionType.REFRESH_TOKENS:
            return Object.assign({},state,{
                accessJwt:              action.payload.accessJwt,
                refreshJwt:             action.payload.refreshJwt,
            });
        case actionType.RECEIVE_CHANNELS:
        case actionType.RECEIVE_USER_CHANNELS:
            return Object.assign({},state,{channels:{
                TWITTER:                action.payload.TWITTER              ? action.payload.TWITTER                : state.channels.TWITTER,
                FACEBOOK:               action.payload.FACEBOOK             ? action.payload.FACEBOOK               : state.channels.FACEBOOK,
                GOOGLE:                 action.payload.GOOGLE               ? action.payload.GOOGLE                 : state.channels.GOOGLE,
                LINKEDIN:               action.payload.LINKEDIN             ? action.payload.LINKEDIN               : state.channels.LINKEDIN,
                BLOCKCHAIN_ETHEREUM:    action.payload.BLOCKCHAIN_ETHEREUM  ? action.payload.BLOCKCHAIN_ETHEREUM    : state.channels.BLOCKCHAIN_ETHEREUM,
                PAYPAL:                 action.payload.PAYPAL               ? action.payload.PAYPAL                 : state.channels.PAYPAL,
                KEYBOARD:               action.payload.KEYBOARD             ? action.payload.KEYBOARD               : state.channels.KEYBOARD,
            }});
        case actionType.RECEIVE_LOGIN_CHANNEL:
            return Object.assign({},state,{
                loginChannel:           action.payload.loginChannel,
            });
        case actionType.RECEIVE_PAY_CHANNEL:
            return Object.assign({},state,{
                payChannel:             action.payload.payChannel,
            });
        case actionType.RECEIVE_RECEIVE_CHANNEL:
            return Object.assign({},state,{
                receiveChannel:         action.payload.receiveChannel,
            });
        case actionType.RECEIVE_FACEBOOK_LOGIN_STATUS:
            return Object.assign({},state,{
                facebookStatus:         action.payload.facebookStatus,
                facebookUserId:         action.payload.facebookUserId,
                facebookUserAccessToken:action.payload.facebookUserAccessToken,
            });
        case actionType.RECEIVE_LINKEDIN_WINDOW_AND_LISTENER:
            return Object.assign({},state,{
                linkedInWindow:         action.payload.linkedInWindow,
                linkedInListener:       action.payload.linkedInListener,
            });
        case actionType.CLEAR_LINKEDIN_WINDOW_AND_LISTENER:
            return Object.assign({},state,{
                linkedInWindow:         null,
                linkedInListener:       null,
            });
        case actionType.RECEIVE_LINKEDIN_LOGIN:
            return Object.assign({},state,{
                linkedInCode:           action.payload.code,
                linkedInState:          action.payload.state,
            });
        case actionType.RECEIVE_GOOGLE_WINDOW_AND_LISTENER:
            return Object.assign({},state,{
                googleWindow:           action.payload.googleWindow,
                googleListener:         action.payload.googleListener,
            });
        case actionType.CLEAR_GOOGLE_WINDOW_AND_LISTENER:
            return Object.assign({},state,{
                googleWindow:           null,
                googleListener:         null,
            });
        case actionType.RECEIVE_GOOGLE_LOGIN:
            return Object.assign({},state,{
                googleCode:             action.payload.code,
            });
        case actionType.RECEIVE_TWITTER_WINDOW_AND_LISTENER:
            return Object.assign({},state,{
                twitterWindow:          action.payload.twitterWindow,
                twitterListener:        action.payload.twitterListener,
            });
        case actionType.CLEAR_TWITTER_WINDOW_AND_LISTENER:
            return Object.assign({},state,{
                twitterWindow:          null,
                twitterListener:        null,
            });
        case actionType.RECEIVE_TWITTER_LOGIN:
            return Object.assign({},state,{
                twitterRequestToken:    action.payload.twitterRequestToken,
                twitterOAuthVerifier:   action.payload.twitterOAuthVerifier,
            });
        case actionType.LOGIN:
            return Object.assign({},state,{
                loggedIn:               true,
                accessJwt:              action.payload.accessJwt,
                refreshJwt:             action.payload.refreshJwt,
                payChannel:             action.payload.payChannel,
                receiveChannel:         action.payload.receiveChannel,
            });
        default:
            return state;
    }
};

export default userAccess;
