import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();
const esClient = require("../connection.ts");
require("dotenv").config();

const index: String = "users";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_info = req.user;
      res.json(user_info);
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
 *          description: "우측 자물쇠 클릭 후 'Bearer 토큰'을 입력하세요."
 *          security:
 *              - cookieAuth: []
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 회원 정보 확인 성공
 */
