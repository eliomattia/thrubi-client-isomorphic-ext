import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {chooseGuestMenu} from "../../actions/guest";
import {switchOptionUserMenu} from "../../actions/user";
import {exactRoutes} from "../../config/routes/routes";

class _MultidimensionalRouter extends Component {
    componentDidMount() {
        const {chooseGuestMenu,switchOptionUserMenu} = this.props;
        this.props.history.listen(location => {
            Object.keys(exactRoutes).forEach(route => {
                if (location.pathname===exactRoutes[route].r) {
                    if (exactRoutes[route].g) chooseGuestMenu(exactRoutes[route].g);
                    if (exactRoutes[route].u) switchOptionUserMenu(exactRoutes[route].u);
                }
            });
        });
    };

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
});

const MultidimensionalRouter = withRouter(connect(mapStateToProps,{chooseGuestMenu,switchOptionUserMenu})(_MultidimensionalRouter));

export default MultidimensionalRouter;
