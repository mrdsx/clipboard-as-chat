import { ChatPage } from "@/components/ChatPage";
import { CreateSessionPage } from "@/components/CreateSessionPage";
import { Home } from "@/components/Home";
import { DARK_MODE_LOCAL_STORAGE_KEY } from "@/features/theme";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  useEffect(() => {
    const isDarkMode = JSON.parse(
      localStorage.getItem(DARK_MODE_LOCAL_STORAGE_KEY) || "false",
    );
    document.body.classList.toggle("dark", isDarkMode);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSessionPage />} />
        <Route path="/chat/:sessionUUID" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
