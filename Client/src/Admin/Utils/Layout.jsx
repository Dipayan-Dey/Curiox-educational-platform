import React from 'react'
import SideBar from './SideBar'

function Layout({ children, user }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      <SideBar user={user} />
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}

export default Layout
