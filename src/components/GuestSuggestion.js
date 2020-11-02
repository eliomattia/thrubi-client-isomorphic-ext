import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {submitSuggestion} from "../actions/guest";
import {suggestionType} from "../config/guest";


class _GuestSuggestion extends Component {
    render() {
        const {type,transparent} = this.props;
        const {populationId,countryId,countryName} = this.props;
        const {submitSuggestion} = this.props;
        let refs = {country:null,suggestionText:null};
        return (
            <div className="my-2 text-center">
                <span><b>{""+(
                    type===suggestionType.COUNTRY_CHART?"Should you notice anything off, would you let us know?":
                    type===suggestionType.FAQ_PROPOSAL?"Have another question?":
                    type===suggestionType.IDENTITY_CERTIFICATION?"Your digital identity platform suggestion":
                    type===suggestionType.INCOME_VERIFICATION?"Your official income authority suggestion":
                        "")+""}</b></span>
                {
                    type===suggestionType.COUNTRY_CHART ||
                    type===suggestionType.FAQ_PROPOSAL
                        ? "" :
                        <input id="country" ref={input => refs.country = input} type="text"
                               className={"form-control form-control-sm rounded-0 my-2"+(transparent?" bg-transparent":"")}
                               placeholder="Country"
                               required/>
                }
                <input id="suggestionText" ref={input => refs.suggestionText = input} type="text"
                       className={"form-control form-control-sm rounded-0 my-2"+(transparent?" bg-transparent":"")}
                       placeholder={
                            type===suggestionType.COUNTRY_CHART?"In this "+countryName+" distribution...":
                            type===suggestionType.FAQ_PROPOSAL?"Question I would like to see answered":
                            type===suggestionType.IDENTITY_CERTIFICATION?"Suggested digital identity platform":
                            type===suggestionType.INCOME_VERIFICATION?"Suggested official income authority":
                                    "Your suggestion"}
                       required/>
                <ActionButton text={
                            type===suggestionType.COUNTRY_CHART?"Here is my remark":
                            type===suggestionType.FAQ_PROPOSAL?"Submit":
                                "Here is my suggestion"
                        }
                              action={() => {
                            const country = (populationId&&countryId)?(populationId+"_"+countryId):(refs.country&&refs.country.value);
                            const suggestion = refs.suggestionText&&refs.suggestionText.value;
                            submitSuggestion(type,country,suggestion);
                            if (refs.country&&refs.country.value) refs.country.value="";
                            if (refs.suggestionText&&refs.suggestionText.value) refs.suggestionText.value="";
                    }} buttonType={"btn-primary"+(transparent?" bg-transparent":"")} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    populationId:       state.client.ref.id,
    countryName:        state.client.ref.countryName,
    countryId:          state.client.ref.countryId,
});

const GuestSuggestion = withRouter(connect(mapStateToProps,{submitSuggestion})(_GuestSuggestion));

export default GuestSuggestion;