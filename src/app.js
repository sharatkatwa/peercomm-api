import cookieParser from "cookie-parser";

import express from "express";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "server is in good condition" });
});


export default app;
