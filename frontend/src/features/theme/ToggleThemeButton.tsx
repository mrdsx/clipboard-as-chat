import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { DARK_MODE_LOCAL_STORAGE_KEY } from "./constants";

function ToggleThemeButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem(DARK_MODE_LOCAL_STORAGE_KEY) || "false"),
  );

  useEffect(() => {
    localStorage.setItem(DARK_MODE_LOCAL_STORAGE_KEY, String(isDarkMode));
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  function handleClick(): void {
    setIsDarkMode((prev) => !prev);
  }

  return (
    <Button
      className="rounded-full"
      onClick={handleClick}
      size="icon"
      variant="ghost"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}

export { ToggleThemeButton };
