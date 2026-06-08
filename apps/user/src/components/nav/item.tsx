import type { LucideIcon } from "lucide-react";

import { type ToOptions, MatchRoute, Link } from "@tanstack/react-router";

import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: ToOptions["to"];
  label: string;
  icon: LucideIcon;
}) {
  return (
    <MatchRoute fuzzy={true} key={to} to={to}>
      {(match) => (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                render={
                  <Link to={to}>
                    {match && (
                      <span className="absolute top-1/2 -left-2.25 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-foreground" />
                    )}
                    <Icon />
                  </Link>
                }
                className={cn("relative", match && "bg-muted text-foreground")}
                nativeButton={false}
                variant="ghost"
                size="icon-sm"
              />
            }
          />
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      )}
    </MatchRoute>
  );
}
