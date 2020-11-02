import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import UserProfilePicture from "./UserProfilePicture";
import UserDetails from "./UserDetails";

class _UserView extends Component {
    render() {
        const {busy} = this.props;

        return(
            <div className="col-lg-6 text-center">
                {
                    busy?"Loading...":
                        <div>
                            <UserProfilePicture profileMode={true} />
                            <UserDetails />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    busy:               state.session.busy.component.dashboard,
});

const UserView = withRouter(connect(mapStateToProps)(_UserView));

export default UserView;