import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import MultidimensionalSwitch from "./tools/MultidimensionalSwitch";
import MultidimensionalRoute from "./tools/MultidimensionalRoute";
import UserMenuButtons from "./UserMenuButtons";
import UserMenuAccount from "./UserMenuAccount";
import UserMenuPayment from "./UserMenuPayment";
import UserMenuAuthentication from "./UserMenuAuthentication";
import {logout} from "../actions/auth";
import {switchOptionUserMenu,close} from "../actions/user";
import {optionUserMenu} from "../config/user";
import {exactRoutes} from "../config/routes/routes";

class _UserMenu extends Component {
    render() {
        const {selected} = this.props;

        return (
            <Fragment>
                <UserMenuButtons />
                <MultidimensionalSwitch>
                    <MultidimensionalRoute path={exactRoutes.USER_MENU_ACCOUNT}         alt={selected===optionUserMenu.ACCOUNT}        component={UserMenuAccount} />
                    <MultidimensionalRoute path={exactRoutes.USER_MENU_PAYMENT}         alt={selected===optionUserMenu.PAYMENT}        component={UserMenuPayment} />
                    <MultidimensionalRoute path={exactRoutes.USER_MENU_AUTHENTICATION}  alt={selected===optionUserMenu.AUTHENTICATION} component={UserMenuAuthentication} />
                </MultidimensionalSwitch>
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
    loggedIn:           state.client.userAccess.loggedIn,
    selected:           state.client.user.optionUserMenu,
});

const UserMenu = withRouter(connect(mapStateToProps,{switchOptionUserMenu,logout,close})(_UserMenu));

export default UserMenu;


