import axios from "axios";
import flareBook from "../config/flare";

export const uploadS3 = (signedRequest,picture) => async (dispatch,getState) => {
    const config = {
        headers: {
            "Content-Type":     picture.type,
        },
    };
    return Promise.resolve()
        .then (()       => axios.put(signedRequest,picture,config))
        .catch(e       => {throw flareBook.errorFlare.S3_UPLOAD_ERROR;});
};