import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class _AuthKeyboard extends Component {
    render () {
        const {formFields,noOr} = this.props;
        return (
            <div className="my-2">
                { noOr?"":<span className="text-secondary"><i>-or-</i></span> }
                <input id="username" ref={input => formFields.username = input} type="text" placeholder="username" required className="formControlSandwich formControlSandwichTrail rounded-top m-0" />
                <input id="password" ref={input => formFields.password = input} type="password" placeholder="password" required className="formControlSandwich formControlSandwichLast rounded-bottom m-0" />
                <span className="small"><i>Your password will be encrypted. We do not store plain text passwords on our servers.</i></span>
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    formFields:         ownProps.formFields,
    noOr:               ownProps.noOr,
});

const AuthKeyboard = withRouter(connect(mapStateToProps,{})(_AuthKeyboard));

export default AuthKeyboard;