const express = require("express");

const router = express.Router();

const errorPage = require("../controllers/404error");

router.use(errorPage.pageNotFound);

module.exports = router;