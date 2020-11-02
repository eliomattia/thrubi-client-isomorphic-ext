const express = require("express");
const router  = express.Router();
const controllers = require("../controllers/controllers").controllers;

router.use("*",controllers.notFound);

module.exports = router;