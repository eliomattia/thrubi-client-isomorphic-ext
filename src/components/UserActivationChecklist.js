import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class _UserActivationChecklist extends Component {
    render() {
        const {emailProvided,emailVerified,identityCertified,incomeDeclared,incomeApproved,deactivated} = this.props;
        return (
            <div className="my-4">
                <div>
                    <b>Account activation checklist</b>
                </div>
                <ol className={"text-left mb-2"}>
                    <li className={"text-"+(emailProvided?"light":"primary")+" small"}>
                        {emailProvided?"Email address provided":"Provide an email address"}
                    </li>
                    <li className={"text-"+(emailVerified?"light":"primary")+" small"}>
                        {emailVerified?"Email address verified":"Verify your email address by clicking on the link in the confirmation email"}
                    </li>
                    <li className={"text-"+(identityCertified>0?"light":"primary")+" small"}>
                        {identityCertified>0?"Identity certified":(identityCertified<0?"Pending certification":"Indicate your country of citizenship and certify your identity")}
                    </li>
                    {/*<li className={"text-primary small"}>
                        Verify the presence of a document number (not submitted, but out of the verification procedure)
                        AND ALSO: deleting user details should render emailVerified false and identity certified also false!
                    </li>*/}
                    <li className={"text-"+(incomeDeclared?"light":"primary")+" small"}>
                        {incomeDeclared?"Income declared":"Declare your income"}
                    </li>
                    <li className={"text-"+(incomeApproved>0?"light":"primary")+" small"}>
                        {incomeApproved>0?"Income approved":(incomeApproved<0?"Pending approval":"Request approval of your declared income")}
                    </li>
                    <li className={"text-"+(deactivated>0?"primary":"light")+" small"}>
                        {deactivated>0?"Request activation":"Activated!"}
                    </li>
                </ol>
                {
                    deactivated>0?"":
                        <div>
                            Your account is activated. You can now fully use Thrubi!
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    emailProvided:      state.client.user.email,
    emailVerified:      state.client.user.emailVerified,
    identityCertified:  state.client.user.identityCertified,
    incomeDeclared:     state.client.member.mCurrent,
    incomeApproved:     state.client.user.incomeApproved,
    deactivated:          state.client.user.deactivated,
});

const UserActivationChecklist = withRouter(connect(mapStateToProps)(_UserActivationChecklist));

export default UserActivationChecklist;