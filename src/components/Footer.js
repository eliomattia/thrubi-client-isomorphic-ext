import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Logo from "../classes/Logo";
import GlobalStatsUsers from "./GlobalStatsUsers";
import GlobalStatsCountryCcy from "./GlobalStatsCountryCcy";
import EthBadges from "./EthBadges";
import Contact from "./Contact";

const _Footer = ({ethNetwork,ethAddress}) => (
    <div className="bg-light flex-grow-1" style={Logo.logoBg("center")}>
        <div className="container row m-0 p-4 footer small">
            <div className="col-lg-4 m-0 px-0 py-2 py-lg-3 text-center text-lg-left">
                <div className="d-block">
                    <GlobalStatsUsers />
                    <GlobalStatsCountryCcy/>
                </div>
                <span className="d-block navbar-nav small mt-3">
                <p className="d-inline-block">Rising inequality is toxic to growth</p>
                    <i className="d-inline-block small">&nbsp;&mdash; Nick Hanauer</i>
                </span>
                <div className="d-block d-lg-none mt-3">
                    <EthBadges position="F" />
                </div>
            </div>
            <Contact />
            <div className="col-lg-4 m-0 p-0 py-4 text-center text-lg-right text-success">
                <div className="d-inline-block rounded overflow-hidden m-0 p-0 mt-3 mt-lg-0 bg-success borderSuccess">
                    <p className="m-0 p-0 text-center text-light small">Public data provided by</p>
                    <div className="d-flex m-0 p-0">
                        <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer"><img className="text-center d-inline" alt="IRS.gov" height="80px" src={"/jpg/IRS.gov.jpg"} /></a>
                        <a href="https://wid.world" target="_blank" rel="noopener noreferrer"><img className="text-center d-inline" alt="wid.world" height="80px" src={"/png/wid.world.png"} /></a>
                    </div>
                </div>
                <div className="py-3">© 2019-2020 Thrubi</div>
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
});

const Footer = withRouter(connect(mapStateToProps)(_Footer));

export default Footer;