import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <section>
      <div
        className="card"
        style={{ padding: 20, maxWidth: 640, margin: "0 auto" }}
      >
        <LoginForm />
      </div>
    </section>
  );
}
