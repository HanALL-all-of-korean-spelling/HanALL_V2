import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
const router = express.Router();
const esClient = require("../models/connection.ts");
const index: String = "board";

let get_today = new Date();
let get_year = get_today.getFullYear();
let get_month = get_today.getMonth() + 1;
let get_date = get_today.getDate();
let date = `${get_year}-${get_month >= 10 ? get_month : "0" + get_month}-${
  get_date >= 10 ? get_date : "0" + get_date
}`;

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.search({
        index: index,
        body: {
          _source: ["title"],
          query: {
            match_all: {},
          },
        },
      });
      res.status(200).json(result.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await esClient.index({
          index: index,
          body: {
            title: req.body.title,
            nickname: req.user?._source.nickname,
            user_id: req.user?._id,
            question: req.body.question,
            created_at: date,
          },
        });
        res.status(201).json(result.body);
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  );

router
  .route("/:id")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.search({
        index: index,
        body: {
          query: {
            bool: {
              must: [{ match: { _id: req.params.id } }],
            },
          },
        },
      });
      res.status(200).json(result.body.hits.hits[0]._source);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .put(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const writer = await esClient.search({
          index: index,
          body: {
            query: {
              bool: {
                must: [{ match: { _id: req.params.id } }],
              },
            },
          },
        });
        if (writer.body.hits.hits[0]._source.user_id == req.user?._id) {
          const result = await esClient.update({
            index: index,
            id: req.params.id,
            body: {
              doc: {
                title: req.body.title,
                question: req.body.question,
              },
            },
          });
          res.status(200).json(result.body);
        } else {
          res.status(400).send(false);
        }
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const writer = await esClient.search({
          index: index,
          body: {
            query: {
              bool: {
                must: [{ match: { _id: req.params.id } }],
              },
            },
          },
        });
        if (writer.body.hits.hits[0]._source.user_id == req.user?._id) {
          const result = await esClient.delete({
            index: index,
            id: req.params.id,
          });
          res.status(204).send("삭제되었습니다.");
        } else {
          res.status(400).send(false);
        }
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  );

module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/qnas:
 *      get:
 *          tags: [qna]
 *          summary: 문의 게시판 조회
 *          description: 문의 게시판 전체 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 문의 게시판 조회 성공
 *      post:
 *          tags: [qna]
 *          summary: 문의 게시판 글 작성
 *          description: 문의 게시판 글 작성
 *          parameters:
 *          - in: body
 *            name: "req"
 *            required: true
 *            schema:
 *                type: string
 *                description: title, question
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 문의 게시판 글 작성 성공
 *  /api/qnas/{id}:
 *      get:
 *          tags: [qna]
 *          summary: 문의글 조회
 *          description: 문의글 세부 조회
 *          parameters:
 *          - in: path
 *            name: "id"
 *            required: true
 *            schema:
 *                type: string
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 문의글 조회 성공
 *      put:
 *          tags: [qna]
 *          summary: 문의글 수정
 *          description: 문의글 수정
 *          parameters:
 *          - in: path
 *            name: "id"
 *            required: true
 *            schema:
 *                type: string
 *          - in: body
 *            name: "req"
 *            required: true
 *            schema:
 *                type: string
 *                description: title, question
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 문의글 수정 성공
 *      delete:
 *          tags: [qna]
 *          summary: 문의글 삭제
 *          description: 문의글 삭제
 *          parameters:
 *          - in: path
 *            name: "id"
 *            required: true
 *            schema:
 *                type: string
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 문의글 삭제 성공
 */
