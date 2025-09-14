import { DARK_MODE_LOCAL_STORAGE_KEY } from "@/features/theme";
import { Chat, CreateSession, Home } from "@/pages";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

function App() {
  const isDarkMode = JSON.parse(
    localStorage.getItem(DARK_MODE_LOCAL_STORAGE_KEY) || "false",
  );

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, []);

  return (
    <>
      <Toaster
        theme={isDarkMode ? "dark" : "light"}
        position="top-right"
        richColors
        expand
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSession />} />
          <Route path="/chat/:sessionUUID" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export { App };
