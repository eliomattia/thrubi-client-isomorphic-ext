import React,{Component} from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class _NotFound extends Component {
    componentDidMount() {
    };

    render() {
        return (
            <div className="text-primary text-center small">
                What you were looking for is not here...
                <br /><br />
                <Link to="/">Return to Thrubi</Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const NotFound = withRouter(connect(mapStateToProps,{})(_NotFound));

export default NotFound;