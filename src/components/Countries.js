import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {fetchCountries,selectCountry,deselectCountry} from "../actions/adminMenu";

class _Countries extends Component {
    componentDidMount() {
        const {fetchCountries} = this.props;
        fetchCountries();
    }

    render() {
        const {countries,countryId} = this.props;
        const {selectCountry,deselectCountry} = this.props;

        return(
            <div>
                {
                    countries.map((country,index) =>{
                        return (
                            <div key={index} className="country p-0">
                                <button
                                    className={"btn btn-sm p-0 btn-block btn-"+
                                    (countryId===country.countryId
                                            ?"light"
                                            :"primary")}
                                    value={(countryId===country.countryId)?"Selected":"Select #"+country.countryId}
                                    onClick={(countryId===country.countryId)
                                        ?((event) => {deselectCountry();})
                                        :((event) => {selectCountry(country.countryId);})
                                    }
                                >
                                    <div className="container-fluid row p-0 m-0">
                                        <div className="small col-lg-4 p-0 m-0 text-center">
                                            {(countryId===country.countryId)?"Selected":"Select #"+country.countryId}
                                        </div>
                                        <div className="small col-lg-2 p-0 m-0 text-center">{country.countryId}</div>
                                        <div className="small col-lg-6 p-0 m-0 text-left">{country.countryName}</div>
                                    </div>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    countries: state.global.country.countries,
    countryId: state.global.country.id,
});

const Countries = withRouter(connect(mapStateToProps,{fetchCountries,selectCountry,deselectCountry})(_Countries));

export default Countries;