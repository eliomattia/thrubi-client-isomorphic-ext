import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import "./styles/App.scss";
import ActionButton from "./tools/ActionButton";
import {exactRoutes} from "../config/routes/routes";
import GuestNewsletter from "./GuestNewsletter";
import {showMenu} from "../actions/guest";

class _GuestHome extends Component {
    componentDidMount() {
        this.setState({guestSubscribed:false});
    }

    render() {
        const {showMenu} = this.props;
        return (
            <Fragment>
                <div className="w-100 px-2 py-4 text-center">
                    <p className="display-4 m-2 px-2">
                        A <span className="thrubiGradient">Thrubi</span> account gets you
                        a <span className="thrubiGradient">universal basic income.</span>
                    </p>
                    <h4 className="m-2 px-2 text-secondary">
                        It is calculated based on your current earnings and funded by wealthy individuals.
                    </h4>
                    <h4 className="display-3 m-0 p-2">
                        Our purpose? <span className="thrubiGradient">Solve extreme poverty.</span>
                    </h4>
                </div>
                <div className="container-fluid row mx-0 my-4 mb-5 p-0 text-center w-100 bg-light">
                    <div className="col-lg-3 p-0 d-flex flex-column">
                        <div className="mx-md-0 mx-lg-3 px-0 py-2 pb-4 bg-primary text-light d-flex flex-grow-1">
                            <div className="w-100 h-100 align-items-center">
                                <p className="display-1">1.</p>
                                <ActionButton
                                    text="Sign up for a Thrubi account"
                                    buttonType="d-inline-block w-75 btn-outline-light"
                                    action={() => this.props.history.push(exactRoutes.AUTH_SIGNUP.r)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 p-0 m-0 d-flex flex-column">
                        <div className="mx-md-0 ml-lg-0 mr-lg-3 px-0 py-2 pb-4 bg-secondary text-light d-flex flex-grow-1">
                            <div className="w-100 h-100">
                                <p className="display-1">2.</p>
                                <GuestNewsletter color="light" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 p-0 d-flex flex-column">
                        <div className="mx-md-0 ml-lg-0 mr-lg-3 px-0 py-2 pb-4 bg-success text-light d-flex flex-grow-1">
                            <div className="w-100 h-100">
                                <p className="display-1">3.</p>
                                <ActionButton
                                    text="Learn more about Thrubi"
                                    buttonType="d-inline-block w-75 btn-outline-light"
                                    action={showMenu} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
});

const GuestHome = withRouter(connect(mapStateToProps,{showMenu})(_GuestHome));

export default GuestHome;


