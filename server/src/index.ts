import express, { Request, Response, NextFunction } from "express";
const indexRouter = require("./routes");
const esClient = require("./connection.ts");
const conCheck = require("./conCheck");

import * as crt from "./createIndex";
import * as del from "./deleteIndex";
import * as ins from "./insertData";
const { swaggerUi, specs } = require("../swagger");

const app: express.Application = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

conCheck;

//del.deleteWordsIndex();
//del.deleteBoardIndex();
//del.deleteUsersIndex();

//crt.createWordsIndex();
//crt.createBoardIndex();
//crt.createUsersIndex();

//ins.insertData();

app.use("/api", indexRouter);

app.listen(8080, () => {
  console.log("포트 연결 성공");
});

module.exports = app;
