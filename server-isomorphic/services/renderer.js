import React from "react";
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import App from "../../src/components/App";
import serialize from "serialize-javascript";
import thrubiApp from "../../src/reducers/thrubiApp";
import {Provider} from "react-redux";
import {exactRoutes} from "../../src/config/routes/routes";
import actionType from "../../src/config/actionTypes";
import {guestMenuOption} from "../../src/config/guest";
import {optionUserMenu} from "../../src/config/user";
import {googleTrackingId} from "../../src/config/googleAnalytics";

const path  = require("path");
const fs    = require("fs");
const messageBook   = require("../config/message").messageBook;

const NODE_ENV = require("../../src/env/env").NODE_ENV;

exports.redirectNotFound = (req,res,next) => {
    return res.redirect(exactRoutes.NOT_FOUND.r);
};

exports.appRenderer = (req,res,next) => {
    const filePath = path.resolve(__dirname,"..","..","build","index.html");
    fs.readFile(filePath,"utf8",(error,htmlData) => {
        if (error) {
            console.error("error: ",error);
            return res.status(404).end();
        }

        const store = thrubiApp();
        store.dispatch({action:{type:actionType.SWITCH_OPTION_USER_MENU,payload:{optionUserMenu:optionUserMenu.ACCOUNT}}});
        Object.keys(exactRoutes).forEach(route => {
            if (req.url===exactRoutes[route].r&&guestMenuOption[route])
                store.dispatch({action:{type:actionType.RECEIVE_GUEST_MENU_OPTION,payload:{guestMenuOption:guestMenuOption[route]}}});
            if (req.url===exactRoutes[route].r&&optionUserMenu[route])
                store.dispatch({action:{type:actionType.SWITCH_OPTION_USER_MENU,payload:{optionUserMenu:optionUserMenu[route]}}});
        });
        store.dispatch({action:{type:actionType.SELECT_REF,payload:{population:{
            populationId:2,
            countryId:"US",
            countryName:"The United States of America, USA",
            ccyId:"USD",
            ccyName:"United States Dollar",
            ccySymbol:"$"
        }}}});

        let context = {};
        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        if (context.url) {
            return res.redirect(context.url);
        }

        const injectedHtml = htmlData.replace(
            `<div id="root" style="height:100%;display:flex;"></div>`,
            `<div id="root" style="height:100%;display:flex;">${html}</div>`
        ).replace(
            `"__SERVER_THRUBI_ENV__"`,
            `${serialize({NODE_ENV},{isJSON:true})}`
        ).replace(
            `"__SERVER_REDUX_STATE_INIT__"`,
            `${serialize(store.getState(),{isJSON:true})}`
        ).replace(
            "__GA_TRACKING_ID__",
            googleTrackingId
        ).replace(
            `"__GA_TRACKING_ID__"`,
            `"${googleTrackingId}"`
        );
        return res.send(injectedHtml);
    });
};