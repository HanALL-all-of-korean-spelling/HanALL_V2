import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const esClient = require("../models/connection.ts");
import passport from "passport";
const index: String = "words";

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    let { sort } = req.query;
    if (sort) {
      try {
        const result = await esClient.search({
          index: index,
          sort: [`${sort}:desc`],
          body: {
            _source: ["title", "hits", "scraps", "created_at"],
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
    } else {
      try {
        const sort_hits_result = await esClient.search({
          index: index,
          body: {
            _source: ["title", "hits"],
            sort: { hits: "desc" },
            size: "3",
            query: {
              match: {
                type: "spacing",
              },
            },
          },
        });
        const sort_crt_result = await esClient.search({
          index: index,
          body: {
            _source: ["title", "hits"],
            sort: { created_at: "desc" },
            size: "3",
            query: {
              match: {
                type: "spacing",
              },
            },
          },
        });
        const hits: Array<JSON> = sort_hits_result.body.hits.hits;
        const crt: Array<JSON> = sort_crt_result.body.hits.hits;

        res.status(200).json({ hits_order: hits, created_at_order: crt });
      } catch (err) {
        console.error(err);
        next(err);
      }
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
      let related = await esClient.search({
        index: index,
        body: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: result.body.hits.hits[0]._source.right_words,
                    fields: ["right_words", "wrong_words"],
                  },
                },
              ],
              must_not: [
                {
                  match: {
                    _id: result.body.hits.hits[0]._id,
                  },
                },
              ],
            },
          },
        },
      });
      if (related.body.hits.total.value == 0) {
        related = { id: "", title: "" };
      } else {
        related = {
          id: related.body.hits.hits[0]._id,
          title: related.body.hits.hits[0]._source.title,
        };
      }
      let hits = result.body.hits.hits[0]._source.hits;
      hits++;
      const count_hits = await esClient.update({
        index: index,
        id: req.params.id,
        body: {
          doc: {
            hits: hits,
            related: related,
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
        const user_result = await esClient.search({
          index: "users",
          body: {
            query: {
              bool: {
                must: [{ match: { _id: req.user?._id } }],
              },
            },
          },
        });

        let new_scraps: Array<string> = [];

        // 기존에 스크랩 했던 게 있으면 추가
        if (user_result.body.hits.hits[0]._source.scraps.spacing) {
          new_scraps = user_result.body.hits.hits[0]._source.scraps.spacing;
          if (
            // 이미 스크랩한 글이면
            new_scraps.includes(req.params.id)
          ) {
            res.status(400).send("이미 스크랩한 글입니다.");
          } else {
            new_scraps.push(req.params.id);
          }
        } else {
          // 첫 스크랩이면
          new_scraps = [req.params.id];
        }
        const user_scrap = esClient.update({
          index: "users",
          id: req.user?._id,
          body: {
            doc: {
              scraps: { spacing: new_scraps },
            },
          },
        });

        // 스크랩 수 설정
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
        let scraps = result.body.hits.hits[0]._source.scraps;
        scraps++;
        const count_hits = await esClient.update({
          index: index,
          id: req.params.id,
          body: {
            doc: {
              scraps: scraps,
            },
          },
        });
        res.status(200).json(result.body.hits.hits[0]._source);
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
 *  /api/spacings:
 *      get:
 *          tags: [spacing]
 *          summary: 띄어쓰기 정보 조회
 *          description: 띄어쓰기 정보 조회
 *          parameters:
 *          - in: query
 *            name: "sort"
 *            description: 정렬 방식을 입력하세요.(created_at / hits / scraps)
 *            required: false
 *            schema:
 *                type: string
 *                description: sort
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
 *            description: 게시글의 고유 아이디 값을 입력하세요.
 *            required: true
 *            schema:
 *                type: string
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 띄어쓰기 정보 세부 조회 성공
 *      put:
 *          tags: [spacing]
 *          summary: 띄어쓰기 정보 스크랩
 *          description: 띄어쓰기 정보 스크랩
 *          parameters:
 *          - in: path
 *            name: "id"
 *            description: 게시글의 고유 아이디 값을 입력하세요.
 *            required: true
 *            schema:
 *                type: string
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 띄어쓰기 정보 스크랩 성공
 */
