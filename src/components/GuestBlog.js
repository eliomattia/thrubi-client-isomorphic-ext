import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import GuestNewsletter from "./GuestNewsletter";

class _GuestBlog extends Component {
    render() {
        return(
            <Fragment>
                <div className="w-100 px-2 py-4 mb-3 text-center">
                    <p className="display-4 m-2 px-2">
                        <span className="thrubiGradient">Thrubi</span> blog on Medium
                    </p>
                    <h4 className="m-2 px-2 text-secondary">
                        Coming soon.
                    </h4>
                    <br />
                    <br />
                    <GuestNewsletter color="primary" />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
});

const GuestBlog = withRouter(connect(mapStateToProps,{})(_GuestBlog));

export default GuestBlog;