import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Channel from "../classes/Channel";
import ActionButton from "./tools/ActionButton";
import * as auth from "../actions/auth";
import {logAction} from "../actions/log";
import {loggableActionType} from "../config/user";
import AuthKeyboard from "./AuthKeyboard";

class _UserMenuAuthentication extends Component {
    authFunction(actionType,channelName,formFields) {
        const {logAction} = this.props;

        return () => {
            if (actionType==="UPDATE"||actionType==="DELETE"||actionType==="ADD") {
                logAction(loggableActionType.clickChannel,actionType+"_"+channelName);
            }
            if (channelName===Channel.channelName.KEYBOARD) {
                this.props[actionType.toLowerCase()+Channel.channelAuthFunctionName(channelName)](formFields.username.value,formFields.password.value);
            } else {
                this.props[actionType.toLowerCase()+Channel.channelAuthFunctionName(channelName)]();
            }
        }
    }

    render() {
        let formFields = {username:null,password:null};
        const {channels} = this.props;
        const {deleteChannel} = this.props;

        return (
            <div className="text-center small m-3 m-lg-4">
                {
                    Object.keys(channels).map(key => // loop on individual channel types
                        [
                            {
                                type:   "UPDATE",
                                action: key => this.authFunction("UPDATE",key,formFields),
                                color:  "outline-",
                                filled: false,
                                filter: channelMode => ((Channel.channelIsForLogin(channelMode)||(Channel.channelIsForPay(channelMode)))&&(Channel.channelIsOpen(channelMode)))
                            },
                            {
                                type:   "DELETE",
                                action: key => () => deleteChannel(key),
                                color:  "",
                                filled: true,
                                filter: channelMode => ((Channel.channelIsForLogin(channelMode)||(Channel.channelIsForPay(channelMode)))&&(Channel.channelIsOpen(channelMode)))
                            },
                            {
                                type:   "ADD",
                                color:  "outline-",
                                filled: false,
                                action: key => this.authFunction("ADD",key,formFields),
                                filter: channelMode => (!Channel.channelIsOpen(channelMode))
                            },
                        ].map(action => {
                            if (action.filter(channels[key])) return (
                                <div key={action.type}>
                                    {
                                        key!==Channel.channelName.KEYBOARD||action.type==="DELETE"?"":
                                            <AuthKeyboard formFields={formFields} noOr={true} />
                                    }
                                    <ActionButton
                                        channel={key}
                                        text={Channel.channelUserFriendlyName(key,action.type)}
                                        key={action.type.toLowerCase()+key}
                                        action={action.action(key)}
                                        buttonType={"rounded-pill p-0 btn-"+action.color}
                                        filled={action.filled}
                                    />
                                </div>
                            ); else return "";

                        })
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ethAddress:         state.client.userAccess.ethAddress,
    autoLogin:          state.client.userAccess.autoLogin,
    payChannel:         state.client.userAccess.payChannel,
    receiveChannel:     state.client.userAccess.receiveChannel,
    channels:           state.client.userAccess.channels,
});

const UserMenuAuthentication = withRouter(connect(mapStateToProps,Object.assign({},auth,{logAction}))(_UserMenuAuthentication));

export default UserMenuAuthentication;