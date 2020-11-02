import React,{Component,Fragment} from "react";
import {Redirect,Route,withRouter} from "react-router";
import {connect} from "react-redux";
import Header from "./Header";
import ScreenAuth from "./ScreenAuth";
import ScreenUser from "./ScreenUser";
import ScreenMenu from "./ScreenMenu";
import ScreenMain from "./ScreenMain";
import MultidimensionalSwitch from "./tools/MultidimensionalSwitch";
import MultidimensionalRoute from "./tools/MultidimensionalRoute";
import GuestHome from "./GuestHome";
import User from "./User";
import GuestVision from "./GuestVision";
import GuestFaq from "./GuestFaq";
import GuestInfographics from "./GuestInfographics";
import GuestBlog from "./GuestBlog";
import GuestContact from "./GuestContact";
import Footer from "./Footer";
import Flare from "./Flare";
import {exactRoutes,nestedRoutes,routeParams} from "../config/routes/routes";
import {guestMenuOption} from "../config/guest";
import "./styles/App.scss";

class _Main extends Component {
    render() {
        const {selected} = this.props;
        return (
            <Fragment>
                <Route exact path={exactRoutes.ROOT.r}      component={() => <Redirect to={selected?exactRoutes[selected].r:exactRoutes.HOME.r} />} />
                <Header />
                <Route       path={nestedRoutes.AUTH+routeParams.LOGIN_SIGNUP.key}      component={ScreenAuth} />
                <Route       path={exactRoutes.USER_MENU.r}                             component={ScreenUser} />
                <ScreenMenu />
                <ScreenMain>
                    <MultidimensionalSwitch>
                        <MultidimensionalRoute path={exactRoutes.HOME.r}          alt={selected===guestMenuOption.HOME}           component={GuestHome} />
                        <MultidimensionalRoute path={exactRoutes.USER.r}          alt={selected===guestMenuOption.USER}           component={User} />
                        <MultidimensionalRoute path={exactRoutes.VISION.r}        alt={selected===guestMenuOption.VISION}         component={GuestVision} />
                        <MultidimensionalRoute path={exactRoutes.FAQ.r}           alt={selected===guestMenuOption.FAQ}            component={GuestFaq} />
                        <MultidimensionalRoute path={exactRoutes.INFOGRAPHICS.r}  alt={selected===guestMenuOption.INFOGRAPHICS}   component={GuestInfographics} />
                        <MultidimensionalRoute path={exactRoutes.BLOG.r}          alt={selected===guestMenuOption.BLOG}           component={GuestBlog} />
                        <MultidimensionalRoute path={exactRoutes.CONTACT.r}       alt={selected===guestMenuOption.CONTACT}        component={GuestContact} />
                    </MultidimensionalSwitch>
                    <Footer />
                </ScreenMain>
                <Flare />
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
    selected:           state.client.guest.guestMenuOption,
});

const Main = withRouter(connect(mapStateToProps,{})(_Main));

export default Main;


