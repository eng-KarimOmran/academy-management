import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import env from "./config/env";
import { notFoundRouter } from "./shared/middlewares/notfound.middleware";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./shared/middlewares/errors.middleware";
import router from "./index.routes";
import compression from "compression"

const app: Application = express();


app.use(compression({ level: 6, threshold: 1024 }));
app.use(cors({ origin: env.app.frontend, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Server is running correctly! 🚀");
});
app.use("/api/v1", router);
router.use(notFoundRouter);
app.use(globalErrorHandler);

export default app;