import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import SvgIcon from "../classes/SvgIcon";
import Channel from "../classes/Channel";

const _Contact = () => (
    <div className="col-lg-4 m-0 px-0 pb-1 py-lg-3 text-center text-secondary">
        <div className="d-inline-block">
            <a href="mailto:info@thrubi.org" className="text-decoration-none font-weight-bold">
                <div className="py-0 px-1 text-secondary d-flex align-items-center">
                    <div className="p-0 my-0 mx-3 sizeChannelIcon d-flex">
                        <div className={"bg-secondary m-auto"}
                             style={SvgIcon.svgIconStyle("footerEmail")} />
                        <svg className="sizeChannelIcon position-absolute" viewBox={SvgIcon.viewBox}>
                            <defs>
                                <clipPath id="footerEmail" clipPathUnits="objectBoundingBox">
                                    <path d={SvgIcon.iconPath.email} />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    info@thrubi.org
                </div>
            </a>
            <a href="https://twitter.com/thrubi_org" target="_blank" rel="noopener noreferrer" className="text-decoration-none font-weight-bold">
                <div className="py-0 px-1 text-twitter d-flex align-items-center">
                    <div className="p-0 my-0 mx-3 sizeChannelIcon d-flex">
                        <div className={"bg-twitter m-auto"}
                             style={SvgIcon.svgIconStyle("footerTwitter")} />
                        <svg className="sizeChannelIcon position-absolute" viewBox={SvgIcon.viewBox}>
                            <defs>
                                <clipPath id="footerTwitter" clipPathUnits="objectBoundingBox">
                                    <path d={SvgIcon.channelPath.TWITTER[0].d} />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    @thrubi_org
                </div>
            </a>
            <a href="https://discord.gg/ZUHPgyt" target="_blank" rel="noopener noreferrer" className="text-decoration-none font-weight-bold">
                <div className="py-0 px-1 text-discord d-flex align-items-center">
                    <div className="p-0 my-0 mx-3 sizeChannelIcon d-flex">
                        <div className={"bg-discord m-auto"}
                             style={SvgIcon.svgIconStyle("footerDiscord")} />
                        <svg className="sizeChannelIcon position-absolute" viewBox={SvgIcon.viewBox}>
                            <defs>
                                <clipPath id="footerDiscord" clipPathUnits="objectBoundingBox">
                                    <path d={SvgIcon.channelPath.DISCORD[0].d} />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    Join Thrubi on Discord
                </div>
            </a>
            <a href="https://www.patreon.com/bePatron?u=30859926" target="_blank" rel="noopener noreferrer" className="text-decoration-none font-weight-bold">
                <div className="py-0 px-1 text-patreon d-flex align-items-center">
                    <div className="p-0 my-0 mx-3 sizeChannelIcon d-flex">
                        <div className="m-auto" style={SvgIcon.svgIconSize("footerPatreon")}>
                            <div className="position-relative" style={SvgIcon.svgIconSize("footerPatreon")}>
                                {
                                    SvgIcon.channelPath["PATREON"].map((p,i) =>
                                        <div className={"topLeft "+(p.whiten?"hovered ":"")+(p.fill?"":("bg-"+Channel.channelColor("PATREON")))}
                                             style={Object.assign({},SvgIcon.channelIconStyle("PATREON",i,"footer"),(p.fill?{backgroundColor:p.fill}:{}))}/>
                                    )
                                }
                            </div>
                        </div>
                        <svg className="sizeChannelIcon position-absolute" viewBox={SvgIcon.viewBox}>
                            <defs>
                                {
                                    SvgIcon.channelPath["PATREON"].map((p,i) =>
                                        <clipPath id={SvgIcon.channelClipFooterPathId("PATREON",i)} clipPathUnits="objectBoundingBox">
                                            <path d={p.d} />
                                        </clipPath>
                                    )
                                }
                            </defs>
                        </svg>
                    </div>
                    Become a Patron!
                </div>
            </a>
        </div>
    </div>
);

const mapStateToProps = state => ({
});

const Contact = withRouter(connect(mapStateToProps)(_Contact));

export default Contact;