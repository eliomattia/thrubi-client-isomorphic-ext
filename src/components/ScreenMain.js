import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class _ScreenMain extends Component {
    render() {
        return (
            <div className="topMargin text-primary d-flex flex-column flex-grow-1 align-items-stretch pt-3">
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const ScreenMain = withRouter(connect(mapStateToProps,{})(_ScreenMain));

export default ScreenMain;

