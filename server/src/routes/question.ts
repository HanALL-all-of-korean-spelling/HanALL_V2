import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
const router = express.Router();
const esClient = require("../models/connection.ts");
const index: String = "questions";

router
  .route("/")
  // 전체 qna 리스트 조회
  .get(async (req: Request, res: Response, next: NextFunction) => {
    let page = req.query.page;

    let from: Number = 0;
    if (typeof page == "string") {
      from = (parseInt(page) - 1) * 10;
    }
    try {
      const result = await esClient.search({
        index: index,
        body: {
          _source: ["title", "created_at", "answer_flag"],
          size: "10",
          from: from,
          sort: { created_at: "desc" },
          query: {
            match_all: {},
          },
        },
      });
      res.status(200).json(result.body.hits.hits);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  // 문의글 작성
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
            answer_flag: false,
            created_at: new Date(
              +new Date() + 9 * 60 * 60 * 1000
            ).toISOString(),
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
  // 세부 문의글 조회
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const question_result = await esClient.search({
        index: index,
        body: {
          query: {
            bool: {
              must: [{ match: { _id: req.params.id } }],
            },
          },
        },
      });
      const answer_result = await esClient.search({
        index: "answers",
        body: {
          query: {
            bool: {
              must: [{ match: { question_id: req.params.id } }],
            },
          },
        },
      });
      const question: JSON = question_result.body.hits.hits[0];
      let answer: any = null;
      console.log("answer_result", answer_result.body.hits.hits[0]);
      if (answer_result.body.hits.hits[0]) {
        answer = answer_result.body.hits.hits[0];
      }

      res.status(200).json({ question: question, answer: answer });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  // 문의글 수정
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
          res.status(400).send("작성자가 아닙니다.");
        }
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  )
  // 문의글 삭제
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
          res.status(400).send("작성자가 아닙니다.");
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
 *  /api/questions:
 *      get:
 *          tags: [questions]
 *          summary: 문의 게시판 조회
 *          description: 문의 게시판 전체 조회
 *          parameters:
 *          - in: query
 *            name: "page"
 *            description: 페이지를 입력하세요.
 *            required: false
 *            schema:
 *                type: string
 *                description: 페이지
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 문의 게시판 조회 성공
 *      post:
 *          tags: [questions]
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
 *  /api/questions/{id}:
 *      get:
 *          tags: [questions]
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
 *                  description: 문의글 세부 조회 성공
 *      put:
 *          tags: [questions]
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
 *          tags: [questions]
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
