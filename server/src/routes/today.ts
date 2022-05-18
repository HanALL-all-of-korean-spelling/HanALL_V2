import express, { Request, Response, NextFunction } from "express";
import { resourceLimits } from "worker_threads";
const router = express.Router();
const esClient = require("../connection.ts");
const index: String = "words";

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(Math.random());
      const result = await esClient.search({
        index: index,
        body: {
          size: 1,
          query: {
            function_score: {
              query: {
                match_all: {},
              },
              random_score: {},
            },
          },
        },
      });
      return res.status(200).json({ result: result.body.hits.hits });
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
 *          description: 오늘의 맞춤법 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 오늘의 맞춤법 조회 조회 성공
 */
