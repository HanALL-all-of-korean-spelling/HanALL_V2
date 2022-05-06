import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const esClient = require("../connection.ts");

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.search({
        index: "words",
        body: {
          query: {
            match_all: {},
          },
        },
      });
      res.json(result.body.hits.hits[0]._source);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router
  .route("/search")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await esClient.search({
        index: "words",
        body: {
          query: {
            match: {
              wrong_words: "베개 배게",
            },
          },
        },
      });
      res.json(result.body.hits.hits[0]._source);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
