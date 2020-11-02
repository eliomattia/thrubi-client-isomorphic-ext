import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {fetchCcys,selectCcy,deselectCcy} from "../actions/adminMenu";

class _Ccys extends Component {
    componentDidMount() {
        const {fetchCcys} = this.props;
        fetchCcys();
    }

    render() {
        const {ccys,ccyId} = this.props;
        const {selectCcy,deselectCcy} = this.props;

        return(
            <div>
                {
                    ccys.map((ccy,index) =>{
                        return (
                            <div key={index} className="ccy p-0">
                                <button
                                    className={"btn btn-sm p-0 btn-block btn-"+
                                    (ccyId===ccy.ccyId
                                            ?"light"
                                            :"primary")}
                                    value={(ccyId===ccy.ccyId)?"Selected":"Select #"+ccy.ccyId}
                                    onClick={(ccyId===ccy.ccyId)
                                        ?((event) => {deselectCcy();})
                                        :((event) => {selectCcy(ccy.ccyId);})
                                    }
                                >
                                    <div className="container-fluid row p-0 m-0">
                                        <div className="small col-lg-3 p-0 m-0 text-center">
                                            {(ccyId===ccy.ccyId)?"Selected":"Select #"+ccy.ccyId}
                                        </div>
                                        <div className="small col-lg-2 p-0 m-0 text-center">{ccy.ccyId}</div>
                                        <div className="small col-lg-5 p-0 m-0 text-left">{ccy.ccyName}</div>
                                        <div className="small col-lg-2 p-0 m-0 text-center">{ccy.ccySymbol}</div>
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
    ccys: state.global.ccy.ccys,
    ccyId: state.global.ccy.id,
});

const Ccys = withRouter(connect(mapStateToProps,{fetchCcys,selectCcy,deselectCcy})(_Ccys));

export default Ccys;