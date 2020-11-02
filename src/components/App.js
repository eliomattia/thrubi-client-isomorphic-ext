import React,{Component,Fragment} from "react";
import {Route,Switch} from "react-router";
import AppHook from "./AppHook";
import AuthHook from "./AuthHook";
import MultidimensionalRouter from "./tools/MultidimensionalRouter";
import GoogleAnalytics from "./tools/GoogleAnalytics";
import NotFound from "./NotFound";
import AuthRedirect from "./AuthRedirect";
import EmailVerify from "./EmailVerify";
import Main from "./Main";
import {exactRoutes} from "../config/routes/routes";

class App extends Component {
    render() {
        return (
            <Fragment>
                <AppHook />
                <AuthHook />
                <MultidimensionalRouter />
                <GoogleAnalytics />
                <Switch>
                    <Route exact path={exactRoutes.NOT_FOUND.r}        component={NotFound} />
                    <Route exact path={exactRoutes.AUTH_REDIRECT.r}    component={AuthRedirect} />
                    <Route exact path={exactRoutes.EMAIL_VERIFY.r}     component={EmailVerify} />
                    <Route       path={exactRoutes.ROOT.r}             component={Main} />
                </Switch>
            </Fragment>
        );
    };
}

export default App;
