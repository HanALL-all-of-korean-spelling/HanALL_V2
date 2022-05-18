import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

const spellingRouter = require("./spelling");
const spacingRouter = require("./spacing");
const qnaRouter = require("./qna");
const todayRouter = require("./today");

/* 라우터 등록 */
router.use("/spellings", spellingRouter);
router.use("/spacings", spacingRouter);
router.use("/qnas", qnaRouter);
router.use("/todays", todayRouter);

module.exports = router;
