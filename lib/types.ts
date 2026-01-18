export type NotificationType = "error" | "warning" | "info"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export type JobStatus = "pending" | "running" | "completed" | "failed" | "cancelled"

export interface Job {
  id: string
  name: string
  status: JobStatus
  progress: number
  createdAt: Date
  updatedAt: Date
  owner: string
  priority: "low" | "medium" | "high"
  description: string
}

export type SortDirection = "asc" | "desc"

export interface SortConfig {
  key: keyof Job
  direction: SortDirection
}
