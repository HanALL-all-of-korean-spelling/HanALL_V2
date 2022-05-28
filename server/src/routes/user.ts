import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();
const esClient = require("../models/connection.ts");
require("dotenv").config();

const index: String = "users";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.user?._source.email;
      const nickname = req.user?._source.nickname;
      res.json({ email, nickname });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/scraps",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.user);
      res.json(req.user?._source.scraps);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;

/**
 * @swagger
 *  securityDefinitions:
 *      cookieAuth:
 *          type: apiKey
 *          name: token
 *          in: header
 *
 * paths:
 *  /api/users:
 *      get:
 *          tags: [users]
 *          summary: 회원 정보 확인
 *          description: "우측 자물쇠 클릭 후 토큰을 입력하세요."
 *          security:
 *              - cookieAuth: []
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 회원 정보 확인 성공
 *  /api/users/scraps:
 *      get:
 *          tags: [users]
 *          summary: 회원 스크랩 확인
 *          description: "우측 자물쇠 클릭 후 토큰을 입력하세요."
 *          security:
 *              - cookieAuth: []
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 회원 스크랩 확인 성공
 */
