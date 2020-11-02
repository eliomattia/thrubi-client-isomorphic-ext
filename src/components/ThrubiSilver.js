import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Transform from "./Transform";
import MemberSilver from "./MemberSilver";
import ActionButton from "./tools/ActionButton";

class _ThrubiSilver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: false,
            manualPanel: false,
        };
    }

    componentWillUpdate() {
        const {member} = this.props;
        if (this.state.showPanel===(!member.thrubiSilver)&&!this.state.manualPanel) this.setState({showPanel: (!!member.thrubiSilver)});
    }

    render() {
        const {busy,member,ccySymbol,exrate,thrubiPriceSilver,thrubiPriceGold,optionViewHistory,optionAdvancedMode} = this.props;

        return(
            <div className="text-center text-secondary">
                <ActionButton text="Thrubi Silver" buttonType={"btn-outline-secondary"+(this.state.showPanel?" active":"")}
                              action={() => { this.setState({manualPanel: true}); this.setState({showPanel: !this.state.showPanel});}} />
                {
                    !this.state.showPanel ? "" :
                        busy ? "Member loading..." :
                            <Fragment>
                                <MemberSilver
                                    member={member}
                                    ccySymbol={ccySymbol}
                                    exrate={exrate}
                                    thrubiPriceSilver={thrubiPriceSilver}
                                    thrubiPriceGold={thrubiPriceGold}
                                    optionViewHistory={optionViewHistory}
                                    optionAdvancedMode={optionAdvancedMode}
                                />
                                <Transform />
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
    thrubiPriceSilver: state.client.population.thrubiPriceSilver,
    thrubiPriceGold: state.client.population.thrubiPriceGold,
    optionViewHistory: state.client.user.optionViewHistory,
    optionAdvancedMode: state.client.user.optionAdvancedMode,
});

const ThrubiSilver = withRouter(connect(mapStateToProps)(_ThrubiSilver));

export default ThrubiSilver;