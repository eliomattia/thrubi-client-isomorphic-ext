import {processRequest} from "./server";
import {emitFlare} from "./flare";
import {logout} from "./auth";
import {activationState,detailName,flagFlare,userFlags} from "../config/user";
import flareBook from "../config/flare";
import {requestType} from "../config/http";
import actionType, {busyPayload} from "../config/actionTypes";
import {endpoint} from "../config/server";
import {INTERVAL_USER_WORKER} from "../env/workers";
import {AMAZON_S3_MAX_PICTURE_SIZE,MIME_TYPE_JPEG,MIME_TYPE_PNG} from "../config/s3";
import {uploadS3} from "./s3";

export const switchOptionUserMenu = optionUserMenu => async (dispatch,getState) => {
    return dispatch({type:actionType.SWITCH_OPTION_USER_MENU,payload:{optionUserMenu}});
};

export const fetchDetails = () => async (dispatch,getState) => {
    let details = {};
    return await Promise.resolve()
        .then   (()               => dispatch(processRequest(requestType.GET,endpoint.USER_DETAILS_FETCH,null)))
        .then   (result           => result.map((detail,i) => details[detail.detailName]=detail.detailValue))
        .then   (()               => dispatch({type:actionType.RECEIVE_USER_DETAILS,payload:details}))
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_USER_DETAILS)));
};

export const deleteDetails = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_USERDETAILS}))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USER_DETAILS_DELETE,{userDetails:{[detailName.all]:true}})))
        .then   (()               => dispatch({type:actionType.DELETE_USER_DETAILS,payload:{}}))
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_USER_DETAILS)))
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_USERDETAILS}));
};

export const deleteProfilePicture = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_USERDETAILS}))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USER_DETAILS_DELETE,{userDetails:{[detailName.profilePicture]:true}})))
        .then   (()               => dispatch({type:actionType.DELETE_PROFILE_PICTURE,payload:{}}))
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_USER_DETAILS)))
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_USERDETAILS}));
};

export const storeDetails = (userDetails,overwrite) => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_USERDETAILS}))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USER_DETAILS_STORE,Object.assign({},{userDetails},overwrite))))
        .then   (()               => dispatch(fetchDetails()))
        .catch  (error            => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_USER_DETAILS)))
        .finally(()               => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_USERDETAILS}));
};

export const uploadProfilePicture = fileRef => async (dispatch,getState) => {
    let awsPacket;
    let picture=fileRef.files[0];
    return await Promise.resolve()
        .then   (()               => {if (!(picture.type===MIME_TYPE_JPEG||picture.type===MIME_TYPE_PNG)) throw flareBook.errorFlare.ERR_USER_PROFILE_PICTURE;})
        .then   (()               => {if (picture.size>AMAZON_S3_MAX_PICTURE_SIZE) throw flareBook.errorFlare.ERR_USER_PROFILE_PICTURE;})
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USER_PROFILEPICTURE_SIGN,{fileName:picture.name,fileType:picture.type,fileSize:picture.size})))
        .then   (packet           => awsPacket=packet)
        .then   (()               => dispatch(uploadS3(awsPacket.signedPutUri,picture)))
        .then   (()               => dispatch(storeDetails({[detailName.profilePicture]:awsPacket.unsignedGetUri},{overwrite:true})))
        .finally(()               => fileRef.value=null);
};

export const verifyEmail = token => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.VERIFY_EMAIL,{token})))
        .then   (userFlags        => dispatch({type:actionType.RECEIVE_USER_FLAGS,payload:userFlags}))
        .catch  (()               => dispatch({type:actionType.SIGNAL_EMAIL_VERIFY_ERROR,payload:{}}));
};

export const uploadDocument = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()               => dispatch(storeDetails({[detailName.submittedDocument]:true},{overwrite:true})))
        .then   (()               => dispatch(processRequest(requestType.POST,endpoint.USER_CERTIFY,{})));
};

const flareUserFlags = flags => async (dispatch,getState) => {
    Object.keys(userFlags).map(async flag => {
            const currentFlag = getState().client.user[flag];
            const incomingFlag = flags[flag];
            if ((currentFlag!==null)&&(((currentFlag===0)^(incomingFlag===0))||(Math.sign(currentFlag)>0)^(Math.sign(incomingFlag)>0)))
                return await dispatch(emitFlare(flareBook.flareType.INFO,flagFlare(incomingFlag,flag)));
        }
    );
};

export const activateUserWorker = () => async (dispatch,getState) => {
    let userWorker = setInterval((() => {
        let userFlags;
        const activity = async () => {
            await Promise.resolve()
                .then (()         => dispatch(processRequest(requestType.GET,endpoint.USER_GETFLAGS,null)))
                .then (flags      => userFlags=flags)
                .then (()         => dispatch(flareUserFlags(userFlags)))
                .then (()         => dispatch({type:actionType.RECEIVE_USER_FLAGS,payload:userFlags}))
                .catch(error      => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_USER_FLAGS)));
        };
        activity();
        return activity;
    })(),INTERVAL_USER_WORKER);
    dispatch({type:actionType.RECEIVE_USER_WORKER,payload:{userWorker}});
};

export const stopUserWorker = () => async (dispatch,getState) => {
    clearInterval(getState().session.workers.user);
    dispatch({type:actionType.STOP_USER_WORKER,payload:{}});
};

export const activateUser = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()              => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_ACTIVATEUSER}))
        .then   (()              => dispatch({type:actionType.CLEAR_POPULATION,payload:{}}))
        .then   (()              => dispatch(processRequest(requestType.POST,endpoint.USER_ACTIVATE,null)))
        .then   (()              => dispatch({type:actionType.SET_USER_ACTIVATED,payload:{}}))
        .catch  (error           => {throw flareBook.flareFallback(error,flareBook.errorFlare.USER_ACTIVATION);})
        .finally(()              => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_ACTIVATEUSER}));
};

export const deactivateUser = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()              => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_ACTIVATEUSER}))
        .then   (()              => dispatch({type:actionType.CLEAR_POPULATION,payload:{}}))
        .then   (()              => dispatch(processRequest(requestType.POST,endpoint.USER_DEACTIVATE,{activationState:activationState.userRequestDeactivated})))
        .then   (()              => dispatch({type:actionType.SET_USER_DEACTIVATED,payload:{}}))
        .catch  (error           => {throw flareBook.flareFallback(error,flareBook.errorFlare.USER_ACTIVATION);})
        .finally(()              => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_ACTIVATEUSER}));
};

export const declareIncome = mDeclared => async (dispatch,getState) => {
    return Promise.resolve()
        .then  (()              => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_ACTION_DECLAREINCOME}))
        .then  (()              => dispatch(processRequest(requestType.POST,endpoint.MEMBER_REQUEST_DECLAREINCOME+"/"+getState().client.population.id+"/"+mDeclared,null)))
        .catch (error           => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.flareType.ERR_GENERIC_USERMENU)))
        .finally(()              => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_ACTION_DECLAREINCOME}));
};

export const close = () => async (dispatch,getState) => {
    return await Promise.resolve()
        .then   (()             => dispatch({type:actionType.SET_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}))
        .then   (()             => dispatch(processRequest(requestType.POST,endpoint.USER_CLOSE,{})))
        .then   (()             => dispatch(logout({autoLogin:false})))
        .catch  (error          => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.ERR_ACCOUNT_CLOSE)))
        .finally(()              => dispatch({type:actionType.SET_NOT_BUSY,payload:busyPayload.BUSY_COMPONENT_AUTH}));
};