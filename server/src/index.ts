import express, { Request, Response, NextFunction } from "express";
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes");
const esClient = require("./connection.ts");
const conCheck = require("./conCheck");
import passport from "passport";
import { passportLocal } from "./passport";
import * as crt from "./createIndex";
import * as del from "./deleteIndex";
import * as ins from "./insertData";
const { swaggerUi, specs } = require("../swagger");

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(passport.initialize());
passportLocal();

conCheck;

const reload_word_index = () => {
  del.deleteWordsIndex();
  crt.createWordsIndex();
};

const reload_board_index = () => {
  del.deleteBoardIndex();
  crt.createBoardIndex();
};

const reload_user_index = () => {
  del.deleteUsersIndex();
  crt.createUsersIndex();
};

//reload_word_index();

//reload_board_index();

//reload_user_index();

//ins.insertData();

app.use("/api", indexRouter);

app.listen(8080, () => {
  console.log("포트 연결 성공");
});

module.exports = app;
