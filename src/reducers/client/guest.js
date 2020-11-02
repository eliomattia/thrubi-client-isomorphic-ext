import actionType from "../../config/actionTypes";
import {guestMenuOption} from "../../config/guest";

const guestInit = {
    subscribed:         false,
    menuOpen:           false,
    guestMenuOption:    guestMenuOption.HOME,
    faqState:           {},
};

const guest = (state = guestInit,action) => {
    switch (action.type) {
        case actionType.APP_SHUTDOWN:
        case actionType.LOGOUT:
            return Object.assign({},guestInit);
        case actionType.SHOW_MENU:
            return Object.assign({},state,{
                menuOpen:                       true,
            });
        case actionType.HIDE_MENU:
            return Object.assign({},state,{
                menuOpen:                       false,
            });
        case actionType.TOGGLE_MENU:
            return Object.assign({},state,{
                menuOpen:                       !state.menuOpen,
            });
        case actionType.SET_GUEST_SUBSCRIBED:
            return Object.assign({},state,{
                subscribed:                     action.payload.guestSubscribed,
            });
        case actionType.TOGGLE_FAQ_STATE:
            return Object.assign({},state,{faqState:Object.assign({},state.faqState,{
                [action.payload.actionValue]:   !state.faqState[action.payload.actionValue],
            })});
        case actionType.RECEIVE_GUEST_MENU_OPTION:
            return Object.assign({},state,{
                guestMenuOption:                action.payload.guestMenuOption,
            });
        default:
            return state;
    }
};

export default guest;
