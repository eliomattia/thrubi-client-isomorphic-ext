import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const _MemberInfo = ({
    ccySymbol,
    exrate,
    thrubiSilver,
    thrubiSilverNext,
    thrubiPriceSilver,
    thrubiPriceSilverNext,
    thrubiPriceGold,
}) => (
    <div className="container-fluid p-0 m-0 small consoleFont">
        <div className="col-sm-12 container-fluid row p-0 m-0">
            <div className="col-5 container-fluid p-0 m-0 text-right">
                <div className="col-sm-12 p-0">1.00Ξ</div>
                { (thrubiSilver || thrubiSilverNext) ? <div className="col-sm-12 p-0">1.00₮S</div> : "" }
                { /* <div className="col-sm-12 p-0">1.00₮S</div> */ }
                { /* <div className="col-sm-12 p-0">1.00₮G</div> */ }
            </div>
            <div className="col-2 container-fluid p-0 m-0 text-center">
                <div className="col-sm-12 p-0">=</div>
                { (thrubiSilver || thrubiSilverNext) ? <div className="col-sm-12 p-0">=</div> : "" }
                { /* <div className="col-sm-12 p-0">=</div> */ }
                { /* <div className="col-sm-12 p-0">=</div> */ }
            </div>
            <div className="col-5 container-fluid p-0 m-0 text-left">
                <div className="col-sm-12 p-0">{exrate.toFixed(2)}{ccySymbol}</div>
                    { (thrubiSilver || thrubiSilverNext) ? <div className="col-sm-12 p-0">{thrubiPriceSilver.toFixed(2)}{ccySymbol}</div> : "" }
                { /* <div className="col-sm-12 p-0">{thrubiPriceSilverNext.toFixed(2)}{ccySymbol} (next month)</div> */ }
                { /* <div className="col-sm-12 p-0">{thrubiPriceGold.toFixed(2)}{ccySymbol}</div> */ }
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    ccySymbol:              state.client.population.ccySymbol,
    exrate:                 state.global.market.exrate,
    thrubiSilver:           state.client.member.thrubiSilver,
    thrubiSilverNext:       state.client.member.thrubiSilverNext,
    thrubiPriceSilver:      state.client.population.thrubiPriceSilver,
    thrubiPriceSilverNext:  state.client.population.thrubiPriceSilverNext,
    thrubiPriceGold:        state.client.population.thrubiPriceGold,
});

const MemberInfo = withRouter(connect(mapStateToProps,{})(_MemberInfo));

export default MemberInfo;