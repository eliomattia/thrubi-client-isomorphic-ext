import Channel from "../classes/Channel";
import {processRequest} from "./server";
import {signMessage} from "./blockchain_ethereum";
import {switchOptionUserMenu,fetchDetails,storeDetails,activateUserWorker,stopUserWorker} from "./user";
import {emitFlare} from "./flare";
import {deselectPopulation} from "./population";
import {requestType} from "../config/http";
import actionType,{busyPayload} from "../config/actionTypes";
import {EVENT_DATA_ORIGIN_THRUBI,EVENT_TYPE_MESSAGE} from "../config/redirect";
import {endpoint} from "../config/server";
import {facebook} from "../config/facebook";
import {
    linkedInAuthUri,
    linkedInWindowName,
    linkedInWindowParams,
    googleAuthUri,
    googleWindowName,
    googleWindowParams,
    twitterAuthUri,
    twitterWindowName,
    twitterWindowParams,
} from "../config/auth";
import flareBook from "../config/flare";
import {
    linkedInRedirectUri,
    linkedInAppState,
    linkedInAppClientId,
    googleRedirectUri,
    googleAppClientId,
} from "../env/auth";
import {REDIRECT_CLOSE_INTERVAL} from "../env/redirect";
import userOptions from "../config/user";

// ------
// Logout
// ------

export const logout = payload => async (dispatch,getState) => {
    if (getState().client.userAccess.loggedIn) {
        return await Promise.resolve()
            .then   (()           => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
            .then   (()           => dispatch(processRequest(requestType.POST,endpoint.AUTH_LOGOUT,{refreshJwt:(getState().client.userAccess.refreshJwt)})))
            .then   (()           => dispatch({type:actionType.LOGOUT,payload}))
            .then   (()           => dispatch(cancelRefreshTokens()))
            .then   (()           => dispatch(fetchChannels()))
            .then   (()           => dispatch(stopUserWorker()))
            .then   (()           => dispatch(deselectPopulation()))
            .then   (()           => dispatch(FBlogout()))
            .catch  (error        => {throw flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGOUT)})
            .finally(()           => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
    }
};

// ------
// Tokens
// ------

const cancelRefreshTokens = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()           => clearTimeout(getState().session.workers.refreshTokens))
        .then   (()           => dispatch({type:actionType.STOP_REFRESH_TOKENS_WORKER,payload:{}}))
        .catch  (()           => {throw flareBook.errorFlare.ERROR_STOP_TOKEN_REFRESH});
};

const scheduleRefreshTokens = intervalTime => async (dispatch,getState) => {
    const refreshTokensWorker = setTimeout(async () => {
        let tokens;
        return await Promise.resolve()
            .then   (()           => dispatch(processRequest(requestType.POST,endpoint.AUTH_REFRESH,{refreshJwt:(getState().client.userAccess.refreshJwt)})))
            .then   (result       => {tokens=result;})
            .then   (()           => dispatch({type:actionType.REFRESH_TOKENS,payload:tokens}))
            .then   (()           => dispatch(scheduleRefreshTokens(tokens.accessJwtExpiry)))
            .catch  (error        => {throw flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN)})
            .catch  (error        => {console.error(error);dispatch(logout({autoLogin:false}));});
    },intervalTime/2);
    dispatch({type:actionType.RECEIVE_REFRESH_TOKENS_WORKER,payload:{refreshTokensWorker}});
};

// --------
// Channels
// --------

export const fetchChannels = () => async (dispatch,getState) => {
    let channels = {};
    return await Promise.resolve()
        .then   (()               => dispatch(processRequest(requestType.GET,endpoint.AUTH_LISTCHANNELS,null)))
        .then   (result           => result.map((channel,i) => channels[channel.channelName]=channel.channelMode))
        .then   (()               => dispatch({type:actionType.RECEIVE_CHANNELS,payload:channels}))
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_CHANNEL_FETCH)));
};

export const fetchUserChannels = () => async (dispatch,getState) => {
    let channels = {};
    return await Promise.resolve()
        .then   (()               => dispatch(processRequest(requestType.GET,endpoint.USERACCESS_LISTUSERCHANNELS,null)))
        .then   (result           => result.map((channel,i) => channels[channel.channelName]=channel.channelMode))
        .then   (()               => dispatch({type:actionType.RECEIVE_USER_CHANNELS,payload:channels}))
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_USER_CHANNEL_FETCH)));
};

export const deleteChannel = (channelName) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()                           => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()                           => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_DELETE+"/"+channelName,{})))
        .then   (()                           => dispatch(fetchUserChannels()))
        .catch  (error                        => dispatch(emitFlare(flareBook.flareType.ERROR,error)))
        .finally(()                           => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const getPayChannel = () => async (dispatch,getState) => {
    return await Promise.resolve();
};

export const setPayChannel = payChannel => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => {if (payChannel!==Channel.channelName.NOT_AVAILABLE&&!Channel.channelIsOpen(getState().client.userAccess.channels[payChannel])) {dispatch(switchOptionUserMenu(userOptions.optionUserMenu.AUTHENTICATION)); throw flareBook.errorFlare.CHANNEL_CLOSED;}})
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_SETPAYCHANNEL,{payChannel})))
        .then   (newPayChannel    => dispatch({type:actionType.RECEIVE_PAY_CHANNEL,payload:{payChannel:newPayChannel}}))
        .catch  (error            => {if (error !== flareBook.errorFlare.CHANNEL_CLOSED) throw error;})
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_PAY_CHANNEL_UPDATE)));
};

export const getReceiveChannel = () => async (dispatch,getState) => {
    return await Promise.resolve();
};

export const setReceiveChannel = receiveChannel => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => {if (receiveChannel!==Channel.channelName.NOT_AVAILABLE&&!Channel.channelIsOpen(getState().client.userAccess.channels[receiveChannel])) {dispatch(switchOptionUserMenu(userOptions.optionUserMenu.AUTHENTICATION)); throw flareBook.errorFlare.CHANNEL_CLOSED;}})
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_SETRECEIVECHANNEL,{receiveChannel})))
        .then   (newReceiveChannel=> dispatch({type:actionType.RECEIVE_RECEIVE_CHANNEL,payload:{receiveChannel:newReceiveChannel}}))
        .catch  (error            => {if (error !== flareBook.errorFlare.CHANNEL_CLOSED) throw error;})
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_RECEIVE_CHANNEL_UPDATE)));
};

// ----------------------
// Login and verification
// ----------------------

const finalizeLogin = loginData => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => {if (!loginData.userId) throw loginData.loginError;})
        .then   (()               => dispatch({type:actionType.LOGIN,payload:loginData}))
        .then   (()               => dispatch(scheduleRefreshTokens(loginData.accessJwtExpiry)))
        .then   (()               => dispatch(fetchDetails()))
        .then   (()               => dispatch(activateUserWorker()))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (()               => dispatch(logout({autoLogin:false})))
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

const verifyBlockchainEthereum = () => async (dispatch,getState) => {
    let ethNetwork = getState().client.userAccess.ethNetwork;
    let ethAddress = getState().client.userAccess.ethAddress;
    let challengeTokens;
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => {if (!ethNetwork || !ethAddress) throw flareBook.errorFlare.NO_ETHEREUM_CONFIG;})
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.AUTH_CHALLENGE_BLOCKCHAINETHEREUM,{ethAddress})))
        .then   (result           => {challengeTokens={challengeJwt:result.challengeJwt,hashedJwt:result.hashedJwt};})
        .then   (()               => dispatch(signMessage(challengeTokens.hashedJwt)))
        .then   (signedMessage    => ({ethAddress,challengeSolution:{challengeJwt:challengeTokens.challengeJwt,hashedJwt:challengeTokens.hashedJwt,signedMessage}}));
};

export const signupBlockchainEthereum = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(verifyBlockchainEthereum()))
        .then   (solvedChallenge  => dispatch(processRequest(requestType.POST,endpoint.AUTH_CREATE_BLOCKCHAINETHEREUM,solvedChallenge)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const loginBlockchainEthereum = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(verifyBlockchainEthereum()))
        .then   (solvedChallenge  => dispatch(processRequest(requestType.POST,endpoint.AUTH_LOGIN_BLOCKCHAINETHEREUM,solvedChallenge)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const addBlockchainEthereum = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(verifyBlockchainEthereum()))
        .then   (solvedChallenge  => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_ADD_BLOCKCHAINETHEREUM,solvedChallenge)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const updateBlockchainEthereum = () => async (dispatch, getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(verifyBlockchainEthereum()))
        .then   (solvedChallenge  => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_UPDATE_BLOCKCHAINETHEREUM,solvedChallenge)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const signupKeyboard = (username,password) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.AUTH_CREATE_KEYBOARD,{username,password})))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const loginKeyboard = (username,password) => async (dispatch,getState) => {
    console.error(username,password);
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.AUTH_LOGIN_KEYBOARD,{username,password})))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const addKeyboard = (username,password) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_ADD_KEYBOARD,{username,password})))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const updateKeyboard = (username,password) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_UPDATE_KEYBOARD,{username,password})))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

const receiveFacebookLoginStatus = (loginStatus,resolve) => async (dispatch,getState) => {
    let facebookLoginStatus = {};
    return await Promise.resolve()
        .then   (()               => {
            facebookLoginStatus.facebookStatus=loginStatus.status;
            facebookLoginStatus.facebookUserId=loginStatus.authResponse?loginStatus.authResponse.userID:null;
            facebookLoginStatus.facebookUserAccessToken=loginStatus.authResponse?loginStatus.authResponse.accessToken:null;
        })
        .then   (()               => dispatch({type:actionType.RECEIVE_FACEBOOK_LOGIN_STATUS,payload:facebookLoginStatus}))
        .then   (()               => resolve(facebookLoginStatus.facebookStatus));
};

const FBgetLoginStatus = (resolveFBlogin) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => {if (!window.FB) throw(flareBook.errorFlare.FB_NOT_FOUND);})
        .then   (()               => new Promise((resolveFBgetLoginStatus) => {window.FB.getLoginStatus(loginStatus=>dispatch(receiveFacebookLoginStatus(loginStatus,resolveFBgetLoginStatus)))}))
        .then   (facebookStatus   => {if (resolveFBlogin) resolveFBlogin(facebookStatus); return facebookStatus;});
};

const FBlogin = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => new Promise(resolveFBlogin => {window.FB.login(() => dispatch(FBgetLoginStatus(resolveFBlogin)),{scope:facebook.apiScope})}));
};

const FBlogout = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(FBgetLoginStatus(null)))
        .then   (facebookStatus   => {if (facebookStatus===facebook.status.connected) return new Promise((resolveFBlogout) => {window.FB.logout(()=>{resolveFBlogout(); return false;})});});
};

const connectFacebook = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => {if (!window.FB) {throw (flareBook.errorFlare.FB_NOT_FOUND);}})
        .then   (()               => dispatch(FBgetLoginStatus(null)))
        .then   (facebookStatus   => {if ((facebookStatus===facebook.status.unknown)||(facebookStatus===facebook.status.not_authorized)) return dispatch(FBlogin());})
        .then   (()               => ({facebookUserId:getState().client.userAccess.facebookUserId,facebookUserAccessToken:getState().client.userAccess.facebookUserAccessToken}));
};

const fetchFacebookDetails = () => async (dispatch,getState) => {
    let fbDetails = {};
    return await Promise.resolve()
        .then   (()               => dispatch(FBgetLoginStatus(null)))
        .then   (facebookStatus   => new Promise(resolve => {if (facebookStatus===facebook.status.connected) window.FB.api(facebook.apiQuery,(result => resolve(result)));}))
        .then   (d                => fbDetails={name:d.first_name,surname:d.last_name,email:d.email,profilePicture:d.picture.data.url})
        .then   (()               => dispatch(storeDetails(fbDetails,{overwrite:false})))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.FB_NOT_FOUND));});
};

export const signupFacebook = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(connectFacebook()))
        .then   (fbLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.AUTH_CREATE_FACEBOOK,fbLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)))
        .then   (()               => dispatch(fetchFacebookDetails()));
};

export const loginFacebook = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(connectFacebook()))
        .then   (fbLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.AUTH_LOGIN_FACEBOOK,fbLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)))
        .then   (()               => dispatch(fetchFacebookDetails()));
};

export const addFacebook = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(connectFacebook()))
        .then   (fbLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_ADD_FACEBOOK,fbLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (()               => dispatch(fetchFacebookDetails()))
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const updateFacebook = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(connectFacebook()))
        .then   (fbLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_UPDATE_FACEBOOK,fbLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (()               => dispatch(fetchFacebookDetails()))
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

const processLinkedInLogin = (event,waitingHandleResolve) => async (dispatch,getState) => {
    let linkedInListener = null;
    return await Promise.resolve()
        .then   (()               => {if ((event.data.origin)&&(event.data.origin===EVENT_DATA_ORIGIN_THRUBI)) return event.data; else throw flareBook.errorFlare.MESSAGE_IGNORED;})
        .then   (pjRenamed        => {dispatch({type:actionType.RECEIVE_LINKEDIN_LOGIN,payload:pjRenamed});})
        .then   (()               => {linkedInListener=getState().client.userAccess.linkedInListener;})
        .then   (()               => {window.removeEventListener(EVENT_TYPE_MESSAGE,linkedInListener);})
        .then   (()               => getState().client.userAccess.linkedInWindow)
        .then   (linkedInWindow   => {linkedInWindow.close();})
        .then   (()               => dispatch({type:actionType.CLEAR_LINKEDIN_WINDOW_AND_LISTENER,payload:{}}))
        .then   (()               => {waitingHandleResolve();})
        .catch  (()               => null);
};

const startupLinkedInLogin = () => async (dispatch,getState) => {
    let linkedInWindow = null;
    let linkedInListener = null;
    let linkedInInterval = null;
    let waitingHandleResolve = null;
    let waitingHandle = new Promise(resolve => waitingHandleResolve=resolve);
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => {linkedInWindow = getState().client.userAccess.linkedInWindow;})
        .then   (()               => ((linkedInWindow===null)||(linkedInWindow.closed)))
        .then   (openNewWindow    => {if (openNewWindow) linkedInWindow = window.open(linkedInAuthUri(linkedInRedirectUri,linkedInAppState,linkedInAppClientId),linkedInWindowName,linkedInWindowParams);})
        .then   (()               => linkedInWindow.focus())
        .then   (()               => {linkedInInterval = setInterval(() => {if (linkedInWindow.closed) {waitingHandleResolve(); clearInterval(linkedInInterval);}},REDIRECT_CLOSE_INTERVAL);})
        .then   (()               => {linkedInListener = event => dispatch(processLinkedInLogin(event,waitingHandleResolve));})
        .then   (()               => {window.addEventListener(EVENT_TYPE_MESSAGE,linkedInListener);})
        .then   (()               => dispatch({type:actionType.RECEIVE_LINKEDIN_WINDOW_AND_LISTENER,payload:{linkedInWindow,linkedInListener}}))
        .then   (()               => waitingHandle)
        .then   (()               => ({linkedInCode:getState().client.userAccess.linkedInCode,linkedInState:getState().client.userAccess.linkedInState}));
};

export const signupLinkedIn = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupLinkedInLogin()))
        .then   (liLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.AUTH_CREATE_LINKEDIN,liLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const loginLinkedIn = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupLinkedInLogin()))
        .then   (liLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.AUTH_LOGIN_LINKEDIN,liLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const addLinkedIn = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupLinkedInLogin()))
        .then   (liLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_ADD_LINKEDIN,liLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const updateLinkedIn = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupLinkedInLogin()))
        .then   (liLoginPackage   => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_UPDATE_LINKEDIN,liLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

const processGoogleLogin = (event,waitingHandleResolve) => async (dispatch,getState) => {
    let googleListener = null;
    return await Promise.resolve()
        .then   (()               => {if ((event.data.origin)&&(event.data.origin===EVENT_DATA_ORIGIN_THRUBI)) return event.data; else throw flareBook.errorFlare.MESSAGE_IGNORED;})
        .then   (pjRenamed        => {dispatch({type:actionType.RECEIVE_GOOGLE_LOGIN,payload:pjRenamed});})
        .then   (()               => {googleListener=getState().client.userAccess.googleListener;})
        .then   (()               => {window.removeEventListener(EVENT_TYPE_MESSAGE,googleListener);})
        .then   (()               => getState().client.userAccess.googleWindow)
        .then   (googleWindow     => {googleWindow.close();})
        .then   (()               => dispatch({type:actionType.CLEAR_GOOGLE_WINDOW_AND_LISTENER,payload:{}}))
        .then   (()               => {waitingHandleResolve();})
        .catch  (()               => null);
};

const startupGoogleLogin = () => async (dispatch,getState) => {
    let googleWindow = null;
    let googleListener = null;
    let googleInterval = null;
    let waitingHandleResolve = null;
    let waitingHandle = new Promise(resolve => waitingHandleResolve=resolve);
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => {googleWindow = getState().client.userAccess.googleWindow;})
        .then   (()               => ((googleWindow===null)||(googleWindow.closed)))
        .then   (openNewWindow    => {if (openNewWindow) googleWindow = window.open(googleAuthUri(googleRedirectUri,googleAppClientId),googleWindowName,googleWindowParams);})
        .then   (()               => googleWindow.focus())
        .then   (()               => {googleInterval = setInterval(() => {if (googleWindow.closed) {waitingHandleResolve(); clearInterval(googleInterval);}},REDIRECT_CLOSE_INTERVAL);})
        .then   (()               => {googleListener = event => dispatch(processGoogleLogin(event,waitingHandleResolve));})
        .then   (()               => {window.addEventListener(EVENT_TYPE_MESSAGE,googleListener);})
        .then   (()               => dispatch({type:actionType.RECEIVE_GOOGLE_WINDOW_AND_LISTENER,payload:{googleWindow,googleListener}}))
        .then   (()               => waitingHandle)
        .then   (()               => ({googleCode:getState().client.userAccess.googleCode}));
};

export const signupGoogle = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupGoogleLogin()))
        .then   (gLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.AUTH_CREATE_GOOGLE,gLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const loginGoogle = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupGoogleLogin()))
        .then   (gLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.AUTH_LOGIN_GOOGLE,gLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const addGoogle = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupGoogleLogin()))
        .then   (gLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_ADD_GOOGLE,gLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const updateGoogle = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupGoogleLogin()))
        .then   (gLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_UPDATE_GOOGLE,gLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

const processTwitterLogin = (event,waitingHandleResolve) => async (dispatch,getState) => {
    let twitterListener = null;
    return await Promise.resolve()
        .then   (()               => {if ((event.data.origin)&&(event.data.origin===EVENT_DATA_ORIGIN_THRUBI)) return event.data; else throw flareBook.errorFlare.MESSAGE_IGNORED;})
        .then   (pjRenamed        => {dispatch({type:actionType.RECEIVE_TWITTER_LOGIN,payload:pjRenamed});})
        .then   (()               => {twitterListener=getState().client.userAccess.twitterListener;})
        .then   (()               => {window.removeEventListener(EVENT_TYPE_MESSAGE,twitterListener);})
        .then   (()               => getState().client.userAccess.twitterWindow)
        .then   (twitterWindow     => {twitterWindow.close();})
        .then   (()               => dispatch({type:actionType.CLEAR_TWITTER_WINDOW_AND_LISTENER,payload:{}}))
        .then   (()               => {waitingHandleResolve();})
        .catch  (()               => null);
};

const startupTwitterLogin = () => async (dispatch,getState) => {
    let twitterRequestToken = null;
    let twitterWindow = null;
    let twitterListener = null;
    let twitterInterval = null;
    let waitingHandleResolve = null;
    let waitingHandle = new Promise(resolve => waitingHandleResolve=resolve);
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()               => dispatch(processRequest(requestType.GET,endpoint.AUTH_TOKEN_TWITTER,{})))
        .then   (token            => twitterRequestToken=token.requestToken)
        .then   (()               => {twitterWindow = getState().client.userAccess.twitterWindow;})
        .then   (()               => ((twitterWindow===null)||(twitterWindow.closed)))
        .then   (openNewWindow    => {if (openNewWindow) twitterWindow = window.open(twitterAuthUri(twitterRequestToken),twitterWindowName,twitterWindowParams);})
        .then   (()               => twitterWindow.focus())
        .then   (()               => {twitterInterval = setInterval(() => {if (twitterWindow.closed) {waitingHandleResolve(); clearInterval(twitterInterval);}},REDIRECT_CLOSE_INTERVAL);})
        .then   (()               => {twitterListener = event => dispatch(processTwitterLogin(event,waitingHandleResolve));})
        .then   (()               => {window.addEventListener(EVENT_TYPE_MESSAGE,twitterListener);})
        .then   (()               => dispatch({type:actionType.RECEIVE_TWITTER_WINDOW_AND_LISTENER,payload:{twitterWindow,twitterListener}}))
        .then   (()               => waitingHandle)
        .then   (()               => ({twitterRequestToken:getState().client.userAccess.twitterRequestToken,twitterOAuthVerifier:getState().client.userAccess.twitterOAuthVerifier}));
};

export const signupTwitter = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupTwitterLogin()))
        .then   (tLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.AUTH_CREATE_TWITTER,tLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const loginTwitter = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupTwitterLogin()))
        .then   (tLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.AUTH_LOGIN_TWITTER,tLoginPackage)))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .then   (loginData        => dispatch(finalizeLogin(loginData)));
};

export const addTwitter = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupTwitterLogin()))
        .then   (tLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_ADD_TWITTER,tLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const updateTwitter = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(startupTwitterLogin()))
        .then   (tLoginPackage    => dispatch(processRequest(requestType.POST,endpoint.USERACCESS_UPDATE_TWITTER,tLoginPackage)))
        .then   (()               => dispatch(fetchUserChannels()))
        .catch  (error            => {dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareFallback(error,flareBook.errorFlare.FAILED_LOGIN))); return {loginError:true};})
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};

export const signupPayPal = () => async (dispatch,getState) => {
    return await Promise.resolve();
};

export const loginPayPal = () => async (dispatch,getState) => {
    return await Promise.resolve();
};

export const addPayPal = () => async (dispatch,getState) => {
    return await Promise.resolve();
};

export const updatePayPal = () => async (dispatch,getState) => {
    return await Promise.resolve();
};

export const sendRedirect = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => window.location.search)
        .then   (params           => JSON.parse('{"'+decodeURI(params).replace("?","").replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'))
        .then   (pJson            => ({
            origin:                 EVENT_DATA_ORIGIN_THRUBI,
            code:                   pJson.code,
            state:                  pJson.state,
            twitterRequestToken:    pJson.oauth_token,
            twitterOAuthVerifier:   pJson.oauth_verifier,
        }))
        .then   (pjRenamed        => {if (window.opener) window.opener.postMessage(pjRenamed);});
};