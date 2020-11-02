require("dotenv").config();
require("ignore-styles");
const serverListen = require("./serverListen").serverListen;

// babel import jsx
require("@babel/register")({
    ignore:[/(node_modules)/],
    presets:["@babel/env","@babel/react"],
    plugins:["@babel/proposal-class-properties"],
});

const fs            = require("fs");
const http          = require("http");
const https         = require("https");
const path          = require("path");
const express       = require("express");
const bodyParser    = require("body-parser");
const router        = require("./routers/router");
const logger        = require("./controllers/middlewares/logger");

const jsonParser = bodyParser.json(({limit:"50mb"}));


// ---
// app
// ---

const app = express();

app.use(jsonParser);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,X-Access-Token");
    next();
});
app.use(logger.logRequest);

app.use("",router);

// -------
// servers
// -------

const privateKey  = fs.readFileSync(path.resolve(__dirname,process.env.HTTPS_CERTIFICATE_PATH_PRIVATE_KEY),"utf8");
const certificate = fs.readFileSync(path.resolve(__dirname,process.env.HTTPS_CERTIFICATE_PATH_CERTIFICATE),"utf8");
const passphrase  = process.env.HTTPS_PASSPHRASE;

const credentials = {key:privateKey,cert:certificate,passphrase:passphrase};

const httpServer  = http.createServer(app);
const httpsServer = https.createServer(credentials,app);

const IP = process.env.IP;
const HTTP_PORT   = process.env.PORT || process.env.HTTP_PORT;
const HTTPS_PORT  = process.env.PORT || process.env.HTTPS_PORT;

serverListen(httpServer,httpsServer,IP,HTTP_PORT,HTTPS_PORT);
