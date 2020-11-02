import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CcyRow from "./tools/CcyRow";
import {claim} from "../actions/member";
import ActionButton from "./tools/ActionButton";

class _Claim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claimProcedureActive: false,
        };
    }

    render() {
        const {busy,populationId,claimBusy,thrubiBlueEth,ccySymbol,exrate,claim} = this.props;

        return(
            <div className="claimItem">
                {
                    busy ? "Claim loading..." :
                        populationId === -1 ? "Please select a population, first." :
                            claimBusy ? "Busy processing claim" :
                                <div className="text-primary">
                                    {
                                        !this.state.claimProcedureActive ? "" :
                                            <Fragment>
                                                <div className="small text-justify">
                                                    Fees will be deducted to pay for the blockchain transaction.
                                                    The remaining Ξ will be credited in full, values in { ccySymbol } are just an indication.
                                                </div>
                                                <div className="container">
                                                    <CcyRow text="You can claim" bold={false} value={thrubiBlueEth} ccySymbol="Ξ" />
                                                    <CcyRow text={"Claimable in "+ccySymbol} bold={false} value={(thrubiBlueEth * exrate)} ccySymbol={ccySymbol} />

                                                </div>
                                                <ActionButton action={claim} disabled={!thrubiBlueEth}
                                                              buttonType={"btn-"+(thrubiBlueEth?"primary":"light")}
                                                              text={thrubiBlueEth?("Claim your " +thrubiBlueEth.toFixed(2) + " Ξ"):"Nothing to claim"}/>
                                            </Fragment>
                                    }
                                    <ActionButton
                                        disabled={((!thrubiBlueEth)&&(!this.state.claimProcedureActive))}
                                        buttonType={"btn-"+(this.state.claimProcedureActive?"":"outline-")+"primary"+(thrubiBlueEth?" active":"")}
                                        text={(this.state.claimProcedureActive?"Close":(thrubiBlueEth?"Activate claim procedure":"Nothing to claim"))}
                                        action={() => {this.setState({claimProcedureActive: !this.state.claimProcedureActive});}} />
                                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    busy:               state.session.busy.component.claim,
    populationId:       state.client.population.id,
    claimBusy:          state.session.busy.action.claim,
    thrubiBlueEth:      state.client.member.thrubiBlueEth,
    ccySymbol:          state.client.population.ccySymbol,
    exrate:             state.global.market.exrate,
});

const Claim = withRouter(connect(mapStateToProps,{claim})(_Claim));

export default Claim;