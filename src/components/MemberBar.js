import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import MemberInfo from "./MemberInfo";
import MemberDeclareIncome from "./MemberDeclareIncome";
import {removeMembership} from "../actions/member";

class _MemberBar extends Component {
    render() {
        const {countryName,ccyId,busy,loggedIn,populationId,identityCertified} = this.props;
        const {removeMembership} = this.props;

        return (
            <div className="container-fluid row p-0 m-0 text-primary text-center mt-3">
                {
                    busy ? "Viewport loading..." :
                        ((!loggedIn) || (populationId<0)) ? "" :
                            <Fragment>
                                <div className="col-lg-12 p-2 m-0 bg-primary text-light text-center mb-3">
                                    <span className="mt-3"><b>{countryName}</b>&nbsp;<small>{ccyId}&nbsp;<i>pid#{populationId}</i></small></span>
                                    <button className="close memberPaddingX text-light" type="button" onClick={() => removeMembership()} data-dismiss="alert"><span>&times;</span></button>
                                </div>
                                {
                                    identityCertified<=0
                                        ?
                                            <div className="col-sm-12">
                                                <MemberInfo />
                                            </div>
                                        :
                                            <Fragment>
                                                <div className="col-sm-4">
                                                    <MemberInfo />
                                                </div>
                                                <MemberDeclareIncome />
                                            </Fragment>
                                }
                            </Fragment>
                }
            </div>
        );
}
}

const mapStateToProps = state => ({
    countryName:        state.client.population.countryName,
    ccyId:              state.client.population.ccyId,
    ccySymbol:          state.client.population.ccySymbol,
    busy:               state.session.busy.component.viewport,
    loggedIn:           state.client.userAccess.loggedIn,
    populationId:       state.client.population.id,
    identityCertified:  state.client.user.identityCertified,
});

const MemberBar = withRouter(connect(mapStateToProps,{removeMembership})(_MemberBar));

export default MemberBar;