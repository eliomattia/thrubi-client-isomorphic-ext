const path          = require("path");
const serveFavicon  = require("serve-favicon");
const express       = require("express");
const router        = express.Router();
const app           = require("./app");
const notFound      = require("./notFound");
const ignoreOptions         = require("../controllers/middlewares/options").ignoreOptions;
const endpointNotFound      = require("../controllers/middlewares/error").endpointNotFound;

router.use(serveFavicon(path.join(__dirname,"../..","public","logo.png")));

// Preflight OPTIONS filtering
router.options("/*",ignoreOptions);

// Application router
router.use("/",app);

// Other static content
router.use(express.static(path.resolve(__dirname,"../..","build")));

// Webserver endpoint not found
router.use(notFound);

// Endpoint not found controller
router.use(endpointNotFound);

module.exports = router;