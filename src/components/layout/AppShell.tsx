import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main className="min-w-0 flex-1 pt-8 pr-9 pb-14 pl-8">
        <Outlet />
      </main>
    </div>
  )
}
