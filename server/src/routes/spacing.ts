import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const esClient = require("../connection.ts");
const index: String = "words";

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.search({
        index: index,
        body: {
          query: {
            match: {
              type: "spacing",
            },
          },
        },
      });
      res.status(200).json(result.body.hits.hits);
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
              must: [
                { match: { type: "spacing" } },
                { match: { _id: req.params.id } },
              ],
            },
          },
        },
      });
      let hits = result.body.hits.hits[0]._source.Hits;
      hits++;
      const count_hits = await esClient.update({
        index: index,
        id: req.params.id,
        body: {
          doc: {
            Hits: hits,
          },
        },
      });
      res.status(200).json(result.body.hits.hits[0]._source);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;

/**
 * @swagger
 * paths:
 *  /api/spacings:
 *      get:
 *          tags: [spacing]
 *          summary: 띄어쓰기 정보 조회
 *          description: 띄어쓰기 정보 전체 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 띄어쓰기 정보 조회 성공
 *  /api/spacings/{id}:
 *      get:
 *          tags: [spacing]
 *          summary: 띄어쓰기 정보 세부 조회
 *          description: 띄어쓰기 정보 세부 조회
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
 *                  description: 철자 정보 세부 조회 성공
 */
