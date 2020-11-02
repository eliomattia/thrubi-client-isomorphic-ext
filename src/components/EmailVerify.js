import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {verifyEmail} from "../actions/user";

class _EmailVerify extends Component {
    componentDidMount() {
        const {verifyEmail} = this.props;
        verifyEmail(window.location.search.substring(1)); // remove initial question mark ?
    };

    render() {
        const {emailVerified,emailVerifyError} = this.props;
        return (
            <div className="text-primary text-center small">
                {
                    emailVerified
                        ? "Email address verified. Thank you!"
                        : emailVerifyError
                            ? "Link expired"
                            : "Verifying email..."
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    emailVerified:      state.client.user.emailVerified,
    emailVerifyError:   state.client.user.emailVerifyError,
});

const EmailVerify = withRouter(connect(mapStateToProps,{verifyEmail})(_EmailVerify));

export default EmailVerify;