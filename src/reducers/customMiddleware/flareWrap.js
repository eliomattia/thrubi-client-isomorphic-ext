import flareBook from "../../config/flare";
import {emitFlare} from "../../actions/flare";
import {NODE_ENV} from "../../env/env";

const flareWrap = ({dispatch,getState}) => next => action => {
    if (typeof action === "function") { //it is the outer one
        return dispatch({action})       //wrap it (note: emitFlare in the catch also wrapped)
            .catch(error => {if (NODE_ENV!=="production") dispatch({action:emitFlare(flareBook.flareType.ERROR,error)});});
    }  else if (action.action) {        //it has been wrapped
        return next(action);
    }
};

export default flareWrap;

