"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { SideNavigation } from "@/components/side-navigation"
import { NotificationDrawer } from "@/components/notification-drawer"
import { HomeDashboard } from "@/components/home-dashboard"
import { JobList } from "@/components/job-list"
import { JobDetailDialog } from "@/components/job-detail-dialog"
import { mockNotifications, mockJobs } from "@/lib/mock-data"
import type { Notification, Job } from "@/lib/types"

type NavItem = "home" | "joblist"

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState<NavItem>("home")
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobDetailOpen, setJobDetailOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job)
    setJobDetailOpen(true)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader
        unreadCount={unreadCount}
        onNotificationClick={() => setNotificationDrawerOpen(true)}
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <SideNavigation activeItem={activeNav} onNavigate={setActiveNav} />
        
        <main className="flex-1 overflow-auto">
          {activeNav === "home" && <HomeDashboard />}
          {activeNav === "joblist" && (
            <JobList jobs={mockJobs} onViewDetails={handleViewJobDetails} />
          )}
        </main>
      </div>

      <NotificationDrawer
        open={notificationDrawerOpen}
        onOpenChange={setNotificationDrawerOpen}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDismiss={handleDismiss}
      />

      <JobDetailDialog
        job={selectedJob}
        open={jobDetailOpen}
        onOpenChange={setJobDetailOpen}
      />
    </div>
  )
}
