import React,{Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {toggleMenu} from "../actions/guest";

class _HeaderMenu extends Component {
    render() {
        const {loggedIn,menuOpen} = this.props;
        const {toggleMenu} = this.props;

        return (
            <button className={"p-0 m-0 mt-1 mx-3 text-secondary border-0 bg-transparent animated sandwichMenu"+(loggedIn?" loggedIn":"")+(menuOpen?"":" active")}
                    onClick={toggleMenu}>
                <span className="animated" />
                <span className="animated" />
                <span className="animated" />
            </button>
        );
}
}

const mapStateToProps = state => ({
    loggedIn:           state.client.userAccess.loggedIn,
    menuOpen:           state.client.guest.menuOpen,
});

const HeaderMenu = withRouter(connect(mapStateToProps,{toggleMenu})(_HeaderMenu));

export default HeaderMenu;