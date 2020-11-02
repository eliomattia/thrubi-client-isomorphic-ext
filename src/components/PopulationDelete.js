import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {deletePopulation} from "../actions/adminMenu";

class _PopulationDelete extends Component {
    render() {
        return (
            <ActionButton action={deletePopulation} text="Delete Population" buttonType="btn-secondary" />
        );
    }
}

const mapStateToProps = state => ({
});

const PopulationDelete = withRouter(connect(mapStateToProps,{deletePopulation})(_PopulationDelete));

export default PopulationDelete;

