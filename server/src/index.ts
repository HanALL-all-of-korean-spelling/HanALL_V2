import express, { Request, Response, NextFunction } from "express";
const indexRouter = require("./routes");
const esClient = require("./connection.ts");
const conCheck = require("./conCheck");
const createIndex = require("./createIndex");
const deleteIndex = require("./deleteIndex");
const setMapping = require("./setMapping");
const insertData = require("./insertData");

const app: express.Application = express();

app.use(express.json());

conCheck;

//insertData;

// app.get("/api", (req: Request, res: Response) => {
//   try {
//     res.json({
//       id: 1,
//       test: "success!",
//     });
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.get("/api/test", (req: Request, res: Response) => {
//   try {
//     res.json({
//       id: 2,
//       test: "success2!",
//     });
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.get("/api/search", async (req: Request, res: Response) => {
//   try {
//     const result = await esClient.search({
//       index: "words",
//       body: {
//         query: {
//           match: {
//             wrong_words: "베개 배게",
//           },
//         },
//       },
//     });
//     res.json(result.body.hits.hits[0]._source);
//   } catch (err) {
//     console.error(err);
//   }
// });

app.use("/api", indexRouter);

app.listen(8080, () => {
  console.log("포트 연결 성공");
});
