import { CreateSessionPage } from "@/components/CreateSessionPage";
import { Home } from "@/components/Home";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChatSessionPage } from "../components/ChatSessionPage";
import "./globals.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateSessionPage />} />
      <Route path="/chat/:sessionId" element={<ChatSessionPage />} />
    </Routes>
  </BrowserRouter>,
);
