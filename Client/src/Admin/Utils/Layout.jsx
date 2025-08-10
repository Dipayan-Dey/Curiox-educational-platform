import React, { useState } from 'react'
import SideBar from './SideBar'

function Layout({ children, user }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-full z-50">
        <SideBar user={user} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      
      {/* Main Content Area - with dynamic left margin based on sidebar state */}
      <div className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? 'ml-20' : 'ml-72'
      }`}>
        <div className="p-6 min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout