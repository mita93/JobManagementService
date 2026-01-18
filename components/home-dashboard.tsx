"use client"

import {
  StatsWidget,
  ProgressWidget,
  RecentActivityWidget,
  StatusOverviewWidget,
  QuickActionsWidget,
} from "@/components/dashboard-widgets"

export function HomeDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-3 auto-rows-[180px] gap-4">
        {/* Row 1: 1x1, 1x1, 2x2 starts */}
        <StatsWidget size="1x1" />
        <ProgressWidget size="1x1" />
        <StatusOverviewWidget size="2x2" />
        
        {/* Row 2: 2x1, 2x2 continues */}
        <RecentActivityWidget size="2x1" />
        
        {/* Row 3: 1x1, 1x1 */}
        <QuickActionsWidget size="1x2" />
        <StatsWidget size="1x1" />
        <ProgressWidget size="1x1" />
      </div>
    </div>
  )
}
