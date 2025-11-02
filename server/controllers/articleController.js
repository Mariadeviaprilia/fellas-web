import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve("server", "data", "articles.json");

export const getAllArticles = (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const articles = JSON.parse(raw);
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read articles" });
  }
};

export const getArticleById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    const article = articles.find((a) => a.id === id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read article" });
  }
};
