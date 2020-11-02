import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import CcyRow from "./tools/CcyRow";
import {tunePopulation} from "../actions/adminMenu";

class _PopulationTune extends Component {

    render() {
        let newBrake;
        let newWarperMincome;
        let newWarperEquality;

        const {brake,mincome,equality,warperMincome,warperEquality,tunePopulation} = this.props;

        return (
            <Fragment>
                <div className="container">
                    <CcyRow text="mincome" bold={false} value={mincome} ccySymbol={""}/>
                    <CcyRow text="equality" bold={false} value={equality} ccySymbol={""}/>
                    <CcyRow text="brake" bold={false} value={brake} ccySymbol={""}/>
                    <CcyRow text="warperMincome" bold={false} value={warperMincome} ccySymbol={""}/>
                    <CcyRow text="warperEquality" bold={false} value={warperEquality} ccySymbol={""}/>
                </div>
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    tunePopulation(newBrake.value, newWarperMincome.value, newWarperEquality.value);
                }}>
                    <input id="newBrake" ref={input => newBrake = input}
                           type="text" className="form-control form-control-sm"
                           placeholder={brake.toFixed(2)} required/>
                    <input id="newWarperMincome" ref={input => newWarperMincome = input}
                           type="text" className="form-control form-control-sm"
                           placeholder={warperMincome.toFixed(2)} required/>
                    <input id="newWarperEquality" ref={input => newWarperEquality = input}
                           type="text" className="form-control form-control-sm"
                           placeholder={warperEquality.toFixed(2)} required/>
                    <input className="btn btn-sm p-0 btn-block btn-primary" type="submit" value="Change configuration"/>
                </form>
            </Fragment>
        );
    }

}

const mapStateToProps = state => ({
    mincome: state.client.population.mincome,
    equality: state.client.population.equality,
    brake: state.client.population.brake,
    warperMincome: state.client.population.warperMincome,
    warperEquality: state.client.population.warperEquality,
});

const PopulationTune = withRouter(connect(mapStateToProps,{tunePopulation})(_PopulationTune));

export default PopulationTune;