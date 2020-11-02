import actionType from "../../config/actionTypes";

const memberInit = {
    isMember: false,
    mCurrent: 0,
    thrubiMode: -1,
    thrubiBlue: 0,                  // ₿₮
    thrubiBlueNext: 0,              // ₿₮
    thrubiBlueEth: 0,               // Ξ
    thrubiBlueAward: 0,             // local
    thrubiBlueAwardTotal: 0,        // local
    thrubiBlueClaimTotal: 0,        // local
    thrubiSilver: 0,                // $₮
    thrubiSilverNext: 0,            // $₮
    thrubiSilverEth: 0,             // Ξ
    thrubiSilverTransformTotal: 0,  // local
    thrubiGold: 0,                  // ₲₮
};

const member = (state = memberInit,action) => {
    switch (action.type) {
        case actionType.APP_SHUTDOWN:
        case actionType.LOGOUT:
        case actionType.CLEAR_MEMBER:
            return memberInit;
        case actionType.RECEIVE_MEMBER:
            return Object.assign({},state,{
                isMember:                   true,
                mCurrent:                   parseFloat(action.payload.member.mCurrent),
                thrubiMode:                 parseInt  (action.payload.member.thrubiMode),
                thrubiBlue:                 parseFloat(action.payload.member.thrubiBlue),
                thrubiBlueNext:             parseFloat(action.payload.member.thrubiBlueNext),
                thrubiBlueEth:              parseFloat(action.payload.member.thrubiBlueEth),
                thrubiBlueAward:            parseFloat(action.payload.member.thrubiBlueAward),
                thrubiBlueAwardTotal:       parseFloat(action.payload.member.thrubiBlueAwardTotal),
                thrubiBlueClaimTotal:       parseFloat(action.payload.member.thrubiBlueClaimTotal),
                thrubiSilver:               parseFloat(action.payload.member.thrubiSilver),
                thrubiSilverNext:           parseFloat(action.payload.member.thrubiSilverNext),
                thrubiSilverEth:            parseFloat(action.payload.member.thrubiSilverEth),
                thrubiSilverTransformTotal: parseFloat(action.payload.member.thrubiSilverTransformTotal),
                thrubiGold:                 parseFloat(action.payload.member.thrubiGold),
            });
        default:
            return state;
    }
};

export default member;