import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { readlink } from "fs";
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

      // 한 번도 포인트를 얻지 못 한 경우
      let point = 0;
      let rank = "맞춤법 초보";

      // 포인트를 얻은 적이 있는 경우
      if (req.user?._source.point) {
        point = req.user?._source.point;
      }
      if (req.user?._source.rank) {
        rank = req.user?._source.rank;
      }
      res.json({ email, nickname, rank, point });
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
      res.json(req.user?._source.scraps);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router
  .route("/tests")
  .get(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user?._source.scraps) {
          res.status(400).send("보관한 정보가 없어서 학습이 불가능해요!");
        }

        // 보관한 정보 id 합치기
        let scraps_list: Array<JSON> = [];
        const spellings: Array<JSON> = req.user?._source?.scraps.spelling!;
        const spacings: Array<JSON> = req.user?._source?.scraps.spacing!;
        scraps_list = scraps_list?.concat(spellings, spacings);

        const result = await esClient.search({
          index: "words",
          body: {
            query: {
              terms: {
                _id: scraps_list,
              },
            },
          },
        });
        res.json(result.body.hits.hits);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      let { point } = req.body;
      let rank: string = "";

      try {
        // 기존 포인트 확인
        const user = await esClient.search({
          index: index,
          body: {
            query: {
              match: {
                _id: req.user?._id,
              },
            },
          },
        });

        // 새 포인트 설정
        let usr_point = 0;
        if (user.body.hits.hits[0]._source?.point) {
          usr_point = parseInt(user.body.hits.hits[0]._source?.point);
        }
        usr_point = usr_point + parseInt(point);

        // 랭크 설정
        if (usr_point < 20) {
          rank = "맞춤법 초보";
        } else if (usr_point < 40) {
          rank = "맞춤법 중수";
        } else if (usr_point < 60) {
          rank = "맞춤법 고수";
        } else {
          rank = "맞춤법 지키미";
        }

        const result = await esClient.update({
          index: index,
          id: req.user?._id,
          body: {
            doc: {
              point: usr_point,
              rank: rank,
            },
          },
        });

        res.status(200).json(result.body);
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
 *  /api/users/tests:
 *      get:
 *          tags: [users]
 *          summary: 학습하기
 *          description: "우측 자물쇠 클릭 후 토큰을 입력하세요."
 *          security:
 *              - cookieAuth: []
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 학습하기 성공
 *      put:
 *          tags: [users]
 *          summary: 학습하기
 *          description: "우측 자물쇠 클릭 후 토큰을 입력하세요."
 *          security:
 *              - cookieAuth: []
 *          parameters:
 *          - in: body
 *            name: "req"
 *            description: point를 작성하세요.
 *            required: true
 *            schema:
 *                type: string
 *                description: point
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 학습하기 성공
 */
