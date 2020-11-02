import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Channel from "../classes/Channel";
import ActionButton from "./tools/ActionButton";
import AuthKeyboard from "./AuthKeyboard";
import * as auth from "../actions/auth";
import {switchOptionUserMenu} from "../actions/user";
import {logAction} from "../actions/log";
import {loggableActionType} from "../config/user";
import {exactRoutes,routeParams} from "../config/routes/routes";

class _AuthLoginSignup extends Component {
    authFunction(actionType,channelName,...params) {
        const {logAction} = this.props;

        return () => {
            if (actionType===routeParams.LOGIN_SIGNUP.values.LOGIN||actionType===routeParams.LOGIN_SIGNUP.values.SIGNUP) {
                logAction(loggableActionType.clickChannel,actionType.toUpperCase()+"_"+channelName);
            }
            this.props[actionType.toLowerCase()+Channel.channelAuthFunctionName(channelName)](...params)
                .then(() => this.props.history.push(exactRoutes.USER.r));
        }
    }

    render() {
        let formFields = {username:null,password:null};
        const {busy,loggedIn,channels} = this.props;
        const {match: {params: {loginSignup}}} = this.props;

        return <div className="text-center small">
            {
                busy?"Auth module busy...":
                    <Fragment>
                        {
                            Object.keys(channels).map(key => {    //loop on individual channel types
                                if (Channel.channelIsForLogin(channels[key]))
                                    return (
                                        <div key={key}>
                                            {
                                                key!==Channel.channelName.KEYBOARD?"":<AuthKeyboard formFields={formFields} />
                                            }
                                            <ActionButton
                                                channel={key}
                                                text={Channel.channelUserFriendlyName(key,loginSignup)}
                                                key={(loginSignup===routeParams.LOGIN_SIGNUP.values.LOGIN?"login":"create")+key}
                                                action={
                                                    key===Channel.channelName.KEYBOARD
                                                    ? () => this.authFunction(loginSignup,key,formFields.username.value,formFields.password.value)()
                                                    : this.authFunction(loginSignup,key)
                                                }
                                                buttonType={"rounded-pill p-0 btn-"+(loginSignup===routeParams.LOGIN_SIGNUP.values.LOGIN?"outline-":"")}
                                                filled={loginSignup!==routeParams.LOGIN_SIGNUP.values.LOGIN}
                                            />
                                        </div>
                                    );
                                else return "";
                            })
                        }
                        {
                            loggedIn ? "" :
                                <ActionButton
                                    action={() => this.props.history.push(loginSignup===routeParams.LOGIN_SIGNUP.values.LOGIN?exactRoutes.AUTH_SIGNUP.r:exactRoutes.AUTH_LOGIN.r)}
                                    buttonType="nav-link border-0 text-small text-primary"
                                    text={loginSignup===routeParams.LOGIN_SIGNUP.values.LOGIN?"Create a new Thrubi account":"I already have a Thrubi account"} />
                        }
                    </Fragment>
            }
        </div>;
    }
}

const mapStateToProps = state => ({
    busy:               state.session.busy.component.auth,
    optionKeyboardMode: state.client.user.optionKeyboardMode,
    loggedIn:           state.client.userAccess.loggedIn,
    channels:           state.client.userAccess.channels,
});

const AuthLoginSignup = withRouter(connect(mapStateToProps,Object.assign({},auth,{logAction,switchOptionUserMenu}))(_AuthLoginSignup));

export default AuthLoginSignup;