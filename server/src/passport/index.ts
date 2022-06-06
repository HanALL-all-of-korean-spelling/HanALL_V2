import { Request } from "express";

const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const esClient = require("../models/connection.ts");
require("dotenv").config();
const index: String = "users";

declare global {
  namespace Express {
    interface User {
      _id: string;
      _source: source;
    }
  }
}

declare global {
  namespace Express {
    interface source {
      email: string;
      nickname: string;
      password: string;
      scraps: Array<string>;
      rank: string;
      point: number;
    }
  }
}

const passportConfig = { usernameField: "email", passwordField: "password" };

const passportVerify = async (email: String, password: String, done: any) => {
  try {
    const exUser = await esClient.search({
      index: index,
      body: {
        query: {
          match: {
            email: email,
          },
        },
      },
    });
    console.log("exuser", exUser.body.hits.hits[0]._source.password);
    if (exUser) {
      const result = await bcrypt.compare(
        password,
        exUser.body.hits.hits[0]._source.password
      );
      if (result) {
        return done(null, exUser, { message: "Logged In Successfully" });
      } else {
        done(null, false, { message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      done(null, false, { message: "가입되지 않은 회원입니다." });
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const cookieExtractor = (req: Request) => {
  const { token } = req.cookies;
  return token;
};

const JWTConfig = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async (jwtPayload: any, done: any) => {
  try {
    // payload의 id값으로 유저의 데이터 조회
    const user = await esClient.search({
      index: index,
      body: {
        query: {
          match: {
            _id: jwtPayload.id,
          },
        },
      },
    });
    // 유저 데이터가 있다면 유저 데이터 전송
    if (user) {
      done(null, user.body.hits.hits[0]);
      return;
    }
    // 유저 데이터가 없을 경우 에러 표시
    done(null, false, { reason: "올바르지 않은 인증정보 입니다." });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const passportLocal = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};

export { passportLocal };
