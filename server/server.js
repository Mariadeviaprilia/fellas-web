import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// simple health route
app.get("/", (_req, res) =>
  res.json({ ok: true, message: "Fellas API running" })
);

// routes
app.use("/api/articles", articleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

// 404
app.use((_req, res) => res.status(404).json({ message: "Not found" }));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
