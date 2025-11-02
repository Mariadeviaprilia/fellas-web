export default function Home() {
  return (
    <section>
      <div className="card" style={{ padding: 24 }}>
        <h1 style={{ fontSize: 28 }}>Fellas — Teman Sejati Perjalanan Ibu</h1>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Layanan kesehatan dan dukungan konsultasi (dokter, psikolog, konsultan
          laktasi, ahli gizi) yang peduli dan memahami kebutuhan ibu.
        </p>
      </div>

      <div style={{ marginTop: 18 }}>
        <h2 style={{ marginBottom: 8 }}>Highlight Layanan</h2>
        <p style={{ color: "var(--muted)" }}>
          Konsultasi personal, dukungan mental, dan panduan nutrisi.
        </p>
      </div>
    </section>
  );
}
