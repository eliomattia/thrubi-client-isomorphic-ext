import React,{Component,Fragment} from "react";
import CcyRow from "./tools/CcyRow";
import MemberOptions from "./MemberOptions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class _MemberSilver extends Component {
    render() {
        const {ccySymbol,member,thrubiPriceSilver,thrubiPriceGold,optionViewHistory,optionAdvancedMode} = this.props;
        return (
            <div className="container">
                {
                    optionAdvancedMode ?
                        <Fragment>
                            <CcyRow text="My Thrubi Silver ₮$" bold={true} value={ member.thrubiSilver} ccySymbol={"₮S"} />
                            <CcyRow text="Next month ₮$" bold={false} value={ member.thrubiSilverNext} ccySymbol={"₮S"} />
                            <CcyRow text="Conversion to gold cost" bold={false} value={(member.thrubiSilver*thrubiPriceSilver)} ccySymbol={ccySymbol} />
                            <CcyRow text="Gold value" bold={false} value={(member.thrubiSilver*thrubiPriceGold)} ccySymbol={ccySymbol} />
                            <CcyRow text="Remaining Ξ" bold={false} value={ member.thrubiSilverEth} ccySymbol={"Ξ"} />
                        </Fragment>
                        :
                        <Fragment>
                            <CcyRow text="My Thrubi Silver ₮$" bold={true} value={ member.thrubiSilver} ccySymbol={"₮S"} />
                            <CcyRow text="Conversion to gold cost" bold={false} value={(member.thrubiSilver*thrubiPriceSilver)} ccySymbol={ccySymbol} />
                            <CcyRow text="Gold value" bold={false} value={(member.thrubiSilver*thrubiPriceGold)} ccySymbol={ccySymbol} />
                        </Fragment>
                }
                {
                    !optionViewHistory ? "" :
                            <CcyRow text="Total transformed" bold={false} value={ member.thrubiSilverTransformTotal} ccySymbol={ccySymbol} />
                }
                <MemberOptions color="secondary" />
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    ccySymbol:          ownProps.ccySymbol,
    member:             ownProps.member,
    thrubiPriceSilver:  ownProps.thrubiPriceSilver,
    thrubiPriceGold:    ownProps.thrubiPriceGold,
    optionViewHistory:  ownProps.optionViewHistory,
    optionAdvancedMode: ownProps.optionAdvancedMode,
});

const MemberSilver = withRouter(connect(mapStateToProps,{})(_MemberSilver));

export default MemberSilver;
