import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {exactRoutes} from "../config/routes/routes";

class _HeaderClose extends Component {
    render() {
        const {loggedIn} = this.props;

        return (
            <button className={"p-0 m-0 mt-1 mx-3 text-secondary border-0 bg-transparent sandwichMenu"+(loggedIn?" loggedIn":"")}
                    onClick={() => this.props.history.push(loggedIn?exactRoutes.USER.r:exactRoutes.ROOT.r)}>
                <span />
                <span />
                <span />
            </button>
        );
}
}

const mapStateToProps = state => ({
    loggedIn:           state.client.userAccess.loggedIn,
});

const HeaderClose = withRouter(connect(mapStateToProps,{})(_HeaderClose));

export default HeaderClose;