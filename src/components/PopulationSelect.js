import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Populations from "./Populations";
import ActionButton from "./tools/ActionButton";
import {fetchPopulations} from "../actions/population";
import {createMember} from "../actions/member";
import {changeFilter} from "../actions/population";

class _PopulationSelect extends Component {
    componentDidMount() {
        this.reload();
    };

    componentDidUpdate() {
        this.reload();
    };

    reload() {
        const {refList} = this.props;
        const {userId,populationsBusy,populationsNotAvailable} = this.props;
        const {fetchPopulations} = this.props;
        if ((!populationsBusy)&&(populationsNotAvailable)) fetchPopulations(userId,refList);
    }

    render() {
        const {busy,populationsBusy,populationsNotAvailable,populationId,refList} = this.props;
        const {createMember,changeFilter} = this.props;
        let countryFilter;

        return (
            busy?"Loading...":
                populationsBusy?"User populations loading...":
                    populationsNotAvailable?"No populations found...":
                        <Fragment>
                            <div className="d-flex w-100 flex-column flex-grow-1 align-items-center">
                                <div className="m-3 d-flex flex-column flex-grow-1 align-items-center">
                                    <div className="d-flex flex-column flex-grow-1 bg-light">
                                        <div className="text-center bg-primary text-light p-2">
                                            Please select your country and currency from the list below and confirm:
                                        </div>
                                        <input ref={input => countryFilter = input}
                                               onChange={() => changeFilter(countryFilter.value,refList)}
                                               type="text" className="form-control form-control-sm rounded-0 my-3 p-3"
                                               placeholder="Search by country or currency"/>
                                        <Populations refList={refList} />
                                        {
                                            refList?"":
                                                <ActionButton action={createMember}
                                                              payload={populationId}
                                                              disabled={!populationId}
                                                              text="Confirm"
                                                              noMargin="p-2"
                                                              buttonType=" btn-primary"
                                                />
                                        }
                                    </div>
                                    <a className="nav-link text-primary text-center" href="mailto:info@thrubi.org">Not found? Let us know: info@thrubi.org</a>
                                </div>
                            </div>
                        </Fragment>
        );
    }
}

const mapStateToProps = (state,ownProps) => ({
    busy:                       state.session.busy.component.userMenu,
    populationsBusy:            state.session.busy.action.populations,
    populationsNotAvailable:    ownProps.refList?(!state.client.ref.populations||!state.client.ref.populations.length):
                                                 (!state.client.population.populations||!state.client.population.populations.length),
    populationId:               ownProps.refList?state.client.ref.id:state.client.population.id,
});

const PopulationSelect = withRouter(connect(mapStateToProps,{fetchPopulations,createMember,changeFilter})(_PopulationSelect));

export default PopulationSelect;