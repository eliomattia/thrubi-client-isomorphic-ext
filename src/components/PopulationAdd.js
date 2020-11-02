import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Countries from "./Countries";
import Ccys from "./Ccys";
import {populationExists,createPopulation} from "../actions/adminMenu";

class _PopulationAdd extends Component {
    componentDidMount() {
        this.verifyExists();
    }

    componentDidUpdate() {
        this.verifyExists();
    }

    verifyExists() {
        const {countryId,ccyId} = this.props;
        const {populationExists} = this.props;
        if (countryId&&ccyId) populationExists(countryId,ccyId);
    }

    render() {
        const {countryId,ccyId,exists} = this.props;
        const {createPopulation} = this.props;

        return(
            <Fragment>

                <button
                    className={"btn btn-sm p-0 btn-block btn-"+(((countryId==="")||(ccyId===""))?"light":(exists?"secondary":"primary"))}
                    value={((countryId==="")||(ccyId===""))?"Please select country and currency":(exists?"The selected population already exists":"Create population: "+countryId+" "+ccyId)}
                    disabled={(countryId==="")||(ccyId==="")||exists}
                    onClick={(event) => {createPopulation(countryId,ccyId);}}
                >
                    {((countryId==="")||(ccyId===""))?"Please select country and currency":(exists?"The selected population already exists":"Create population: "+countryId+" "+ccyId)}
                </button>
                <br />
                <div className="container-fluid row p-0 m-0">
                    <div className="small col-lg-6 p-0 m-0 text-center">
                        <Countries />
                    </div>
                    <div className="small col-lg-6 p-0 m-0 text-center">
                        <Ccys />
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    countryId: state.global.country.id,
    ccyId: state.global.ccy.id,
    exists: state.client.population.exists,
});

const PopulationAdd = withRouter(connect(mapStateToProps,{populationExists,createPopulation})(_PopulationAdd));

export default PopulationAdd;