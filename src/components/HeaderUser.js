import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {hideMenu} from "../actions/guest";
import UserProfilePicture from "./UserProfilePicture";
import {exactRoutes} from "../config/routes/routes";

class _HeaderUser extends Component {
    render() {
        const {loggedIn,profilePicture} = this.props;
        const {hideMenu} = this.props;
        return (
            <div className={"p-0 mx-3 "+(profilePicture?"marginProfilePicture sizeProfilePicture":"marginUserButton sizeUserButton")}
                 onClick={() => {hideMenu(); this.props.history.push(loggedIn?exactRoutes.USER_MENU.r:exactRoutes.AUTH_LOGIN.r);}}>
                <UserProfilePicture profileMode={false} />
            </div>
        );
}
}

const mapStateToProps = state => ({
    loggedIn:           state.client.userAccess.loggedIn,
    profilePicture:     state.client.user.profilePicture,
});

const HeaderRight = withRouter(connect(mapStateToProps,{hideMenu})(_HeaderUser));

export default HeaderRight;