import { MonitorCog, Moon, Sun } from "lucide-react";

import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { useTheme } from "@/components/providers/theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function cycleTheme() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  const ThemeIcon =
    theme === "dark" ? Moon : theme === "light" ? Sun : MonitorCog;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={`Theme: ${theme}. Activate to cycle theme`}
            onClick={cycleTheme}
            variant="ghost"
            size="icon-sm"
          >
            <ThemeIcon />
          </Button>
        }
      />
      <TooltipContent side="right">
        {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}
      </TooltipContent>
    </Tooltip>
  );
}
