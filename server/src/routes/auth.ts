import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();
const esClient = require("../models/connection.ts");
require("dotenv").config();

const index: String = "users";

// 회원가입
router.post(
  "/join",
  isNotLoggedIn,
  [
    body("email").notEmpty().isEmail(),
    body("nickname").notEmpty(),
    body("password").notEmpty().isLength({ min: 8 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    // 입력값 검증에 문제가 있는 경우 에러 정보 전달
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, nickname, password } = req.body;
    try {
      const exUser: any = await esClient.search({
        index: index,
        body: {
          query: {
            bool: {
              must: [{ match: { email: email } }],
            },
          },
        },
      });
      // 기존에 같은 이메일로 가입한 회원이 있으면 돌려보냄
      if (exUser.body.hits.total.value == 1) {
        return res.status(400).send("이미 가입하셨습니다.");
      }
      const hash = await bcrypt.hash(password, 12);
      const result = await esClient.index({
        index: index,
        body: {
          email: email,
          nickname: nickname,
          password: hash,
        },
      });
      //return res.status(200).redirect("/");
      return res.status(200).send("회원가입 완료");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
);

router.post(
  "/login",
  isNotLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        // 회원가입 하지 않은 유저
        res.status(400).send("가입되지 않은 이메일입니다.");
        return next(authError);
      }
      if (!user) {
        // 비밀번호 불일치
        return res.status(400).send("비밀번호가 일치하지 않습니다.");
      }
      req.login(user, { session: false }, (loginError) => {
        // 로그인 성공
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        // 로그인 성공 시 토큰 발급
        const token = jwt.sign(
          { id: user.body.hits.hits[0]._id },
          process.env.JWT_SECRET as string,
          { expiresIn: "1d" }
        );
        return res
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json({ token });
      });
    })(req, res, next);
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.clearCookie("token");
    res.clearCookie("jwt");
    res.clearCookie("myApp.authToken").end();
    return;
  }
);

module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/auth/join:
 *      post:
 *          tags: [auth]
 *          summary: 회원가입
 *          description: 회원가입
 *          parameters:
 *          - in: body
 *            name: "user"
 *            description: "email, nickname, password를 json 형식으로 입력하세요."
 *            required: true
 *            schema:
 *                type: string
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 회원가입 성공
 *  /api/auth/login:
 *      post:
 *          tags: [auth]
 *          summary: 로그인
 *          description: 로그인
 *          parameters:
 *          - in: body
 *            name: "user"
 *            description: "email, password를 json 형식으로 입력하세요."
 *            required: true
 *            schema:
 *                type: string
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 로그인 성공
 *  /api/auth/logout:
 *      get:
 *          tags: [auth]
 *          summary: 로그아웃
 *          description: 로그아웃
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 로그아웃 성공
 */
