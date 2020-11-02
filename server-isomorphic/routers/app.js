import {regexExactRoutes} from "../../src/config/routes/routes";

const express = require("express");
const router  = express.Router();
const controllers = require("../controllers/controllers").controllers;

Object.keys(regexExactRoutes).forEach(route => router.get(regexExactRoutes[route].r,controllers.app));

module.exports = router;