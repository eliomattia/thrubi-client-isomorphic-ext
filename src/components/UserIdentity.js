import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {uploadDocument} from "../actions/user";

class _UserIdentity extends Component {
    render() {
        const {identityCertified,countryName} = this.props;
        const {uploadDocument} = this.props;

        return (
            <Fragment>
                <div className="m-3">You are applying to become a Thrubi member in the following country: <b>{countryName}</b></div>
                <ActionButton text={identityCertified===0?"Upload a document to start the identity certification procedure":"Thrubi is certifying your identity"}
                              disabled={identityCertified!==0} buttonType="btn-primary" action={uploadDocument} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    identityCertified:  state.client.user.identityCertified,
    countryName:        state.client.population.countryName,
});

const UserIdentity = withRouter(connect(mapStateToProps,{uploadDocument})(_UserIdentity));

export default UserIdentity;