"use client"

import { Home, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NavItem = "home" | "joblist"

interface SideNavigationProps {
  activeItem: NavItem
  onNavigate: (item: NavItem) => void
}

const navItems = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "joblist" as const, label: "Job List", icon: List },
]

export function SideNavigation({ activeItem, onNavigate }: SideNavigationProps) {
  return (
    <nav className="flex w-56 flex-col border-r bg-muted/30 p-4">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-3",
              activeItem === item.id && "bg-secondary"
            )}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  )
}
