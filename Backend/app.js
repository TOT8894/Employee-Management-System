import express from "express";
import mongodb from "./config/mongodb.js";
import dotenv from "dotenv";
import employeesRoute from "./routes/employeesRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./errorHandler/errorHandler.js";
dotenv.config();
mongodb();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/employees", employeesRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/auth", authRoute);
app.use(errorHandler);

export default app;