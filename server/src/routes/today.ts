import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const esClient = require("../models/connection.ts");
const index: String = "words";

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const today: Date = new Date();
      const seed: Number = today.getDate() + today.getMonth();
      console.log(seed);
      const result = await esClient.search({
        index: index,
        body: {
          size: 1,
          query: {
            function_score: {
              query: {
                match_all: {},
              },
              random_score: { seed: seed },
            },
          },
        },
      });
      return res.status(200).json(result.body.hits.hits[0]);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/todays:
 *      get:
 *          tags: [today]
 *          summary: 오늘의 맞춤법 조회
 *          description: execute를 누를 때마다 랜덤하게 데이터 전달
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 오늘의 맞춤법 조회 조회 성공
 */
