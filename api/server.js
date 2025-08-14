const express = require("express");
const cors = require("cors");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/expressError");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Parse JSON requests
app.use(express.json());

// CORS config (allow frontend at localhost:3000)
app.use(
  cors({
    origin: process.env.ENV == "development" ? "*" : process.env.CLIENT,
  })
);

// Submit Route
app.post(
  "/submit",
  wrapAsync(async (req, res) => {
    await prisma.data.create({
      data: req.body,
    });

    return res.status(200).json({ msg: "Successful" });
  })
);

// Universal Handler for unknown routes
app.use((req, res, next) => {
  return next(new ExpressError(404, "Route not found"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    const log_err = new ExpressError(
      err.status || 500,
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
