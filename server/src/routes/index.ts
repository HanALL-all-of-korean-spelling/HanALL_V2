import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

const spellingRouter = require("./spelling");

/* 라우터 등록 */
router.use("/spellings", spellingRouter);

// router.get("/", async (req: Request, res: Response, next) => {
//   try {
//     res.json({ "This is": "Tave official homepage" });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
