import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {advancedMode,viewHistory} from "../actions/member";

class _MemberOptions extends Component {
    render() {
        const {optionAdvancedMode,optionViewHistory} = this.props;
        const {advancedMode,viewHistory} = this.props;
        const {color} = this.props;

        return (
            <div>
                <ActionButton noMargin={"small m-0 mt-2 p-0"} buttonType={"nav-link border-0 text-"+color} action={() => advancedMode(!optionAdvancedMode)} text={optionAdvancedMode?"Show less details":"Show more details..."}/>
                {
                    !optionAdvancedMode ? ""
                    : <ActionButton noMargin={"small m-0 p-0"} buttonType={"nav-link border-0 text-"+color} action={() => viewHistory(!optionViewHistory)} text={optionViewHistory?"Hide history":"View history..."} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    optionAdvancedMode: state.client.user.optionAdvancedMode,
    optionViewHistory: state.client.user.optionViewHistory,
    populationId: state.client.population.id,
});

const MemberOptions = withRouter(connect(mapStateToProps,{advancedMode,viewHistory})(_MemberOptions));

export default MemberOptions;