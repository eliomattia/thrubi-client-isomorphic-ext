import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import GuestSuggestion from "./GuestSuggestion";
import ActionButton from "./tools/ActionButton";
import Logo from "../classes/Logo";
import {toggleFaq} from "../actions/guest";
import {loggableActionValue} from "../config/user";
import {suggestionType} from "../config/guest";

class _GuestFaq extends Component {
    render() {
        const {faqState} = this.props;
        const {toggleFaq} = this.props;
        return(
            <div className="container-fluid">
                <div className="row py-2 rounded-bottom">
                    {
                        [
                            {actions: [
                                    {
                                        actionValue:loggableActionValue.VISION_IDENTITY,
                                        buttonText:"How to certify my identity?",
                                        text:"We are considering various partners for identity certification, from "+
                                            "official government agencies to country-agnostic services such as Veriff. "+
                                            "Do you know a reliable identity certification entity in your country? Please " +
                                            "let us know below. Here are the options we are currently investigating:",
                                        list:["United States of America: login.gov/SSN","The Netherlands: iDIN/DigiD","Italy: SPID"],
                                        suggestion:suggestionType.IDENTITY_CERTIFICATION,
                                    },
                                    {
                                        actionValue:loggableActionValue.VISION_INCOME_DISCLOSE,
                                        buttonText:"Should I disclose my income?",
                                        text:"Yes, Thrubi needs to be informed of your earnings in order to calculate " +
                                             "how to distribute basic income to you and to others in your country. " +
                                             "We will fetch and process your income information only if you explicitly " +
                                             "allow us to.",
                                    },
                                    {
                                        actionValue:loggableActionValue.VISION_INCOME_VERIFY,
                                        buttonText:"How will Thrubi verify my income?",
                                        text:"We are working to collaborate with government entities in order to gather " +
                                             "current and trustworthy information regarding your income. Do you know which " +
                                             "agency to cooperate with in your country? Please let us know below.",
                                        suggestion:suggestionType.INCOME_VERIFICATION,
                                    },
                                    {
                                        actionValue:loggableActionValue.VISION_INCOME_FRAUD,
                                        buttonText:"What about those who declare a false income?",
                                        text:"Our efforts will go towards reducing fraud as much as conceivable. Thrubi " +
                                             "will work to cover the unavoidable remaining small percentage of fraudulent " +
                                             "income declarations by an appropriate insurance policy. It should cover basic " +
                                             "income unfairly attributed to fraudulent declarations and taken away from " +
                                             "legitimate recipients. Those responsible would be banned from receiving " +
                                             "basic income in the future.",
                                    },
                                    {
                                        actionValue:loggableActionValue.VISION_TAX_HAVENS,
                                        buttonText:"How does Thrubi deal with undeclared offshore incomes?",
                                        text:"Tax havens are an ongoing issue for the realization of a fair universal basic " +
                                             "income and will be until countries agree on common rules for income declaration " +
                                             "and transparency on financial matters. It is still important to implement " +
                                             "basic income plans to the extent of our capabilities, while governments work " +
                                             "together to define more efficient schemes of financial cooperation.",
                                    },
                                    {
                                        actionValue:loggableActionValue.VISION_UBI_MONTHLY,
                                        buttonText:"Will I receive basic income every month?",
                                        text:"No, initially you will receive basic income only whenever wealthy individuals " +
                                             "in your country actively participate by transferring a sum of money. The " +
                                             "periodicity of basic income payments could change in the future. We will keep " +
                                             "you informed regarding that.",
                                    },
                                ],
                                style:"thrubiBlue",    image:"/jpg/crowd.jpg",     bg:"everybody", color:"primary",     header:"Vision",},
                            {actions: [
                                    {
                                        actionValue:loggableActionValue.WEALTHY_GOLD,
                                        buttonText:"What about my Thrubi Gold?",
                                        text:"At the moment, Thrubi Gold acquired in your country is only representative " +
                                             "of the extent to which you have contributed towards basic income. While in the future " +
                                             "it might become possible to freely trade Thrubi Gold, it is at the moment " +
                                             "non-transferable. We also intend to gauge interest by government agencies " +
                                             "to accept Thrubi Gold as a means to cover your tax duties, given that by purchasing " +
                                             "Thrubi Gold, you will have directly contributed to growth in your society.",
                                    },
                                    {
                                        actionValue:loggableActionValue.WEALTHY_COMPANY,
                                        buttonText:"I represent a company. Can I contribute?",
                                        text:"Please get in touch at info@thrubi.org \u2014 while at the moment Thrubi " +
                                             "algorithms only support individuals and tax units (couples or families) " +
                                             "that declare income together, our long-term plan is to include companies in the " +
                                             "picture. We would be delighted to hear your intentions.",
                                    },
                                    {
                                        actionValue:loggableActionValue.WEALTHY_WORLDWIDE,
                                        buttonText:"Benefiting just my country seems too restrictive. What about a worldwide basic income?",
                                        text:"The long-term plans for Thrubi include extending our basic income scheme to the whole " +
                                             "world's population. We have income distribution data to work towards that goal, already. " +
                                             "Before it can become a reality, a few technicalities need to be covered first, such as " +
                                             "ensuring universal identity certification and stronger income verification procedures.",
                                    },
                                    {
                                        actionValue:loggableActionValue.WEALTHY_PUBLIC_INFO,
                                        buttonText:"I would like people to know that I contributed to Thrubi. Will my payments be made public?",
                                        text:"Yes, all Thrubi Gold purchase proceedings go towards basic income and will be publicly " +
                                             "available, unless you explicitly have us not reveal that information.",
                                    },
                                    {
                                        actionValue:loggableActionValue.WEALTHY_BUSINESS_MODEL,
                                        buttonText:"How does Thrubi make money?",
                                        text:"We are currently working on our business model. The current possibilities are: 1) advertisements, " +
                                             "2) a fee on Thrubi Gold purchases, 3) donations (e.g., via Patreon). Let us know your suggestions: " +
                                             "info@thrubi.org",
                                    },
                                ],
                                style:"thrubiSilver",  image:"/jpg/hanauer.jpg",   bg:"wealthy",   color:"secondary",   header:"Wealthy individuals",},
                            {actions: [
                                    {
                                        actionValue:loggableActionValue.SOCIETIES_UBI_GOV,
                                        buttonText:"Shouldn't universal basic income be the government's responsibility?",
                                        text:"Probably. However, it seems a target that is hard to agree upon as a government. That leaves " +
                                             "the wealthy who protect their own interests able to do so, and other wealthy individuals " +
                                             "advocating basic income and even willing to actively pay towards it unable to do so, " +
                                             "for lack of a suitable platform, and left to blame the government. Enter Thrubi.",
                                    },
                                    {
                                        actionValue:loggableActionValue.SOCIETIES_THRUBI_WHY,
                                        buttonText:"What is the main goal for Thrubi?",
                                        text:"Thrubi aims to create a global community where UBI can be achieved according to shared " +
                                             "principles and rational mathematical models. The desired result is a fair, healthy society " +
                                             "that people love being an active part of.",
                                    },
                                    {
                                        actionValue:loggableActionValue.SOCIETIES_MODELS_PUBLIC,
                                        buttonText:"Are the in-house models publicly available?",
                                        text:"The in-house models underlying all basic income calculations will be made open source " +
                                             "in the future. For the time being, they are not public. The rationale behind that decision " +
                                             "is we have an edge and would like to keep that advantage to gain traction around the " +
                                             "intended goal for Thrubi, which is to achieve positive social change around financial " +
                                             "fairness in an evolving world.",
                                    },
                                    {
                                        actionValue:loggableActionValue.SOCIETIES_GOV_CONTRIBUTE,
                                        buttonText:"I represent a government. How can we implement Thrubi in our country?",
                                        text:"Please get in touch at info@thrubi.org \u2014 The starting point would be to provide " +
                                             "a proven way of identifying your citizens and their incomes. It would be desirable for you " +
                                             "to start thinking whether your would accept Thrubi Gold to fulfill tax duties in your country.",
                                    },
                                    {
                                        actionValue:loggableActionValue.SOCIETIES_FLAT_UBI,
                                        buttonText:"Prices will rise, so basic income is useless. Right?",
                                        text:"Wrong, you are probably assuming that everybody should be paid a flat UBI amount. That is not sustainable. " +
                                             "What needs to be addressed in any basic income scheme is not the basic income itself, as a number, but rather " +
                                             "a country's income distribution. Given the latter, it is possible to calculate a target income " +
                                             "distribution whereby anyone below a (variable) income threshold gets a basic income, higher for " +
                                             "those with lower earnings. By periodically recalculating the target distribution and the individual " +
                                             "basic incomes, it is possible to create a scheme that does not barely provide a fixed amount of money " +
                                             "with an inevitably decreasing purchasing power, but rather connects all individuals in an overarching social " +
                                             "scheme. Thrubi does exactly that with its inner models. By so doing, a society keeps its selfish incentives to " +
                                             "innovate \u2014 its citizens are still rewarded by much higher incomes for higher contributions \u2014 but " +
                                             "ensures its members that they will grow together. As an additional benefit, the extreme inequalities " +
                                             "that put institutions at risk are smoothed out.",
                                    },
                                    {
                                        actionValue:loggableActionValue.SOCIETIES_MODELS_ABOUT,
                                        buttonText:"I am still curious. How do the social models used to determine basic income work exactly?",
                                        text:"Here is a short summary, but please also read the answer to the question \"Prices will rise...\" if you " +
                                             "haven't already. Capitalism has an inherent benefit \u2014 selfish incentives to innovate, produce " +
                                             "better goods and provide better services go at the heart of human nature \u2014 and an inherent dangerous " +
                                             "mechanics \u2014 investment principles, as opposed to consumption, if applied at scale have the ability to " +
                                             "starve the entire system, as is seen during financial crises. Without going into the important moral " +
                                             "considerations of workers' rights and the consequences of owning entire sectors of a society, from the " +
                                             "bare point of view of efficiency, it is not convenient for either the poor or the rich to have an economy " +
                                             "swinging between periods of over-exploitation and periods of stagnation. Thrubi aims with its inner models " +
                                             "to preserve the benefit of growth while inhibiting the dangerous mechanics of starvation. It recreates an " +
                                             "optimal distribution that allows the poor to live a healthy life and contribute to a healthy society and " +
                                             "the rich to keep on thriving.",
                                    },
                                ],
                                style:"thrubiGold",    image:"/jpg/futuristic.jpg",bg:"societies", color:"success",     header:"Thriving societies",},
                        ].map(e => (
                                <div key={e.bg} className="col-xl-4 p-0 m-0 navbar-light">
                                    <div className={"mr-0 mx-lg-3 mb-0 my-lg-0 text-center text-lg-center px-4 py-3 text-light bg-"+e.color}
                                         style={Logo.logoBg("left","luminosity")}>
                                        <h2 className="text-light">{e.header}</h2>
                                    </div>
                                    <div className={"mr-0 mx-lg-3 mb-4 my-lg-0 "+e.style}>
                                        <div style={{backgroundImage: "url("+e.image+")",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}
                                             className={"border-0 container-fluid m-0 "+e.bg+" p-4 text-"+e.color}>
                                            {e.actions.map(a =>
                                                <div key={"I"+a.actionValue}>
                                                    <ActionButton text={a.buttonText} buttonType={"my-4 btn-outline-"+e.color} action={null} />
                                                    {
                                                        !faqState[a.actionValue]?"":
                                                            <Fragment>
                                                                <div className="p-0">{a.text}</div>
                                                                {
                                                                    !a.list?"":
                                                                        <ul>
                                                                            {
                                                                                a.list.map(l => <li>{l}</li>)
                                                                            }
                                                                        </ul>
                                                                }
                                                                {!a.suggestion?"":<GuestSuggestion transparent={true} type={a.suggestion} />}
                                                            </Fragment>
                                                    }
                                                </div>)}
                                        </div>
                                        <div className={"border-0 container-fluid m-0 overflow-hidden topLeft p-4 opaque text-"+e.color}>
                                            {e.actions.map(a =>
                                                <div key={"T"+a.actionValue}>
                                                    <ActionButton text={a.buttonText} buttonType={"my-4 btn-outline-"+e.color} action={() => {toggleFaq(a.actionValue)}} />
                                                    {
                                                        !faqState[a.actionValue] ? "":
                                                            <Fragment>
                                                                <div className="p-0">{a.text}</div>
                                                                {
                                                                    !a.list?"":
                                                                        <ul>
                                                                            {
                                                                                a.list.map(l => <li>{l}</li>)
                                                                            }
                                                                        </ul>
                                                                }
                                                                {!a.suggestion?"":<GuestSuggestion transparent={false} type={a.suggestion} />}
                                                            </Fragment>
                                                    }
                                                </div>)}
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                <div className="row">
                    <div className="col-lg-12 p-0 px-4 px-lg-0 px-lg-3">
                        <GuestSuggestion transparent={false} type={suggestionType.FAQ_PROPOSAL} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    faqState:   state.client.guest.faqState,
});

const GuestFaq = withRouter(connect(mapStateToProps,{toggleFaq})(_GuestFaq));

export default GuestFaq;