"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, ChevronUp, Eye } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Job, JobStatus, SortConfig, SortDirection } from "@/lib/types"

interface JobListProps {
  jobs: Job[]
  onViewDetails: (job: Job) => void
}

const statusVariants: Record<JobStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  running: "default",
  completed: "outline",
  failed: "destructive",
  cancelled: "secondary",
}

const statusLabels: Record<JobStatus, string> = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
}

const priorityColors: Record<string, string> = {
  low: "bg-slate-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function JobList({ jobs, onViewDetails }: JobListProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const sortedJobs = [...jobs].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig
    let aValue = a[key]
    let bValue = b[key]

    if (aValue instanceof Date && bValue instanceof Date) {
      return direction === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime()
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const handleSort = (key: keyof Job) => {
    let direction: SortDirection = "asc"
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const SortIcon = ({ columnKey }: { columnKey: keyof Job }) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Job List</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => handleSort("id")}
                >
                  ID
                  <SortIcon columnKey="id" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <SortIcon columnKey="name" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <SortIcon columnKey="status" />
                </Button>
              </TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => handleSort("priority")}
                >
                  Priority
                  <SortIcon columnKey="priority" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => handleSort("owner")}
                >
                  Owner
                  <SortIcon columnKey="owner" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => handleSort("createdAt")}
                >
                  Created
                  <SortIcon columnKey="createdAt" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-mono text-sm">{job.id}</TableCell>
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[job.status]}>
                    {statusLabels[job.status]}
                  </Badge>
                </TableCell>
                <TableCell className="w-[120px]">
                  <div className="flex items-center gap-2">
                    <Progress value={job.progress} className="h-2 w-16" />
                    <span className="text-sm text-muted-foreground w-10">
                      {job.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        priorityColors[job.priority]
                      )}
                    />
                    <span className="capitalize text-sm">{job.priority}</span>
                  </div>
                </TableCell>
                <TableCell>{job.owner}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(job.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(job)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
