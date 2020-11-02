import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import "./styles/App.scss";
import ActionButton from "./tools/ActionButton";
import {hideMenu} from "../actions/guest";
import {exactRoutes} from "../config/routes/routes";

class _GuestMenu extends Component {
    render() {
        const {selected,loggedIn} = this.props;
        const {hideMenu} = this.props;
        // const {match: {params: {loginSignup}}} = this.props;

        return (
            <div className="position-relative container-fluid m-0 p-0 bg-white">
                <div className="row m-0 p-0 text-center">
                    {
                        [
                            {text:"Home",        color:"success", route:exactRoutes.HOME,},
                            {text:"My Thrubi",   color:"success", route:loggedIn?exactRoutes.USER:exactRoutes.AUTH_SIGNUP,},
                            {text:"Vision",      color:"primary", route:exactRoutes.VISION,},
                            {text:"FAQ",         color:"primary", route:exactRoutes.FAQ,},
                            {text:"Infographics",color:"primary", route:exactRoutes.INFOGRAPHICS,},
                            {text:"Blog",        color:"primary", route:exactRoutes.BLOG,},
                            {text:"Contact",     color:"primary", route:exactRoutes.CONTACT,},
                        ].map(e =>
                            <div className="col-md-12 p-0 m-0">
                                <ActionButton action={() => {hideMenu(); this.props.history.push(e.route.r);}}
                                              buttonType={"rounded-0 border-0 btn-outline-"+e.color+(selected===e.route.g?" active":"")+" py-3"}
                                              noMargin={" "}
                                              text={e.text} />
                            </div>
                        )
                    }
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    selected:           state.client.guest.guestMenuOption,
    loggedIn:           state.client.userAccess.loggedIn,
});

const GuestMenu = withRouter(connect(mapStateToProps,{hideMenu})(_GuestMenu));

export default GuestMenu;


