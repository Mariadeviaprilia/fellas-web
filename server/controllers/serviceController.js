import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve("server", "data", "services.json");

export const getAllServices = (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const services = JSON.parse(raw);
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read services" });
  }
};
