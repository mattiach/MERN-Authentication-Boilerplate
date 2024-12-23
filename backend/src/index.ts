import express, { Application } from "express";
import cors from "cors";
import connectToDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.router.js";

config();

const PORT: number = Number(process.env.PORT) || 8000;
const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

connectToDB();

app.listen(PORT, () =>
  console.log(`🖥️ Server running on port ${PORT} 😀✨👌`)
);

/*
    ========== ROUTES ==========
  - **http://localhost:8000** - BASE_URL
  - **POST /api/users** - Register a user
  - **POST /api/users/auth** - Authenticate a user and get token
  - **POST /api/users/logout** - Logout user and clear cookie
  - **GET  /api/users/profile** - Get user profile
  - **PUT  /api/users/profile** - Update profile
    =============================
*/
