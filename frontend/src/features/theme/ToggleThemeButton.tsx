import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  function handleClick(): void {
    setTheme((prev) => (prev !== "dark" ? "dark" : "light"));
  }

  return (
    <Button
      className="rounded-full"
      onClick={handleClick}
      size="icon"
      variant="ghost"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

export { ToggleThemeButton };
