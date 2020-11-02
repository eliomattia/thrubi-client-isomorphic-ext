import React,{Component,Fragment} from "react";
import CcyRow from "./tools/CcyRow";
import ActionButton from "./tools/ActionButton";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class _MemberGold extends Component {
    render() {
        const {ccySymbol,member,thrubiPriceGold} = this.props;
        return (
            <Fragment>
                <div className="container-fluid">
                    <CcyRow text="My Thrubi Gold" bold={true} value={member.thrubiGold} ccySymbol={"₮G"}/>
                    <CcyRow text="Market value" bold={false} value={(member.thrubiGold*thrubiPriceGold)}
                            ccySymbol={ccySymbol}/>
                </div>
                <ActionButton action={() => {
                }} text="Find gold Thrubi marketplace" buttonType="btn-outline-success"/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    ccySymbol:          ownProps.ccySymbol,
    member:             ownProps.member,
    thrubiPriceGold:    ownProps.thrubiPriceGold,
});

const MemberGold = withRouter(connect(mapStateToProps,{})(_MemberGold));

export default MemberGold;
