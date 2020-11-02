import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {uploadProfilePicture} from "../actions/user";
import SvgIcon from "../classes/SvgIcon";

class _UserProfilePicture extends Component {
    picture() {
        const {profileMode} = this.props;
        const {loggedIn,role,deactivated,profilePicture} = this.props;

        if (profileMode)
            return (
                <img className="rounded-circle" alt="profilePicture" height="128" width="128"
                     src={profilePicture?profilePicture:("/icons/"+role+deactivated+".png")}/>
            );
        else
            if (!loggedIn||!profilePicture)
                return (
                    <Fragment>
                        <div className={"bg-"+(loggedIn?"primary":"secondary")} style={SvgIcon.profilePictureStyle}/>
                        <svg className="sizeUserButton" viewBox={SvgIcon.viewBox}>
                            <defs>
                                <clipPath id="userIcon" clipPathUnits="objectBoundingBox">
                                    <path d={SvgIcon.iconPath.user}>
                                    </path>
                                </clipPath>
                            </defs>
                        </svg>
                    </Fragment>

                );
            else
                return (
                    <img className="rounded-circle" alt="profilePicture" height="45" width="45"
                         src={profilePicture?profilePicture:("/icons/"+role+deactivated+".png")}/>
                );
    }

    render() {
        let refs = {localProfilePicture:null};
        const {profileMode} = this.props;
        const {profilePicture} = this.props;
        const {uploadProfilePicture} = this.props;

        return (
            <Fragment>
                {
                    !profileMode
                        ? this.picture()
                        :
                            <div className="mb-2">
                                <label for="profilePictureInput" className="m-0 mt-3 p-0">
                                    {this.picture()}
                                </label>
                                <input id="profilePictureInput" className="d-none" ref={input => refs.localProfilePicture = input}
                                       type="file" onChange={() => uploadProfilePicture(refs.localProfilePicture)} />
                                {
                                    profilePicture?"":<div className="small text-secondary m-0 p-0">Click on the user icon to upload a profile picture</div>
                                }
                            </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn:           state.client.userAccess.loggedIn,
    role:               state.client.user.role          ? "admin"        : "user",
    deactivated:        state.client.user.deactivated   ? "_deactivated" : "",
    profilePicture:     state.client.user.profilePicture,
});

const UserProfilePicture = withRouter(connect(mapStateToProps,{uploadProfilePicture})(_UserProfilePicture));

export default UserProfilePicture;