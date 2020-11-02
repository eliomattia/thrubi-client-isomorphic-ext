import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {logout,loginBlockchainEthereum} from "../actions/auth";

class _AuthHook extends Component {
    componentDidUpdate() {
        const {busy,loggedIn,autoLogin,ethAddress} = this.props;
        const {loginBlockchainEthereum} = this.props;

        if ((!busy)&&(!loggedIn)&&(autoLogin)&&(ethAddress)) {
            loginBlockchainEthereum();
        }
    };

    componentWillUnmount() {
        const {logout} = this.props;
        logout({autoLogin:false});
    };

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    busy:               state.session.busy.component.auth,
    optionKeyboardMode: state.client.user.optionKeyboardMode,
    loggedIn:           state.client.userAccess.loggedIn,
    channels:           state.client.userAccess.channels,
});

const AuthHook = withRouter(connect(mapStateToProps,{logout,loginBlockchainEthereum})(_AuthHook));

export default AuthHook;