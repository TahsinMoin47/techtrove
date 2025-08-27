import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import listingsRouter from "./routes/listings.js";

dotenv.config();
const app = express();

/** enable CORS for your Vite dev server */
app.use(cors({ origin: "http://localhost:5174", credentials: true }));

/** MUST be before routes to parse JSON bodies */
app.use(express.json());

/** mount routers at /api */
app.use("/api", authRouter);
app.use("/api", listingsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));

app.get("/api/test", (req, res) => {
    res.json({ message: "Frontend and Backend Connected!" });
  });
  