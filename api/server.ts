import { Request, Response, NextFunction } from "express";

const express = require("express");
const cors = require("cors");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/expressError");
const { PrismaClient } = require("./generated/prisma");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
require("dotenv").config();

// CORS config (allow frontend at localhost:3000)
app.use(
  cors({
    origin: process.env.ENV == "development" ? "*" : process.env.CLIENT,
  })
);

// Submit Route
app.post(
  "/submit",
  wrapAsync(async (req: Request, res: Response) => {
    await prisma.data.create({
      data: req.body,
    });

    return res.status(200).json({ msg: "Successful" });
  })
);

// Universal HAndler
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new ExpressError(404, "Route not found"));
});

// Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err);
    const log_err = new ExpressError(
      err.status ? err.status : 500,
      err.display || "Internal Server Error"
    );

    return res.status(log_err.status).json({
      msg: log_err.display,
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
