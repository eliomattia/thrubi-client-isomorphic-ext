import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {d3plot} from "../actions/chart";

class _Chart extends Component {
    // Chart objects
    svgChart;
    // -------------

    componentDidMount() {
        const {d3plot} = this.props;
        d3plot(this.svgChart);
        window.addEventListener("resize",() => d3plot(this.svgChart));
    }

    componentDidUpdate() {
        const {d3plot} = this.props;
        d3plot(this.svgChart);
    }

    render() {
        return(
            <div className="container-fluid m-0">
                <div className="row mr-0">
                    <div className="col-lg-12">
                        <svg className="w-100" ref={input => this.svgChart = input} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const Chart = withRouter(connect(mapStateToProps,{d3plot})(_Chart));

export default Chart;