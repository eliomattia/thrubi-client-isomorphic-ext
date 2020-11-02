import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class _UserDetails extends Component {
    render() {
        const {id,name,surname,email,document,deactivated,emailVerified,identityCertified} = this.props;
        return (
            <div className="text-center mb-2">
                <div className="text-primary d-inline-block p-0">
                    <b>{(name || surname) ? (name ? name : "") + " " + (surname ? surname : "") : "No user data"}</b>&nbsp;
                </div>
                <div className="text-secondary d-inline-block small">uid#{id}&nbsp;<span
                    className={"badge "+(deactivated?"badge-danger":"badge-info")}>{deactivated?"Deactivated":"Active account"}</span></div>
                <div className="text-secondary small">email: {email ? email : "not found"}&nbsp;<span
                    className={"badge "+(emailVerified?"badge-info":"badge-danger")}>{emailVerified>0?"Email verified":(emailVerified<0?"Pending verification":"Not verified")}</span></div>
                <div className="text-secondary small">document: {document ? document : "not found"}&nbsp;<span
                    className={"badge "+(identityCertified>0?"badge-info":"badge-danger")}>{identityCertified>0?"Identity certified":(identityCertified<0?"Pending certification":"Not certified")}</span></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    id:                 state.client.user.id,
    name:               state.client.user.name,
    surname:            state.client.user.surname,
    email:              state.client.user.email,
    document:           state.client.user.document,
    deactivated:        state.client.user.deactivated,
    emailVerified:      state.client.user.emailVerified,
    identityCertified:  state.client.user.identityCertified,
});

const UserDetails = withRouter(connect(mapStateToProps)(_UserDetails));

export default UserDetails;