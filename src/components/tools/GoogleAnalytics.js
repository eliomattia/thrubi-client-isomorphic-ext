import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {googleTrackingId} from "../../config/googleAnalytics";

class _GoogleAnalytics extends Component {
    componentDidMount() {
        this.props.history.listen(location => {
            window.gtag("config",googleTrackingId,{
                "page_title":       document.title,
                "page_location":    window.location.href,
                "page_path":        location.pathname
            });
        });
    };

    render() {
        return <Fragment />;
    }
}

const GoogleAnalytics = withRouter(_GoogleAnalytics);

export default GoogleAnalytics;
