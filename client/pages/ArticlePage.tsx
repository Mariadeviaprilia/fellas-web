import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Article = {
  id: number;
  title: string;
  content: string;
  author?: string;
  date?: string;
  excerpt?: string;
};

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setArticle)
      .catch(() => setArticle(null));
  }, [id]);

  if (!article) return <div className="card">Artikel tidak ditemukan</div>;

  return (
    <article className="card">
      <h1>{article.title}</h1>
      <small style={{ color: "var(--muted)" }}>
        {article.author} • {article.date}
      </small>
      <p style={{ marginTop: 12 }}>{article.content}</p>
    </article>
  );
}
