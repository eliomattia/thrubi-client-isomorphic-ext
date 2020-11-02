import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import RadioButtons from "./tools/RadioButtons";
import {logout} from "../actions/auth";
import {switchOptionUserMenu} from "../actions/user";
import {optionUserMenu} from "../config/user";
import {exactRoutes} from "../config/routes/routes";

class _UserMenuButtons extends Component {
    render() {
        const {selected} = this.props;
        const {logout} = this.props;

        return (
            <div className="container-fluid row m-0 p-0">
                <div className="col-lg-2 p-0">
                    <ActionButton action={logout} payload={{autoLogin: false}}
                                  buttonType=" p-0 btn-secondary roundedTop noBottomBorder py-2 "
                                  noMargin={true}>
                        Logout
                    </ActionButton>
                </div>
                <div className="col-lg-10 p-0">
                    <RadioButtons columnSize="col-lg-4"
                              activeFilter={selected}
                              checkedFilter={selected}
                              invertFilters={true}
                              action={this.props.history.push}
                              elements={[
                                  {color:"btn-outline-primary roundedTop noBottomBorder",route:exactRoutes.USER_MENU_ACCOUNT.r,       key:optionUserMenu.ACCOUNT,       text:"My account",    disabledFilter:selected===optionUserMenu.ACCOUNT},
                                  {color:"btn-outline-primary roundedTop noBottomBorder",route:exactRoutes.USER_MENU_PAYMENT.r,       key:optionUserMenu.PAYMENT,       text:"Payments",      disabledFilter:selected===optionUserMenu.PAYMENT},
                                  {color:"btn-outline-primary roundedTop noBottomBorder",route:exactRoutes.USER_MENU_AUTHENTICATION.r,key:optionUserMenu.AUTHENTICATION,text:"Authentication",disabledFilter:selected===optionUserMenu.AUTHENTICATION},
                              ]}/>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    selected:           state.client.user.optionUserMenu,
});

const UserMenuButtons = withRouter(connect(mapStateToProps,{switchOptionUserMenu,logout})(_UserMenuButtons));

export default UserMenuButtons;


