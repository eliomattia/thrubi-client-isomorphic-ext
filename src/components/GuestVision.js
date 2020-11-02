import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Logo from "../classes/Logo";

class _GuestVision extends Component {
    visionText = () => (
        <Fragment>
            <ul>
                <li>Become a Thrubi member</li>
                <li>Certify your identity</li>
                <li>Declare and verify your income</li>
                <li>Get your <b>Thrubi Blue</b> level assigned (the lower your income, the higher your level)</li>
                <li>Receive your basic income</li>
            </ul>
        </Fragment>
    );

    wealthyText = () => (
        <Fragment>
            <ul>
                <li>Become a Thrubi member</li>
                <li>Certify your identity</li>
                <li>Declare and verify your income</li>
                <li>Get your <b>Thrubi Silver</b> level assigned (the higher your income, the higher your level)</li>
                <li>Purchase <b>Thrubi Gold</b></li>
                <li>The purchase proceedings will fund basic income in your country</li>
            </ul>
        </Fragment>
    );

    societiesText = () => (
        <Fragment>
            Thrubi is powered by:
            <ul>
                <li>In-house social models</li>
                <li>Public <a
                    target="_blank" className="text-success" rel="noopener noreferrer" href="https://www.irs.gov">IRS.gov</a> and <a
                    target="_blank" className="text-success" rel="noopener noreferrer" href="https://wid.world">wid.world</a> income inequality data</li>
            </ul>
        </Fragment>
    );


    render() {
        return(
            <div className="container-fluid">
                <div className="row py-2 rounded-bottom">
                    {
                        [
                            {
                                style:"thrubiBlue",    image:"/jpg/crowd.jpg",     bg:"everybody", color:"primary",     header:"Vision",                text:this.visionText(),},
                            {
                                style:"thrubiSilver",  image:"/jpg/hanauer.jpg",   bg:"wealthy",   color:"secondary",   header:"Wealthy individuals",   text:this.wealthyText(),},
                            {
                                style:"thrubiGold",    image:"/jpg/futuristic.jpg",bg:"societies", color:"success",     header:"Thriving societies",    text:this.societiesText(),},
                        ].map(e => (
                                <div key={e.bg} className="col-xl-4 p-0 m-0 navbar-light">
                                    <div className={"mr-0 mx-lg-3 mb-0 my-lg-0 text-center text-lg-center px-4 py-3 text-light bg-"+e.color}
                                         style={Logo.logoBg("left","luminosity")}>
                                        <h2 className="text-light">{e.header}</h2>
                                    </div>
                                    <div className={"mr-0 mx-lg-3 mb-4 my-lg-0 "+e.style}>
                                        <div style={{backgroundImage: "url("+e.image+")",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}
                                             className={"border-0 container-fluid m-0 "+e.bg+" p-4 text-"+e.color}>
                                            <p>{e.text}</p>
                                        </div>
                                        <div className={"border-0 container-fluid m-0 overflow-hidden topLeft p-4 opaque text-"+e.color}>
                                            <p>{e.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const GuestVision = withRouter(connect(mapStateToProps,{})(_GuestVision));

export default GuestVision;