import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/admin",adminRoutes);
app.use(errorHandler)
export default app;