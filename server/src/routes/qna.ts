import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const esClient = require("../connection.ts");
const index: String = "board";

let get_today = new Date();
let get_year = get_today.getFullYear();
let get_month = get_today.getMonth() + 1;
let get_date = get_today.getDate();
let date = get_year + "-" + get_month + "-" + get_date;

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
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.index({
        index: index,
        body: {
          title: req.body.title,
          name: req.body.name,
          question: req.body.question,
          created_at: date,
        },
      });
      res.status(201).json(result.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

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
      console.log(req.params.id);
      res.status(200).json(result.body.hits.hits[0]._source);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.update({
        index: index,
        id: req.params.id,
        body: {
          doc: {
            title: req.body.title,
            name: req.body.name,
            question: req.body.question,
          },
        },
      });
      console.log(req.params.id);
      res.status(200).json(result.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.delete({
        index: index,
        id: req.params.id,
      });
      console.log(req.params.id);
      res.status(204).json(result.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

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
 *                description: title, name, question
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
 *                description: title, name, question
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
