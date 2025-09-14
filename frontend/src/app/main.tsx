import { CreateSessionPage } from "@/components/CreateSessionPage";
import { Home } from "@/components/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChatPage } from "../components/ChatPage";
import "./globals.css";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSessionPage />} />
        <Route path="/chat/:sessionUUID" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
