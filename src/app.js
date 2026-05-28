import cookieParser from "cookie-parser";

import express from "express";

const app = express();

app.use(express.json());
app.use(cookieParser());

// root api
app.get("/", (req, res) => {
  return res.status(200).json({ message: "perrComm is running..." });
});

// all main Routes
// app.use("/api/")

// if sombody hit the route which the server doesn't has then this response will be sent
app.use((req, res) => {
  return res.status(404).json({ success: false, message: "Route not Found!" });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error (from: GEH)",
  });
});
export default app;
