import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {removeMembership} from "../actions/member";

class _MemberDelete extends Component {
    render() {
        const {identityCertified} = this.props;
        const {removeMembership} = this.props;
        return (
            <ActionButton text={(identityCertified>0?"Abandon country membership":"Terminate certification procedure")+" and select another country and currency"}
                          buttonType="btn-outline-secondary" action={removeMembership} />
        );
    }
}

const mapStateToProps = state => ({
    identityCertified:  state.client.user.identityCertified,
});

const MemberDelete = withRouter(connect(mapStateToProps,{removeMembership})(_MemberDelete));

export default MemberDelete;

