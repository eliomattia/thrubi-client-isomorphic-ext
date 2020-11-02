import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {activateUser,deactivateUser} from "../actions/user";
import {close} from "../actions/user";

class _UserStatus extends Component {
    render() {
        const {deactivated,activateUserBusy} = this.props;
        const {activateUser,deactivateUser,close} = this.props;
        return (
            <div className="w-100 mx-3 mt-5">
                {
                    activateUserBusy ? "Please wait, activation request in progress..." :
                        deactivated
                            ? <ActionButton text="Request activation" action={activateUser} buttonType="btn-outline-primary" />
                            : <ActionButton text="Deactivate my account" action={deactivateUser} buttonType="btn-outline-secondary" />
                }
                <ActionButton text="Close my account" action={close} buttonType="mt-3 btn-outline-red" />
            </div>
        );
    }
};

const mapStateToProps = state => ({
    deactivated: state.client.user.deactivated,
    activateUserBusy: state.session.busy.action.activateUser,
});

const UserStatus = withRouter(connect(mapStateToProps,{activateUser,deactivateUser,close})(_UserStatus));

export default UserStatus;