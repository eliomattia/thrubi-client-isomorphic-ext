const thunkWrap = ({dispatch,getState}) => next => action => {
    if (typeof action.action === "function") {
        return action.action(action => dispatch({action}),getState);
    }

    return next(action.action);
};

export default thunkWrap;

