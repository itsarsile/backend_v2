require("dotenv").config();
import express, { NextFunction, Request, Response, response } from "express";
import config from "config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import validateEnv from "./utils/validateEnv";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";
import productRouter from "./routes/product.routes";
import AppError from "./utils/appError";
import helmet from 'helmet';
validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
  app.use(express.json({ limit: "10kb" }));

  app.use(cookieParser());
  app.use(helmet({
    xXssProtection: true
  }))
  app.use(
    cors({
      origin: [config.get<string>("origin")],
      credentials: true,
    }),
  );

  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  //* ROUTES
  app.use("/api/auth", authRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);

  app.use("/img", express.static('src/uploads'))

  // API TEST
  app.get("/api/status", (_, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "API is Healthy!",
    });
  });

  // UNHANDLED ROUTES
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  const port = config.get<number>("port") || 3000
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
