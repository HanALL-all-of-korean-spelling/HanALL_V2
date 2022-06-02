import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

const spellingRouter = require("./spelling");
const spacingRouter = require("./spacing");
const todayRouter = require("./today");
const authRouter = require("./auth");
const userRouter = require("./user");
const questionRouter = require("./question");
const answerRouter = require("./answer");

/* 라우터 등록 */
router.use("/spellings", spellingRouter);
router.use("/spacings", spacingRouter);
router.use("/todays", todayRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/questions", questionRouter);
router.use("/answers", answerRouter);

module.exports = router;
