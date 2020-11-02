import React,{Component,Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import GuestMenu from "./GuestMenu";
import {hideMenu} from "../actions/guest";
import "./styles/App.scss";

class _ScreenMenu extends Component {
    render() {
        const {menuOpen} = this.props;
        const {hideMenu} = this.props;

        return (
            <Fragment>
                <div id="bgTargetOuter" onClick={e => {if (e.target.id.includes("bgTarget")) hideMenu();}}
                     className={"topMargin p-0 animated fixed-top w-100 remainingHeight d-flex flex-column align-items-start overflow-auto"+(menuOpen?" bgShadow":" animateHide")} >
                    <div id="bgTargetVertical" className="container-fluid col-8 col-lg-3 m-0 p-0">
                        <div id="bgTargetHorizontal" className={"w-100 bg-white animated position-relative d-flex flex-row"+(menuOpen?" showLeft":" hideLeft")}>
                            <GuestMenu />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
    menuOpen:           state.client.guest.menuOpen,
});

const ScreenMenu = withRouter(connect(mapStateToProps,{hideMenu})(_ScreenMenu));

export default ScreenMenu;


