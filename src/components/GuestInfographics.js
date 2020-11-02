import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import PopulationSelect from "./PopulationSelect";
import Chart from "./Chart";
import GuestSuggestion from "./GuestSuggestion";
import ActionButton from "./tools/ActionButton";
import {deselectPopulation} from "../actions/population";
import {suggestionType} from "../config/guest";
import "./styles/App.scss";

class _GuestInfographics extends Component {
    render() {
        const {countryId,countryName,dataSource} = this.props;
        const {deselectPopulation} = this.props;
        return (
            <div className="container-fluid m-0 p-3 bg-white">
                <div className="row text-center py-3">
                    {
                        !countryId
                            ? <PopulationSelect refList={true}/>
                            :
                                <div className="col-lg-12 p-0 px-4 px-lg-0 px-lg-3">
                                    <ActionButton action={() => deselectPopulation(true)} text="Choose another country" noMargin="p-2" buttonType=" btn-primary" />
                                    <div className="my-3">
                                        Thrubi uses the income distribution shown here to build models to calculate individual Universal Basic Income.
                                    </div>
                                    <b>Distribution of yearly income, {countryName}. Public data: {dataSource}.</b>
                                    <br />
                                    <i>Hover on the data points for details.</i>
                                    <Chart/>
                                    <GuestSuggestion transparent={false} type={suggestionType.COUNTRY_CHART} />
                                </div>
                    }
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    countryId:          state.client.ref.countryId,
    countryName:        state.client.ref.countryName,
    dataSource:         state.client.ref.countryId==="US"?"IRS.gov":"wid.world"
});

const GuestInfographics = withRouter(connect(mapStateToProps,{deselectPopulation})(_GuestInfographics));

export default GuestInfographics;


