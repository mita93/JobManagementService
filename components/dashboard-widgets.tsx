"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Activity, CheckCircle, Clock, TrendingUp } from "lucide-react"

type WidgetSize = "1x1" | "1x2" | "2x1" | "2x2"

interface WidgetProps {
  size: WidgetSize
  className?: string
}

const sizeClasses: Record<WidgetSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x1": "col-span-2 row-span-1",
  "2x2": "col-span-2 row-span-2",
}

export function StatsWidget({ size, className }: WidgetProps) {
  return (
    <Card className={cn(sizeClasses[size], "flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardDescription>Total Jobs</CardDescription>
        <CardTitle className="text-3xl font-bold">1,284</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500">+12%</span>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProgressWidget({ size, className }: WidgetProps) {
  return (
    <Card className={cn(sizeClasses[size], "flex flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>Job Progress</CardDescription>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">65%</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <Progress value={65} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          23 of 35 tasks completed
        </p>
      </CardContent>
    </Card>
  )
}

export function RecentActivityWidget({ size, className }: WidgetProps) {
  const activities = [
    { id: 1, action: "Job completed", job: "Data Export", time: "5m ago" },
    { id: 2, action: "Job started", job: "Image Processing", time: "15m ago" },
    { id: 3, action: "Job failed", job: "Report Generation", time: "1h ago" },
    { id: 4, action: "Job queued", job: "Database Backup", time: "2h ago" },
  ]

  return (
    <Card className={cn(sizeClasses[size], "flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="flex flex-col gap-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.action}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.job} - {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatusOverviewWidget({ size, className }: WidgetProps) {
  const statuses = [
    { label: "Completed", count: 156, icon: CheckCircle, color: "text-green-500" },
    { label: "Running", count: 23, icon: Activity, color: "text-blue-500" },
    { label: "Pending", count: 45, icon: Clock, color: "text-amber-500" },
  ]

  return (
    <Card className={cn(sizeClasses[size], "flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-1 gap-4 h-full">
          {statuses.map((status) => (
            <div
              key={status.label}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <status.icon className={cn("h-5 w-5", status.color)} />
                <span className="text-sm font-medium">{status.label}</span>
              </div>
              <span className="text-lg font-bold">{status.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function QuickActionsWidget({ size, className }: WidgetProps) {
  return (
    <Card className={cn(sizeClasses[size], "flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">System Health</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">CPU Usage</span>
          <span className="text-sm font-medium">42%</span>
        </div>
        <Progress value={42} className="h-2" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Memory</span>
          <span className="text-sm font-medium">68%</span>
        </div>
        <Progress value={68} className="h-2" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Storage</span>
          <span className="text-sm font-medium">85%</span>
        </div>
        <Progress value={85} className="h-2" />
      </CardContent>
    </Card>
  )
}
