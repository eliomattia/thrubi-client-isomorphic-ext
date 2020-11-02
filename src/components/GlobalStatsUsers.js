import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const _GlobalStatsUsers = ({
    nUser,
}) => (
    <p className="small my-0">
        Thrubi is a {/*{nUser}-strong */}worldwide community where demand for Universal Basic Income meets supply.
    </p>
);

const mapStateToProps = state => ({
    nUser:      state.global.stats.nUser,
});

const GlobalStatsUsers = withRouter(connect(mapStateToProps,{})(_GlobalStatsUsers));

export default GlobalStatsUsers;