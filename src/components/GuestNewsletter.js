import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ActionButton from "./tools/ActionButton";
import {subscribeNewsletter,subscribeNewsletterReset} from "../actions/guest";

class _GuestNewsletter extends Component {
    render() {
        const {color} = this.props;
        const {guestSubscribed} = this.props;
        const {subscribeNewsletter,subscribeNewsletterReset} = this.props;
        let guestEmail;

        return (
            <Fragment>
                <p className="px-2 mb-2">{guestSubscribed?"Subscribed to the newsletter!":"Subscribe to the newsletter"}</p>
                {
                    guestSubscribed
                        ?
                        <Fragment>
                            <ActionButton buttonType={" d-inline-block w-75 btn-outline-"+color+" rounded mx-2 "}
                                          noMargin="px-2"
                                          text="Subscribe another email address"
                                          action={subscribeNewsletterReset} />
                        </Fragment>
                        :
                        <Fragment>
                            <br className="d-lg-none" />
                            <input ref={input => guestEmail = input}
                                   type="text" className="d-inline-block formControlSandwich formControlSandwichTrail rounded-top m-0 w-75"
                                   placeholder="My email address" required/>
                            <br className="d-lg-none" />
                            <ActionButton buttonType={" d-inline-block w-75 btn-outline-"+color+" roundedBottom mx-2 "}
                                          noMargin="px-2"
                                          text="Keep me up to date"
                                          action={() => subscribeNewsletter(guestEmail.value)} />
                        </Fragment>
                }
            </Fragment>
        );
    };
}

const mapStateToProps = (state,ownProps) => ({
    guestSubscribed:    state.client.guest.subscribed,
    color:              ownProps.color,
});

const GuestNewsletter = withRouter(connect(mapStateToProps,{subscribeNewsletter,subscribeNewsletterReset})(_GuestNewsletter));

export default GuestNewsletter;


