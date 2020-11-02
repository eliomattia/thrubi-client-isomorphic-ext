import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Contact from "./Contact";

class _GuestContact extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row py-2 rounded-bottom justify-content-center">
                    <Contact />
                    <div className="w-100" />
                    <div className="col-lg-4 my-3">
                        <iframe title="discordFrame" src="https://discordapp.com/widget?id=681677187044343841&theme=dark" width="100%" height="250" frameBorder="0" />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const GuestContact = withRouter(connect(mapStateToProps,{})(_GuestContact));

export default GuestContact;