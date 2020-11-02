import React,{Component} from "react";
import {Route,Switch,withRouter} from "react-router";
import {connect} from "react-redux";
import Logo from "../classes/Logo";
import EthBadges from "./EthBadges";
import HeaderClose from "./HeaderClose";
import HeaderUser from "./HeaderUser";
import HeaderMenu from "./HeaderMenu";
import {exactRoutes,nestedRoutes} from "../config/routes/routes";
import {hideMenu} from "../actions/guest";

class _Header extends Component {
    render() {
        const {hideMenu} = this.props;
        return (
            <div className="container-fluid navbar fixed-top p-0 w-100 headerHeight bgLightTranslucent">
                <div className="w-100 headerHeight bgLightTranslucent position-absolute"
                     style={Logo.logoBg("left","lighten",true)} />
                <div className="w-100 headerHeight bg-transparent position-absolute container-fluid justify-content-center"
                     onClick={() => {hideMenu(); this.props.history.push(exactRoutes.HOME.r)}}>
                    <img  className="logoThrubi" src={Logo.logoPath} alt="Thrubi logo" height="35px" width="35px"
                          style={Logo.logoDarken}  />
                    <span className="mr-2 thrubiTitle thrubiGradient"><h4><b className="fontThrubiTitle">Thrubi</b></h4></span>
                    <EthBadges position="H" />
                </div>
                <div className="topLeft">
                    <HeaderMenu />
                </div>
                <div className="topRight">
                    <Switch>
                        <Route       path={nestedRoutes.AUTH}       component={HeaderClose} />
                        <Route       path={nestedRoutes.USER_MENU}  component={HeaderClose} />
                        <Route       path={nestedRoutes.ROOT}       component={HeaderUser} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const Header = withRouter(connect(mapStateToProps,{hideMenu})(_Header));

export default Header;