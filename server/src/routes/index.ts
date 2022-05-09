import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

const spellingRouter = require("./spelling");
const spacingRouter = require("./spacing");

/* 라우터 등록 */
router.use("/spellings", spellingRouter);
router.use("/spacings", spacingRouter);

module.exports = router;
