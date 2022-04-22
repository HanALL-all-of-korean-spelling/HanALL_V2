import express, { Request, Response, NextFunction } from "express";
const { Client } = require("@elastic/elasticsearch");
const { connectionCheck } = require("./connection.ts");

const app: express.Application = express();

app.use(express.json());

//connectionCheck;

const esHost = process.env.ES_HOST || "localhost";
const esUrl = "http://" + esHost + ":9200";
//console.log("esUrl:", esUrl);
const client = new Client({ node: esUrl });

// const client = new Client({
//   node: "http://es01:9200",
// });

const run = async () => {
  let isConnected = false;
  //while (!isConnected) {
  try {
    //console.log("Connecting to Elasticsearch");
    const info = await client.info();
    console.log("Elasticsearch Connection Success");
    // console.log("info=", info);
    isConnected = true;
  } catch (err) {
    console.log("Connection failed", err);
  }
  //}
};

run();

app.get("/api/test", (req: Request, res: Response) => {
  try {
    console.log("api/test 성공");
    res.json({
      id: 1,
      test: "success1",
    });
  } catch (err) {
    console.error(err);
    //next(err);
  }
});

app.get("/api", (req: Request, res: Response) => {
  try {
    console.log("api 성공");
    res.json({
      id: 2,
      test: "success2",
    });
  } catch (err) {
    console.error(err);
    //next(err);
  }
});

app.get("/api/search", async (req: Request, res: Response) => {
  try {
    const result = await client.search({
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
    console.log("/api/search 성공");
  } catch (err) {
    console.error(err);
    //next(err);
  }
});

app.listen(8080, () => {
  console.log("포트 연결 성공");
});

// function adder(num1: number, num2: number): string {
//   return `결과는: ${num1 + num2} 입니다.`;
// }

// console.log(adder(20, 10));
