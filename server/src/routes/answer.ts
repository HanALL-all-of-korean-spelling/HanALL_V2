import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
const router = express.Router();
const esClient = require("../models/connection.ts");
const index: String = "answers";

router
  .route("/")
  // 답변 작성
  .post(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.user?._source.email != "matji1349@gmail.com") {
        res.status(400).send("잘못된 접근입니다.");
      }
      try {
        const result = await esClient.index({
          index: index,
          body: {
            answer: req.body.answer,
            question_id: req.body.question_id,
          },
        });
        const question_update = await esClient.update({
          index: "questions",
          id: req.body.question_id,
          body: {
            doc: {
              answer_flag: true,
            },
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
  // 답변 수정
  .put(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.user?._source.email != "matji1349@gmail.com") {
        res.status(400).send("잘못된 접근입니다.");
      }
      try {
        const result = await esClient.update({
          index: index,
          id: req.params.id,
          body: {
            doc: {
              answer: req.body.answer,
            },
          },
        });
        res.status(200).json(result.body);
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  )
  // 답변 삭제
  .delete(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.user?._source.email != "matji1349@gmail.com") {
        res.status(400).send("잘못된 접근입니다.");
      }
      try {
        const search_result = await esClient.search({
          index: index,
          body: {
            query: {
              bool: {
                must: [{ match: { _id: req.params.id } }],
              },
            },
          },
        });
        //console.log(search_result.body);
        const question_id = search_result.body.hits.hits[0]._source.question_id;

        const question_update = await esClient.update({
          index: "questions",
          id: question_id,
          body: {
            doc: {
              answer_flag: false,
            },
          },
        });

        const delete_result = await esClient.delete({
          index: index,
          id: req.params.id,
        });
        res.status(204).send("삭제되었습니다.");
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
 *  /api/answers:
 *      post:
 *          tags: [answers]
 *          summary: 답변 작성
 *          description: 답변 작성
 *          parameters:
 *          - in: body
 *            name: "req"
 *            description: answers, question_id 를 입력하세요.
 *            required: true
 *            schema:
 *                type: string
 *                description: answers, question_id
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 답변 작성 성공
 *  /api/answers/{id}:
 *      put:
 *          tags: [answers]
 *          summary: 답변 수정
 *          description: 답변 수정
 *          parameters:
 *          - in: path
 *            name: "id"
 *            description: answer_id
 *            required: true
 *            schema:
 *                type: string
 *          - in: body
 *            name: "req"
 *            required: true
 *            schema:
 *                type: string
 *                description: answers
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 답변 수정 성공
 *      delete:
 *          tags: [answers]
 *          summary: 답변 삭제
 *          description: 답변 삭제
 *          parameters:
 *          - in: path
 *            name: "id"
 *            description: answer_id
 *            required: true
 *            schema:
 *                type: string
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 답변 삭제 성공
 */
