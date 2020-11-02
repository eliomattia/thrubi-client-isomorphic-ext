import React,{Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const _Header = ({position,ethNetwork,ethAddress}) => (
    <Fragment>
        {
            !ethNetwork || !ethAddress ? "" :
                <div className={""
                                +(position==="H"?" d-none d-lg-block":"")
                                +(position==="H"?" col-lg-4 float-right":"")
                                +(position==="H"?" mr-0 my-2 text-right":" mx-0 my-0 pb-1 text-center")
                                +" consoleFont"}>
                    <div className={"navbar-nav small"+(position==="H"?" alignBottom":"")}>
                        <div>
                            <span className={"badge badge-warning d-"+(position==="H"?"none d-xl":"")+"-inline"}><span>network/</span>{ethNetwork}</span>
                            <span className="badge badge-info d-inline">{ethAddress}</span>
                        </div>
                    </div>
                </div>
        }
    </Fragment>
);

const mapStateToProps = state => ({
    ethNetwork: state.client.userAccess.ethNetwork,
    ethAddress: state.client.userAccess.ethAddress,
});

const Header = withRouter(connect(mapStateToProps)(_Header));

export default Header;