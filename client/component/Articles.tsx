import { useEffect, useState } from "react";

type Article = {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  date?: string;
};

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then((res) => res.json())
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  return (
    <section>
      <h2 style={{ fontSize: 24 }}>Artikel & Insight</h2>
      <div className="grid grid-3" style={{ marginTop: 12 }}>
        {articles.map((a) => (
          <article className="card" key={a.id}>
            <h3 style={{ margin: 0 }}>{a.title}</h3>
            {a.excerpt && <p style={{ color: "var(--muted)" }}>{a.excerpt}</p>}
            <p style={{ marginTop: 8 }}>
              {a.content.slice(0, 180)}
              {a.content.length > 180 ? "..." : ""}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <small style={{ color: "var(--muted)" }}>
                {a.author ?? "Fellas Team"} • {a.date ?? ""}
              </small>
              <a
                href={`/articles/${a.id}`}
                style={{
                  textDecoration: "none",
                  color: "var(--pink)",
                  fontWeight: 600,
                }}
              >
                Baca
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
