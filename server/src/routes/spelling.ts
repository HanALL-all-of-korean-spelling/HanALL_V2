import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const esClient = require("../connection.ts");
const index: String = "words";

let flag: Boolean = false;

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.search({
        index: index,
        body: {
          _source: ["title"],
          query: {
            match: {
              type: "spelling",
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
  .route("/search")
  // swagger에서 돌아가게 하려고 post로 작성(이후 get으로 수정하기)
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.search({
        index: index,
        body: {
          query: {
            _source: ["title"],
            match: {
              wrong_words: req.body.text,
            },
          },
        },
      });
      if (Object.keys(result.body.hits.hits).length != 0) {
        flag = false;
        return res
          .status(200)
          .json({ result: result.body.hits.hits, flag: flag });
      } else {
        const result = await esClient.search({
          index: index,
          body: {
            query: {
              match: {
                right_words: req.body.text,
              },
            },
          },
        });
        flag = true;
        return res
          .status(200)
          .json({ result: result.body.hits.hits, flag: flag });
      }
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
            match: {
              _id: req.params.id,
            },
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
 *  /api/spellings:
 *      get:
 *          tags: [spelling]
 *          summary: 철자 정보 조회
 *          description: 철자 정보 전체 조회
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 철자 정보 조회 성공
 *  /api/spellings/{id}:
 *      get:
 *          tags: [spelling]
 *          summary: 철자 정보 세부 조회
 *          description: 철자 정보 세부 조회
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
 *  /api/spellings/search:
 *      post:
 *          tags: [spelling]
 *          summary: 철자 검색 결과 조회
 *          description: 철자 검색 결과 조회
 *          parameters:
 *          - in: body
 *            name: "text"
 *            required: true
 *            schema:
 *                type: string
 *                description: 검색 내용
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 철자 검색 결과 조회 성공
 */
