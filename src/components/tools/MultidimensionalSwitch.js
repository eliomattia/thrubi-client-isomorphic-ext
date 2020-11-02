import React,{Component,Fragment} from "react";
import {Switch,Route,withRouter} from "react-router";
import {connect} from "react-redux";
import {nestedRoutes} from "../../config/routes/routes";

class _MultidimensionalSwitch extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    {this.props.children.map(child => <Route exact path={child.props.path} component={child.props.component} />)}
                    {this.props.children.map(child => !child.props.alt?"":<Route path={nestedRoutes.ROOT} component={child.props.component} />)}
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    selected:           state.client.guest.guestMenuOption,
});

const MultidimensionalSwitch = withRouter(connect(mapStateToProps,{})(_MultidimensionalSwitch));

export default MultidimensionalSwitch;

