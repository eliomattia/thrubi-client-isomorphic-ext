import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {sendRedirect} from "../actions/auth";

class _AuthRedirect extends Component {
    componentDidMount() {
        const {sendRedirect} = this.props;
        sendRedirect();
    };

    render() {
        return (
            <div className="text-primary text-center small">
                    Sending over login information to Thrubi...
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const AuthRedirect = withRouter(connect(mapStateToProps,{sendRedirect})(_AuthRedirect));

export default AuthRedirect;