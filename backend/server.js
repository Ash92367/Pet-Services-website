import express from "express";
import cors from "cors";
import connectdb from "./config/db.js";
import petRouter from "./routes/petroute.js";
import userRouter from "./routes/userroute.js";
import adoptRouter from "./routes/adoptroute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB Connection
connectdb();

// API Endpoints
app.use("/api/pet", petRouter);
app.use("/api/user", userRouter);
app.use("/uploads", express.static("uploads"));
 // Serve static files
app.use("/api/form", adoptRouter);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
