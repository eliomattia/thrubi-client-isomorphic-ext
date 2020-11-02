import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const _GlobalStatsCountryCcy = ({
    nCcy,
    nCountry,
}) => (
    <p className="small my-0">
        Thrubi is launching in {nCountry} {nCountry===1?"country":"countries"} and {nCcy} {nCcy===1?"currency":"currencies"}.
    </p>
);

const mapStateToProps = state => ({
    nCountry:   state.global.stats.nCountry,
    nCcy:       state.global.stats.nCcy,
});

const GlobalStatsCountryCcy = withRouter(connect(mapStateToProps,{})(_GlobalStatsCountryCcy));

export default GlobalStatsCountryCcy;