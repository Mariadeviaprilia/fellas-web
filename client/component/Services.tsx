import { useEffect, useState } from "react";

type Service = {
  id: number;
  name: string;
  provider: string;
  desc: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  return (
    <section>
      <h2 style={{ fontSize: 24 }}>Layanan Kami</h2>
      <div className="grid grid-3" style={{ marginTop: 12 }}>
        {services.map((s) => (
          <div className="card" key={s.id}>
            <h3 style={{ margin: 0 }}>{s.name}</h3>
            <small style={{ color: "var(--muted)" }}>{s.provider}</small>
            <p style={{ marginTop: 8 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
