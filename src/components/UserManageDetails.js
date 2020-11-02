import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {storeDetails,deleteDetails,deleteProfilePicture} from "../actions/user";

class _UserManageDetails extends Component {
    render() {
        let refs = {name:null,surname:null,email:null};
        const {updateUserBusy,name,surname,email,document,profilePicture} = this.props;
        const fieldClassName = "form-control formControlSandwich formControlSandwichTrail";
        const {storeDetails,deleteDetails,deleteProfilePicture} = this.props;
        return (
            <div className="col-lg-6">
                {
                    updateUserBusy?"Updating user data...":
                        <Fragment>
                            <input id="inputUserName"     className={fieldClassName+" roundedTop"}  ref={input => refs.name = input}      placeholder={name?name:"Enter name"}                      type="text" />
                            <input id="inputUserSurname"  className={fieldClassName+" rounded-0"}   ref={input => refs.surname = input}   placeholder={surname?surname:"Enter surname"}             type="text" />
                            <input id="inputUserEmail"    className={fieldClassName+" rounded-0"}   ref={input => refs.email = input}     placeholder={email?email:"Enter email address"}           type="text" />
                            <input id="inputUserDocument" className={fieldClassName+" rounded-0"}   disabled                              placeholder={document?document:"Identity not verified"}   type="text" />
                            <ActionButton text="Update my personal data" noMargin=" " buttonType="btn-outline-primary roundedBottom" action={() => {
                                let userDetails = {};
                                if (refs.name.value)        userDetails["name"]=refs.name.value;
                                if (refs.surname.value)     userDetails["surname"]=refs.surname.value;
                                if (refs.email.value)       userDetails["email"]=refs.email.value;
                                storeDetails(userDetails,{overwrite:true});
                            }}/>
                            <br />
                            {!profilePicture?"":<ActionButton action={deleteProfilePicture} buttonType={" btn-outline-secondary roundedTop noBottomBorder "} noMargin=" m-0 " text="Delete my profile picture" />}
                            <ActionButton action={deleteDetails} buttonType={" btn-outline-secondary rounded"+(profilePicture?"Bottom":"")+" "} noMargin=" m-0 " text="Delete my personal data" />
                        </Fragment>
                }
            </div>
        );
    }
};

const mapStateToProps = state => ({
    updateUserBusy:     state.session.busy.action.userDetails,
    name:               state.client.user.name,
    surname:            state.client.user.surname,
    email:              state.client.user.email,
    document:           state.client.user.document,
    profilePicture:     state.client.user.profilePicture,
});

const UserManageDetails = withRouter(connect(mapStateToProps,{storeDetails,deleteDetails,deleteProfilePicture})(_UserManageDetails));

export default UserManageDetails;