import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AuthLoginSignup from "./AuthLoginSignup";
import "./styles/App.scss";
import {exactRoutes} from "../config/routes/routes";

class _ScreenAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {animateHide:true};
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        setTimeout(() => this.setState({animateHide:false}),0);
    };

    componentWillUnmount() {
        this.setState({animateHide:true});
    };

    render() {
        const {animateHide} = this.state;
        return (
            <Fragment>
                <div id="bgTargetOuter" onClick={e => {if (e.target.id.includes("bgTarget")) this.props.history.push(exactRoutes.ROOT.r);}}
                     className={"container-fluid text-primary animated topMargin p-0 fixed-top w-100 remainingHeight d-flex flex-row align-items-center overflow-auto"+(animateHide?" bg-transparent animateHide":" bgFlash")}>
                    <div id="bgTargetFiller" className="m-0 h-100 d-flex flex-row align-items-center flex-grow-1">
                        <div id="bgTargetVertical" className="row m-0 w-100 maxRemainingHeight d-flex flex-column align-items-center">
                            <div id="bgTargetHorizontal" className={"col-lg-4"+(animateHide?" animateHideFade":"")}>
                                <AuthLoginSignup />
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

const ScreenAuth = withRouter(connect(mapStateToProps,{})(_ScreenAuth));

export default ScreenAuth;


