const appRenderer = require("../services/renderer").appRenderer;
const redirectNotFound = require("../services/renderer").redirectNotFound;
const wrap = require("./finalize").wrap;

exports.controllers = {
    app:        (req,res,next) => appRenderer(req,res,next),
    notFound:   (req,res,next) => redirectNotFound(req,res,next),
};