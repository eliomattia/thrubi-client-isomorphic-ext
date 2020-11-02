import React,{Component,Fragment} from "react";
import CcyRow from "./tools/CcyRow";
import MemberOptions from "./MemberOptions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class _MemberBlue extends Component {
    render() {
        const {ccySymbol,member,exrate,optionViewHistory,optionAdvancedMode,} = this.props;
        
        return (
            <div className="container-fluid">
                {
                    optionAdvancedMode ?
                        <Fragment>
                            <CcyRow text="My Thrubi Blue ₮B" bold={false} value={ member.thrubiBlue} ccySymbol="₮B" />
                            <CcyRow text="Next month ₮B" bold={false} value={ member.thrubiBlueNext} ccySymbol="₮B" />
                            <CcyRow text="Claimable Ξ" bold={false} value={ member.thrubiBlueEth} ccySymbol="Ξ" />
                            <CcyRow text="₮B awards" bold={false} value={ member.thrubiBlueAward} ccySymbol={ccySymbol} />
                            <CcyRow text={"Claimable in "+ccySymbol} bold={true} value={(member.thrubiBlueEth*exrate)} ccySymbol={ccySymbol} />
                        </Fragment>
                        :
                        <Fragment>
                            <CcyRow text="My Thrubi Blue ₮B" bold={false} value={ member.thrubiBlue} ccySymbol="₮B" />
                            <CcyRow text={"Claimable in "+ccySymbol} bold={true} value={(member.thrubiBlueEth*exrate)} ccySymbol={ccySymbol} />
                        </Fragment>
                }
                {
                    !optionViewHistory ? "" :
                        <Fragment>
                            <CcyRow text="Total awards" bold={false} value={member.thrubiBlueAwardTotal} ccySymbol={ccySymbol} />
                            <CcyRow text="Total claimed" bold={false} value={member.thrubiBlueClaimTotal} ccySymbol={ccySymbol} />
                        </Fragment>
                }
                <MemberOptions color="primary"/>
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    ccySymbol:          ownProps.ccySymbol,
    member:             ownProps.member,
    exrate:             ownProps.exrate,
    optionViewHistory:  ownProps.optionViewHistory,
    optionAdvancedMode: ownProps.optionAdvancedMode,
});

const MemberBlue = withRouter(connect(mapStateToProps,{})(_MemberBlue));

export default MemberBlue;
