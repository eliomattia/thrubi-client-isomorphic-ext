import React from "react";
import Channel from "../../classes/Channel";
import SvgIcon from "../../classes/SvgIcon";

const RadioButtons = ({columnSize,activeFilter,checkedFilter,invertFilters,action,elements}) =>
    <div data-toggle="buttons" className="btn btn-block btn-group btn-group-toggle border-0 row p-0 m-0">
        {
            elements.map((element,key) =>
                <button
                    key={element.key}
                    id={element.key}
                    onClick={(event) => {event.preventDefault();action(element.route?element.route:element.key);}}
                    defaultChecked={invertFilters?(checkedFilter!==element.key):(checkedFilter===element.key)}
                    disabled={false} //should be using disabledFilter, but having CSS issues
                    className={"btn btn-sm btn-block small p-0 m-0 py-2 "+element.color+" "+columnSize+""+
                            ((invertFilters?(activeFilter!==element.key):(activeFilter===element.key))?" active":"")}
                >
                    <div className={"container-fluid row p-0 m-0"+(element.channel?"":" w-100")}>
                        <div className={(element.channel?"":"w-100")}>
                            {
                                !element.channel?"":
                                    <div className="p-0 my-0 mx-3 sizeChannelIcon d-flex">
                                        <div className="m-auto" style={SvgIcon.channelIconSize(element.channel)}>
                                            <div className="position-relative" style={SvgIcon.channelIconSize(element.channel)}>
                                                {
                                                    SvgIcon.channelPath[element.channel].map((p,i) =>
                                                        <div className={"topLeft "+(p.whiten?"hovered ":"")+(((invertFilters?(activeFilter!==element.key):(activeFilter===element.key))&&p.whiten)?"bg-white":(p.fill?"":("bg-"+Channel.channelColor(element.channel))))}
                                                             style={Object.assign({},SvgIcon.channelIconStyle(element.channel,i),(p.fill?{backgroundColor:p.fill}:{}))}/>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <svg className="sizeChannelIcon position-absolute" viewBox={SvgIcon.viewBox}>
                                            <defs>
                                                {
                                                    SvgIcon.channelPath[element.channel].map((p,i) =>
                                                        <clipPath id={SvgIcon.channelClipPathId(element.channel,i)} clipPathUnits="objectBoundingBox">
                                                            <path d={p.d} />
                                                        </clipPath>
                                                    )
                                                }
                                            </defs>
                                        </svg>
                                    </div>
                            }
                            <div className={(element.channel?"ml-4":"w-100")+" d-inline-block text-"+(element.channel?"left":"center")}>{element.text}</div>
                        </div>
                    </div>
                </button>
            )
        }
    </div>
;

export default RadioButtons;

