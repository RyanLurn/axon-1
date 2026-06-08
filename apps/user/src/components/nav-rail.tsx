import { MessageCircle, Database, Shield, Moon, Sun } from "lucide-react";
import { useMatchRoute, Link } from "@tanstack/react-router";

import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { Route as StorageRoute } from "@/routes/_authenticated/storage";
import { Route as AccessRoute } from "@/routes/_authenticated/access";
import { Route as ChatRoute } from "@/routes/_authenticated/chat";
import { useTheme } from "@/components/providers/theme";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: ChatRoute.to, label: "Chat", icon: MessageCircle },
  { to: StorageRoute.to, label: "Storage", icon: Database },
  { to: AccessRoute.to, label: "Access", icon: Shield },
] as const;

export function NavRail() {
  const matchRoute = useMatchRoute();
  const { theme, setTheme } = useTheme();

  function cycleTheme() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  const ThemeIcon = theme === "dark" ? Moon : Sun;

  return (
    <nav className="flex h-full w-13 flex-col items-center gap-1 border-r border-border bg-muted/40 py-3">
      {/* Logomark */}
      <div className="mb-1 flex size-7 items-center justify-center rounded-md bg-foreground text-background">
        <span className="text-xs font-bold tracking-tight">A</span>
      </div>

      <Separator className="my-1 w-6" />

      {/* Mode icons */}
      <div className="flex flex-col items-center gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive = !!matchRoute({ to, fuzzy: true });

          return (
            <Tooltip key={to}>
              <TooltipTrigger
                render={
                  <Button
                    render={
                      <Link to={to}>
                        {isActive && (
                          <span className="absolute top-1/2 -left-2.25 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-foreground" />
                        )}
                        <Icon />
                      </Link>
                    }
                    className={cn(
                      "relative",
                      isActive && "bg-muted text-foreground"
                    )}
                    variant="ghost"
                    size="icon-sm"
                  />
                }
              />
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button onClick={cycleTheme} variant="ghost" size="icon-sm">
              <ThemeIcon />
            </Button>
          }
        />
        <TooltipContent side="right">
          {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}
        </TooltipContent>
      </Tooltip>
    </nav>
  );
}
