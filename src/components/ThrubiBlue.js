import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import Claim from "./Claim";
import MemberBlue from "./MemberBlue";

class _ThrubiBlue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: false,
            manualPanel: false,
        };
    }

    componentWillUpdate() {
        const {member} = this.props;
        if (this.state.showPanel===(!member.thrubiBlue)&&!this.state.manualPanel) this.setState({showPanel: (member.thrubiBlue)});
    }

    render() {
        const {busy,member,ccySymbol,exrate,optionViewHistory,optionAdvancedMode} = this.props;

        return(
            <div className="text-center text-primary">
                <ActionButton text="Thrubi Blue" buttonType={"btn-outline-primary"+(this.state.showPanel?" active":"")}
                              action={() => { this.setState({manualPanel: true}); this.setState({showPanel: !this.state.showPanel});}} />
                {
                    !this.state.showPanel ? "" :
                        busy ? "Member loading..." :
                            <Fragment>
                                <MemberBlue
                                    member={member}
                                    ccySymbol={ccySymbol}
                                    exrate={exrate}
                                    optionViewHistory={optionViewHistory}
                                    optionAdvancedMode={optionAdvancedMode}
                                />
                                <Claim />
                            </Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    busy: state.session.busy.component.dashboard,
    member: state.client.member,
    ccySymbol: state.client.population.ccySymbol,
    exrate: state.global.market.exrate,
    optionViewHistory: state.client.user.optionViewHistory,
    optionAdvancedMode: state.client.user.optionAdvancedMode,
});

const ThrubiBlue = withRouter(connect(mapStateToProps)(_ThrubiBlue));

export default ThrubiBlue;