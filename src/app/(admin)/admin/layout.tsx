import React from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminInactivityTracker } from '@/components/admin/AdminInactivityTracker'

export default function AdminPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#080d18]">
      <AdminInactivityTracker />
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}
