import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: "24px auto", padding: "0 16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/articles" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
