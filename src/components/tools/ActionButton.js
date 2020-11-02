import React,{Component} from "react";
import Channel from "../../classes/Channel";
import SvgIcon from "../../classes/SvgIcon";

class ActionButton extends Component {
    render() {
        const {action,payload,text,buttonType,disabled=false,channel=false,noMargin=false,filled=false} = this.props;
        return (
            <button disabled={disabled}
                    onClick={event => {event.preventDefault(); action(payload); }}
                    className={"hoverBgWhite btn btn-sm btn-block "+(noMargin?noMargin:("my-2 py-"+(channel?"2 ":"2 ")))+buttonType+(channel?Channel.channelColor(channel):"")}>
                <div className={"container-fluid row p-0 m-0"+(noMargin.toString().includes("small")?" small":"")+(channel?"":" w-100")}>
                    <div className={"d-flex align-items-center"+(channel?"":" w-100")}>
                        {
                            !channel?"":
                                <div className="p-0 my-0 mx-3 sizeChannelIcon d-flex">
                                    <div className="m-auto" style={SvgIcon.channelIconSize(channel)}>
                                        <div className="position-relative" style={SvgIcon.channelIconSize(channel)}>
                                            {
                                                SvgIcon.channelPath[channel].map((p,i) =>
                                                    <div className={"topLeft "+(p.whiten?"hovered ":"")+((filled&&p.whiten)?"bg-white":(p.fill?"":("bg-"+Channel.channelColor(channel))))}
                                                     style={Object.assign({},SvgIcon.channelIconStyle(channel,i),(p.fill?{backgroundColor:p.fill}:{}))}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <svg className="sizeChannelIcon position-absolute" viewBox={SvgIcon.viewBox}>
                                        <defs>
                                            {
                                                SvgIcon.channelPath[channel].map((p,i) =>
                                                    <clipPath id={SvgIcon.channelClipPathId(channel,i)} clipPathUnits="objectBoundingBox">
                                                        <path d={p.d} />
                                                    </clipPath>
                                                )
                                            }
                                        </defs>
                                    </svg>
                                </div>
                        }
                        <div className={(channel?"ml-4":"w-100")+" d-inline-block text-"+(channel?"left":"center")}>{ text ? text : this.props.children}</div>
                    </div>
                </div>
            </button>
        );
    }
}

export default ActionButton;

