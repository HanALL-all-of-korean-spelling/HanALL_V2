import { Request, Response, NextFunction } from "express";

exports.isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated?.()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated?.()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
