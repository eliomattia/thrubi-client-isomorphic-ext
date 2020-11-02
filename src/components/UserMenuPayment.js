import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Channel from "../classes/Channel";
import ActionButton from "./tools/ActionButton";
import {logAction} from "../actions/log";
import {routeParams} from "../config/routes/routes";

class _UserMenuPayment extends Component {
    render() {
        const {payChannel,receiveChannel,channels} = this.props;
        const {setPayChannel,setReceiveChannel} = this.props;

        return (
            <div className="text-center small m-3 m-lg-4">
                {

                    [
                        {message:"My basic income will be received via:",   activeChannel:receiveChannel, setter:setReceiveChannel,},
                        {message:"I will be able to pay basic income via:", activeChannel:payChannel,     setter:setPayChannel,},
                    ].map(o =>
                        <div className="my-4">
                            {o.message}
                            {
                                Object.keys(channels).map(key => {    //loop on individual channel types
                                    if (Channel.channelIsForPay(channels[key])) return (
                                        <ActionButton channel={key}
                                                      text={Channel.channelUserFriendlyName(key,(key===o.activeChannel?"USING":(Channel.channelIsOpen(channels[key])?"USE":"LINK")))}
                                                      key={(key===o.activeChannel?Channel.channelName.NOT_AVAILABLE:key)}
                                                      action={o.setter}
                                                      buttonType={"rounded-pill p-0 btn-"+(key===o.activeChannel?"":"outline-")}
                                                      filled={(key===o.activeChannel)}
                                                      disabledFilter={(key===o.activeChannel)}
                                                      activeFilter={o.activeChannel}
                                                      checkedFilter={o.activeChannel} />
                                    ); else return null;
                                })
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ethAddress:         state.client.userAccess.ethAddress,
    payChannel:         state.client.userAccess.payChannel,
    receiveChannel:     state.client.userAccess.receiveChannel,
    channels:           state.client.userAccess.channels,
});

const UserMenuPayment = withRouter(connect(mapStateToProps,{logAction})(_UserMenuPayment));

export default UserMenuPayment;