import { MessageCircle, Database, Shield } from "lucide-react";

import { Route as StorageRoute } from "@/routes/_authenticated/storage";
import { Route as AccessRoute } from "@/routes/_authenticated/access";
import { Route as ChatRoute } from "@/routes/_authenticated/chat";
import { ThemeToggle } from "@/components/nav/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { NavItem } from "@/components/nav/item";

const NAV_ITEMS = [
  { to: ChatRoute.to, label: "Chat", icon: MessageCircle },
  { to: StorageRoute.to, label: "Storage", icon: Database },
  { to: AccessRoute.to, label: "Access", icon: Shield },
] as const;

export function NavRail() {
  return (
    <nav className="flex h-full w-13 flex-col items-center gap-1 border-r border-border bg-muted/40 py-3">
      {/* Logomark */}
      <div className="mb-1 flex size-7 items-center justify-center rounded-md bg-foreground text-background">
        <span className="text-xs font-bold tracking-tight">A</span>
      </div>

      <Separator className="my-1 w-6" />

      {/* Mode icons */}
      <div className="flex flex-col items-center gap-1">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavItem label={label} icon={icon} key={to} to={to} />
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <ThemeToggle />
    </nav>
  );
}
