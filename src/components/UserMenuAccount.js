import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import UserView from "./UserView";
import UserManageDetails from "./UserManageDetails";
import UserStatus from "./UserStatus";

class _UserMenuAccount extends Component {
    render() {
        return (
            <div className="container-fluid row m-0 p-0 pt-5">
                <UserView />
                <UserManageDetails />
                <UserStatus />
            </div>
        );
    };
}

const mapStateToProps = state => ({
});

const UserMenuAccount = withRouter(connect(mapStateToProps,{})(_UserMenuAccount));

export default UserMenuAccount;


