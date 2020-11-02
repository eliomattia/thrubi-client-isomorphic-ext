import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {enableBlockchain} from "../actions/blockchain_ethereum";
import {startGlobalStatsWorker,stopGlobalStatsWorker} from "../actions/workers/globalStats";
import {fetchChannels} from "../actions/auth";
import "./styles/App.scss";

class _AppHook extends Component {
    componentDidMount() {
        this.reload();
    };

    componentWillUnmount() {
        stopGlobalStatsWorker();
    };

    reload() {
        const {startGlobalStatsWorker,fetchChannels,enableBlockchain} = this.props;
        return Promise.all([
            startGlobalStatsWorker(),
            fetchChannels(),
            // enableBlockchain(),
        ]);
    };

    render() {
        return <Fragment />;
    };
}

const mapStateToProps = state => ({
    busy:               state.session.busy.component.app,
    loggedIn:           state.client.userAccess.loggedIn,
});

const AppHook = withRouter(connect(mapStateToProps,{startGlobalStatsWorker,stopGlobalStatsWorker,fetchChannels,enableBlockchain})(_AppHook));

export default AppHook;


