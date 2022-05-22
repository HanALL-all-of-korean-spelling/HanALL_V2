import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

const spellingRouter = require("./spelling");
const spacingRouter = require("./spacing");
const qnaRouter = require("./qna");
const todayRouter = require("./today");
const authRouter = require("./auth");
const userRouter = require("./user");

/* 라우터 등록 */
router.use("/spellings", spellingRouter);
router.use("/spacings", spacingRouter);
router.use("/qnas", qnaRouter);
router.use("/todays", todayRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
