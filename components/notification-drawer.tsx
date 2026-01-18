"use client"

import React from "react"

import { AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Notification, NotificationType } from "@/lib/types"

interface NotificationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

const iconMap: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap: Record<NotificationType, string> = {
  error: "text-destructive",
  warning: "text-amber-500",
  info: "text-blue-500",
}

const bgMap: Record<NotificationType, string> = {
  error: "border-l-destructive",
  warning: "border-l-amber-500",
  info: "border-l-blue-500",
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function NotificationDrawer({
  open,
  onOpenChange,
  notifications,
  onMarkAsRead,
  onDismiss,
}: NotificationDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4 pr-4">
          <div className="flex flex-col gap-3">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => {
                const Icon = iconMap[notification.type]
                return (
                  <Card
                    key={notification.id}
                    className={cn(
                      "border-l-4 cursor-pointer transition-colors",
                      bgMap[notification.type],
                      !notification.read && "bg-muted/50"
                    )}
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <CardHeader className="pb-2 pr-10 relative">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-4 w-4", colorMap[notification.type])} />
                        <CardTitle className="text-sm font-medium">
                          {notification.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDismiss(notification.id)
                        }}
                        aria-label="Dismiss notification"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm">
                        {notification.message}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatTimeAgo(notification.timestamp)}
                      </p>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
