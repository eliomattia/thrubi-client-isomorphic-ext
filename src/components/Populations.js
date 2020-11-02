import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {selectPopulation,deselectPopulation} from "../actions/population";

class _Populations extends Component {
    render() {
        const {refList} = this.props;
        const {populations,populationId,filter} = this.props;
        const {selectPopulation,deselectPopulation} = this.props;

        return (
            populations
                .filter(p => (
                    !filter
                    || p.countryId.toLowerCase().includes(filter.toLowerCase())
                    || p.countryName.toLowerCase().includes(filter.toLowerCase())
                    || p.ccyId.toLowerCase().includes(filter.toLowerCase())
                    || p.ccyName.toLowerCase().includes(filter.toLowerCase())
                ))
                .map((population,index) => {
                return (
                    <div key={index} className="bg-light py-0 px-2 p-lg-0 my-1">
                        <button
                            className={"btn btn-sm m-0 p-0 rounded-0 border-0 btn-block btn-outline-primary"+
                                ((populationId===population.populationId)?" active":"")}
                            onClick={(populationId===population.populationId)?(() => deselectPopulation(refList)):(() => selectPopulation(population,refList))}
                        >
                            <div className="d-none d-lg-flex container-fluid row p-3 m-0">
                                <div className="col-lg-1 col-md-2  p-0 m-0 text-center">{population.countryId}</div>
                                <div className="col-lg-5 col-md-10 p-0 m-0 text-left"> {population.countryName}</div>
                                <div className="col-lg-1 col-md-2  p-0 m-0 text-center">{population.ccyId}</div>
                                <div className="col-lg-4 col-md-8  p-0 m-0 text-left">{population.ccyName}</div>
                                <div className="col-lg-1 col-md-2  p-0 m-0 text-center">{population.ccySymbol}</div>
                            </div>
                            <div className="d-block d-lg-none my-3 py-3 text-center">
                                {population.countryName} ({population.countryId}) - {population.ccyName} ({population.ccyId} {population.ccySymbol})
                            </div>
                        </button>
                    </div>
                )
            })
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    deactivated:        state.client.user.deactivated,
    populationId:       ownProps.refList?state.client.ref.id:state.client.population.id,
    populations:        ownProps.refList?state.client.ref.populations:state.client.population.populations,
    filter:             ownProps.refList?state.client.ref.filter:state.client.population.filter,
    refList:            ownProps.refList,
});

const Populations = withRouter(connect(mapStateToProps,{selectPopulation,deselectPopulation})(_Populations));

export default Populations;