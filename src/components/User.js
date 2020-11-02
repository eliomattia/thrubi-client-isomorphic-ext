import React,{Component,Fragment} from "react";
import {Redirect,withRouter} from "react-router";
import {connect} from "react-redux";
import MemberBar from "./MemberBar";
import UserIdentity from "./UserIdentity";
import ThrubiBlue from "./ThrubiBlue";
import ThrubiSilver from "./ThrubiSilver";
import ThrubiGold from "./ThrubiGold";
import PopulationSelect from "./PopulationSelect";
import PopulationAdd from "./PopulationAdd";
import PopulationDelete from "./PopulationDelete";
import PopulationTune from "./PopulationTune"
import UserActivationChecklist from "./UserActivationChecklist";
import "./styles/User.scss";
import {exactRoutes} from "../config/routes/routes";

class _User extends Component {
    render() {
        const {busy,loggedIn,role,identityCertified,isMember,member} = this.props;

        return(
            <div className="container-fluid row p-0 m-0 mb-5">
                {loggedIn?"":<Redirect to={exactRoutes.ROOT.r} />}
                {
                    busy ? "User loading..." :
                        <Fragment>
                            <div className="col-lg-12 navbar-light p-0">
                                <div>
                                    <div className="container row">
                                        <div className="col-lg-2" />
                                        <div className="col-lg-8">
                                            <UserActivationChecklist />
                                        </div>
                                        <div className="col-lg-2" />
                                    </div>
                                    {
                                        !isMember?
                                            <Fragment>
                                                <PopulationSelect refList={false} />
                                                {!role?"":<PopulationAdd />}
                                            </Fragment>
                                            :
                                            <div className="bg-light mr-2 ml-2">
                                                <MemberBar/>
                                                {
                                                    identityCertified<=0?
                                                        <div>
                                                            <UserIdentity />
                                                        </div>
                                                        :
                                                        <Fragment>
                                                            {
                                                                !role?
                                                                    <Fragment>
                                                                        <div
                                                                            className="container-fluid row p-0 m-0">
                                                                            <div
                                                                                className="col-lg-4 thrubiBlue navbar-light">
                                                                                {(member.thrubiBlue||member.thrubiBlueNext||member.thrubiBlueEth
                                                                                    ||member.thrubiBlueAward||member.thrubiBlueAwardTotal||member.thrubiBlueClaimTotal)
                                                                                    ?<ThrubiBlue />:""}
                                                                            </div>
                                                                            <div
                                                                                className="col-lg-4 thrubiSilver navbar-light">
                                                                                {(member.thrubiSilver||member.thrubiSilverNext||member.thrubiSilverEth
                                                                                    ||member.thrubiSilverTransformTotal)
                                                                                    ?<ThrubiSilver />:""}
                                                                            </div>
                                                                            <div
                                                                                className="col-lg-4 thrubiGold navbar-light">
                                                                                {(member.thrubiGold)
                                                                                    ?<ThrubiGold />:""}
                                                                            </div>
                                                                        </div>
                                                                    </Fragment>
                                                                    :
                                                                    <Fragment>
                                                                        <div className="col-lg-4 navbar-light">
                                                                            <PopulationDelete />
                                                                        </div>
                                                                        <div className="col-lg-4 navbar-light">
                                                                            <PopulationTune />
                                                                        </div>
                                                                    </Fragment>
                                                            }
                                                        </Fragment>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                        </Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    busy:               state.session.busy.component.user,
    loggedIn:           state.client.userAccess.loggedIn,
    role:               state.client.user.role,
    populationId:       state.client.population.id,
    isMember:           state.client.member.isMember,
    member:             state.client.member,
    identityCertified:  state.client.user.identityCertified,
});

const User = withRouter(connect(mapStateToProps,{})(_User));

export default User;