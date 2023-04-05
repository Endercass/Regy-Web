import express from "express";
import * as url from "url";
import path from "path";
var router = express.Router();
/* GET home page. */
router.get("/*", express.static("dist"));

export default router;
