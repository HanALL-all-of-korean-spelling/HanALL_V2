import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const esClient = require("../models/connection.ts");
import passport from "passport";
const index: String = "words";

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    let { text, sort, page } = req.query;
    let flag: Boolean = false;

    let from: number = 0;
    if (typeof page == "string") {
      from = (parseInt(page) - 1) * 10;
    }

    if (text && !sort) {
      // 철자 정보 검색
      try {
        const result = await esClient.search({
          index: index,
          body: {
            query: {
              bool: {
                must: [
                  {
                    multi_match: {
                      query: text,
                      fields: ["right_words", "wrong_words"],
                    },
                  },
                  { match: { type: "spelling" } },
                ],
              },
            },
          },
        });
        const flag_check = await esClient.search({
          index: index,
          body: {
            query: {
              bool: {
                must: [
                  {
                    match_phrase: {
                      right_words: text,
                    },
                  },
                  { match: { type: "spelling" } },
                ],
              },
            },
          },
        });
        if (flag_check.body.hits.total.value > 0) {
          flag = true;
        }
        const detail: JSON = result.body.hits.hits[0];
        const similar: Array<JSON> = result.body.hits.hits.slice(1);
        return res.status(200).json({ detail: detail, similar, flag: flag });
      } catch (err) {
        console.error(err);
        next(err);
      }
    } else if (sort && !text) {
      // 철자 게시판 조회
      try {
        const result = await esClient.search({
          index: index,
          sort: [`${sort}:desc`],
          body: {
            _source: ["title", "hits", "scraps", "created_at"],
            size: "10",
            from: from,
            query: {
              match: {
                type: "spelling",
              },
            },
          },
        });
        // 전체 페이지 개수
        const count = await esClient.count({
          index: index,
          body: {
            query: {
              match: {
                type: "spelling",
              },
            },
          },
        });

        const page_count: number = Math.ceil(count.body.count / 10);
        const result_data: Array<JSON> = result.body.hits.hits;
        const current_page: number = from / 10 + 1;
        res.status(200).json({
          total_page: page_count,
          current_page: current_page,
          result: result_data,
        });
      } catch (err) {
        console.error(err);
        next(err);
      }
    } else if (!text && !sort) {
      // 메인 페이지 요청
      try {
        const sort_hits_result = await esClient.search({
          index: index,
          body: {
            _source: ["title", "hits", "created_at"],
            sort: { hits: "desc" },
            size: "3",
            query: {
              match: {
                type: "spelling",
              },
            },
          },
        });
        const sort_crt_result = await esClient.search({
          index: index,
          body: {
            _source: ["title", "hits", "created_at"],
            sort: { created_at: "desc" },
            size: "3",
            query: {
              match: {
                type: "spelling",
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
    } else {
      res.status(400).send("error");
    }
  })
  // 철자 정보글 등록
  .post(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      //console.log(req.user);
      if (req.user?._source.email != "matji1349@gmail.com") {
        res.status(400).send("잘못된 접근입니다.");
      }
      try {
        const result = await esClient.index({
          index: index,
          body: {
            type: "spelling",
            title: req.body.title,
            right_words: req.body.right_words,
            wrong_words: req.body.wrong_words,
            helpful_info: req.body.helpful_info,
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
  // 철자 정보글 세부 조회
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
      const word = result.body.hits.hits[0]._source?.right_words;
      let related = await esClient.search({
        index: index,
        body: {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: word,
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
  // 철자 정보글 수정
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
              title: req.body.title,
              right_words: req.body.right_words,
              wrong_words: req.body.wrong_words,
              helpful_info: req.body.helpful_info,
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
  // 철자 정보글 삭제
  .delete(
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.user?._source.email != "matji1349@gmail.com") {
        res.status(400).send("잘못된 접근입니다.");
      }
      try {
        const result = await esClient.delete({
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

router
  .route("/:id/scraps")
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
        console.log(user_result.body.hits.hits[0]);
        // 기존에 스크랩 했던 게 있으면 추가
        if (user_result.body.hits.hits[0]._source.scraps?.spelling) {
          new_scraps = user_result.body.hits.hits[0]._source.scraps.spelling;
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
              scraps: { spelling: new_scraps },
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
                  { match: { type: "spelling" } },
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
 *  /api/spellings:
 *      get:
 *          tags: [spelling]
 *          summary: 철자 정보 조회 및 검색
 *          description: 검색 값, 정렬 방식 입력 X -> 최신순 3개, 조회수순 3개의 데이터 전달 <br> 검색 값과 정렬 방식은 하나씩만 입력 가능
 *          parameters:
 *          - in: query
 *            name: "text"
 *            description: 검색 내용을 입력하세요.
 *            required: false
 *            schema:
 *                type: string
 *                description: 검색 내용
 *          - in: query
 *            name: "sort"
 *            description: 정렬 방식을 입력하세요.(created_at / hits / scraps)
 *            required: false
 *            schema:
 *                type: string
 *                description: 정렬 방식
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
 *                  description: 철자 정보 조회 성공
 *      post:
 *          tags: [spelling]
 *          summary: 철자 정보 등록
 *          description: 철자 정보 등록
 *          parameters:
 *          - in: body
 *            name: "req"
 *            description: title, right_words, wrong_words, helpful_info 를 작성하세요.
 *            required: true
 *            schema:
 *                type: string
 *                description: title, right_words, wrong_words, helpful_info
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 철자 정보 등록 성공
 *  /api/spellings/{id}:
 *      get:
 *          tags: [spelling]
 *          summary: 철자 정보 세부 조회
 *          description: 철자 정보 세부 조회
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
 *                  description: 철자 정보 세부 조회 성공
 *      put:
 *          tags: [spelling]
 *          summary: 철자 정보글 수정
 *          description: 철자 정보글 수정
 *          parameters:
 *          - in: path
 *            name: "id"
 *            description: 게시글의 고유 아이디 값을 입력하세요.
 *            required: true
 *            schema:
 *                type: string
 *          - in: body
 *            name: "req"
 *            description: title, right_words, wrong_words, helpful_info 를 작성하세요.
 *            required: true
 *            schema:
 *                type: string
 *                description: title, right_words, wrong_words, helpful_info
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: 철자 정보글 수정 성공
 *      delete:
 *          tags: [spelling]
 *          summary: 철자 정보글 삭제
 *          description: 철자 정보글 삭제
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
 *                  description: 철자 정보글 삭제 성공
 *  /api/spellings/{id}/scraps:
 *      put:
 *          tags: [spelling]
 *          summary: 철자 정보 보관
 *          description: 철자 정보 보관
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
 *                  description: 철자 정보 보관 성공
 */
