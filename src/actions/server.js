import request from "request";
import {uri} from "../env/server";
import flareBook from "../config/flare";
import {requestType,headers} from "../config/http";

export const processRequest = (type,requestUri,json) => (dispatch,getState) => {
    return new Promise((resolve,reject) => {
        const callback = (error,response) => {
            let packet;
            let result;

            if (error) {
                reject(flareBook.errorFlare.THRUBI_CONNECTION_FAILED);
            } else {
                packet = response.body;
                if (response.statusCode===200) {
                    result = packet.result;
                    resolve(result);
                } else {
                    let errorPackage = flareBook.errorFlare.THRUBI_SERVER_ERROR;
                    errorPackage.serverError = packet.error;
                    reject(errorPackage);
                }
            }
        };

        try {
            const options = {
                url:uri+requestUri,
                json:(json===null?{}:json),
            };
            if (getState().client.userAccess.loggedIn) {
                options.headers={[headers.X_Access_Token]:(headers.Bearer+(getState().client.userAccess.accessJwt))};
            }
            if (type===requestType.GET) {
                request.get(options,callback);
            } else if (type===requestType.POST) {
                request.post(options,callback);
            }
        } catch (error) {
            reject(flareBook.errorFlare.THRUBI_CONNECTION_FAILED);
        }
    });
};