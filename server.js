import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./src/routers/auth.router.js";
import userRouter from "./src/routers/user.router.js";
import roomRouter from "./src/routers/room.router.js";
import bookingRouter from "./src/routers/booking.router.js";
import reviewRouter from "./src/routers/review.router.js";
import { swaggerDocs } from "./src/common/swagger.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

// API routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);

// 👉 /api → swagger
app.get("/api", (req, res) => {
  res.redirect("/api-docs");
});

swaggerDocs(app);

// Start
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}/api`);
});