import actionType from "../../config/actionTypes";

const countryInit = {
    countries: [],
    id: null,
};

const country = (state = countryInit,action) => {
    switch (action.type) {
        case actionType.RECEIVE_COUNTRIES:
            return Object.assign({},state,{
                countries: action.payload.countries,
            });
        case actionType.SELECT_COUNTRY:
            return Object.assign({},state,{
                id: action.payload.countryId,
            });
        case actionType.DESELECT_COUNTRY:
            return Object.assign({},state,{
                id: null,
            });
        default:
            return state;
    }
};

export default country;