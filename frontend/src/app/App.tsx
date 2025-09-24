import { Toaster } from "@/components/ui/sonner";
import { Chat, CreateSession, Home } from "@/pages";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <Toaster position="top-right" richColors />
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
