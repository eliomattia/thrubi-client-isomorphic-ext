import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CcyRow from "./tools/CcyRow";
import {transform} from "../actions/blockchain_ethereum";
import ActionButton from "./tools/ActionButton";

class _Transform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transformEthValue: 0,
            transformProcedureActive: false,
        };
    }

    render() {
        const {busy,transformBusy,populationId,exrate,ccySymbol,thrubiSilver,thrubiPriceSilver,thrubiFees,transform} = this.props;

        return(
            <div>
                {
                    busy ? "Transform loading..." :
                        populationId===-1 ? "Please select a population, first." :
                            transformBusy ? "Busy processing transform request" :
                                <Fragment>
                                    {
                                        !this.state.transformProcedureActive ? "" :
                                            <Fragment>
                                                <div className="small text-justify">
                                                    Blockchain transaction costs will be paid by you upon submitting the transaction.
                                                    Final transformed ₮S will depend upon Ξ exchange rates and ₮S price when your transaction is accepted.
                                                    Any excess Ξ that you transform will be credited on the account and used whenever ₮S becomes available.
                                                </div>
                                                <div className="text-secondary container">
                                                    {/*<CcyRow text="Your Ξ balance"
                                                             bold={false}
                                                             value=0 // add a worker that constantly checks Ξ balance from blockchain for account
                                                             ccySymbol="Ξ" />*/}
                                                    <CcyRow text="Ξ to spend to transform"
                                                            bold={false}
                                                            value={this.state.transformEthValue}
                                                            ccySymbol="Ξ" />
                                                    <CcyRow text={"Current value in "+ccySymbol}
                                                            bold={false}
                                                            value={(this.state.transformEthValue*exrate)}
                                                            ccySymbol={ccySymbol} />
                                                    <CcyRow text={"Thrubi fees ("+(thrubiFees*100).toFixed(1)+"%)"}
                                                            bold={false}
                                                            value={(this.state.transformEthValue*exrate)*thrubiFees}
                                                            ccySymbol={ccySymbol} />
                                                    <CcyRow text="You can transform"
                                                            bold={false}
                                                            value={(this.state.transformEthValue*exrate)*(1-thrubiFees)*(!thrubiPriceSilver?0:(1/thrubiPriceSilver))}
                                                            ccySymbol="₮S" />
                                                </div>
                                                <input id="transformEth" ref={input => this.transformEthRef = input} type="text" className="form-control form-control-sm rounded-0"
                                                           placeholder={this.transformEthValue} required
                                                           onChange={(action) => {
                                                               action.preventDefault();
                                                               let newValue = parseFloat(this.transformEthRef.value);
                                                               if (!newValue) newValue=0;
                                                               this.setState({transformEthValue: newValue});
                                                           }}/>
                                                <ActionButton buttonType={"btn-"+(this.state.transformEthValue?"primary":"light")}
                                                              disabled={!this.state.transformEthValue}
                                                              action={transform}
                                                              payload={this.state.transformEthValue}
                                                              text={this.state.transformEthValue?"Transform "+this.state.transformEthValue.toFixed(2)+" Ξ":"Insert an Ξ amount"} />
                                            </Fragment>
                                    }
                                    <ActionButton disabled={(!thrubiSilver)&&(!this.state.transformProcedureActive)}
                                                  buttonType={"btn-"+(this.state.transformProcedureActive?"":"outline-")+"secondary"+(thrubiSilver?" active":"")}
                                                  text={(this.state.transformProcedureActive?"Close":(thrubiSilver?"Activate transform procedure":"Nothing to transform"))}
                                                  action={() => this.setState({transformProcedureActive: !this.state.transformProcedureActive})} />
                                </Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    busy: state.session.busy.component.transform,
    transformBusy: state.session.busy.action.transform,
    populationId: state.client.population.id,
    thrubiSilver: state.client.member.thrubiSilver,
    thrubiPriceSilver: state.client.population.thrubiPriceSilver,
    thrubiFees: state.client.population.thrubiFees,
    ccySymbol: state.client.population.ccySymbol,
    exrate: state.global.market.exrate,
});

const Transform = withRouter(connect(mapStateToProps,{transform})(_Transform));

export default Transform;