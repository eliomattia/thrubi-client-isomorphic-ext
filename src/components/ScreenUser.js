import React,{Component,Fragment} from "react";
import {Redirect,withRouter} from "react-router";
import {connect} from "react-redux";
import UserMenu from "./UserMenu";
import "./styles/App.scss";
import {exactRoutes} from "../config/routes/routes";

class _ScreenUser extends Component {
    render() {
        const {loggedIn} = this.props;

        return (
            <Fragment>
                {loggedIn?"":<Redirect to={exactRoutes.ROOT.r} />}
                <div id="bgTargetOuter" onClick={e => {if (e.target.id.includes("bgTarget")) this.props.history.push(exactRoutes.USER.r);}}
                     className="topMargin p-0 bgShadow fixed-top w-100 remainingHeight d-flex flex-column align-items-end overflow-auto">
                    <div id="bgTargetVertical" className="container-fluid col-11 col-lg-8 m-0 p-0 d-flex flex-row flex-grow-1">
                        <div id="bgSolidHorizontal" className="w-100 bg-white position-relative">
                            <UserMenu />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
    loggedIn:           state.client.userAccess.loggedIn,
});

const ScreenUser = withRouter(connect(mapStateToProps,{})(_ScreenUser));

export default ScreenUser;


