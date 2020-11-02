import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CcyRow from "./tools/CcyRow";
import ActionButton from "./tools/ActionButton";
import {declareIncome} from "../actions/user";

class _MemberDeclareIncome extends Component {
    render() {
        const {mCurrent,ccySymbol,declareIncomeBusy,incomeApproved} = this.props;
        const {declareIncome} = this.props;
        let mDeclared;

        return (
            <Fragment>
                <div className="navbar-light col-lg-4 container-fluid row m-0">
                    {
                        declareIncomeBusy?"":
                            <Fragment>
                                <div className="col-lg-12">
                                    <CcyRow text="Declared income" bold={false} value={mCurrent} ccySymbol={ccySymbol}/>
                                </div>
                                <div className="col-lg-12 small py-2">
                                    Your income of {mCurrent} {ccySymbol} is currently:&nbsp;
                                    <span className={"badge "+(incomeApproved>0?"badge-info":"badge-danger")}>{incomeApproved>0?"Officially approved":(incomeApproved<0?"Pending approval":"Not approved")}</span>
                                </div>
                            </Fragment>
                    }
                </div>
                <div className="navbar-light col-lg-4 container-fluid row m-0">
                    {
                        declareIncomeBusy?"Busy processing income declaration":
                            <Fragment>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <input ref={input => mDeclared = input}
                                               type="text" className="form-control form-control-sm rounded-0 m-0"
                                               placeholder={mCurrent.toFixed(2)+" "+ccySymbol} required/>
                                    </div>
                                </div>
                                <div className="col-lg-12 p-0 m-0">
                                    <ActionButton text="Declare new income" action={() => declareIncome(mDeclared.value)}
                                                  buttonType="btn-primary m-0"/>
                                </div>
                            </Fragment>
                    }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccySymbol:          state.client.population.ccySymbol,
    mCurrent:           state.client.member.mCurrent,
    incomeApproved:     state.client.user.incomeApproved,
    declareIncomeBusy:  state.session.busy.action.declareIncome,
});

const MemberDeclareIncome = withRouter(connect(mapStateToProps,{declareIncome})(_MemberDeclareIncome));

export default MemberDeclareIncome;