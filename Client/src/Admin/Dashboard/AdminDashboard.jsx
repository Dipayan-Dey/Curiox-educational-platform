import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Utils/Layout'
import axios from 'axios'
import { Server } from '../../main'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function AdminDashboard({user}) {
  const [stats, setStats] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Demo data for charts
  const monthlyGrowth = [
    { name: 'Jan', courses: 5, users: 120, lectures: 45 },
    { name: 'Feb', courses: 8, users: 185, lectures: 68 },
    { name: 'Mar', courses: 12, users: 240, lectures: 89 },
    { name: 'Apr', courses: 15, users: 320, lectures: 110 },
    { name: 'May', courses: 18, users: 380, lectures: 135 },
    { name: 'Jun', courses: stats?.totalCourse || 22, users: stats?.totalUser || 450, lectures: stats?.totalLac || 160 }
  ]

  const recentActivities = [
    { action: 'New course created', details: 'React Advanced Concepts', time: '2 hours ago', icon: '📚', color: 'bg-blue-500' },
    { action: 'User registered', details: 'john.doe@email.com', time: '3 hours ago', icon: '👤', color: 'bg-green-500' },
    { action: 'Lecture uploaded', details: 'JavaScript Fundamentals - Chapter 5', time: '5 hours ago', icon: '🎥', color: 'bg-purple-500' },
    { action: 'Course published', details: 'Python for Beginners', time: '1 day ago', icon: '✅', color: 'bg-emerald-500' },
    { action: 'New enrollment', details: 'Web Development Bootcamp', time: '1 day ago', icon: '🎓', color: 'bg-orange-500' }
  ]

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${Server}/api/admin/allDetails`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      setStats(data.details)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (user.userRole !== 'admin') {
    return navigate("/")
  }

  const StatsCard = ({ title, value, icon, color, change, subtitle }) => (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {change && (
          <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">
            +{change}%
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-white text-3xl font-bold mb-1">{value || 0}</p>
      {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
    </div>
  )

  const QuickActionCard = ({ title, description, icon, onClick, color }) => (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-1 group"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <span className="text-xl">{icon}</span>
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )

  if (isLoading) {
    return (
      <Layout user={user}>
        <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user}>
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Welcome back, {user.name}! Here's what's happening.</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                ● System Online
              </div>
              <div className="text-gray-400 text-sm">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Courses"
            value={stats?.totalCourse}
            icon="📚"
            color="from-blue-500 to-cyan-600"
            change={12.5}
            subtitle="Active learning programs"
          />
          <StatsCard
            title="Total Lectures"
            value={stats?.totalLac}
            icon="🎥"
            color="from-green-500 to-emerald-600"
            change={8.3}
            subtitle="Video content hours"
          />
          <StatsCard
            title="Total Users"
            value={stats?.totalUser}
            icon="👥"
            color="from-purple-500 to-violet-600"
            change={15.7}
            subtitle="Registered learners"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Growth Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Platform Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyGrowth}>
                <defs>
                  <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #4b5563', 
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="courses"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorCourses)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center mr-4`}>
                    <span className="text-white text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{activity.action}</p>
                    <p className="text-purple-400 text-xs">{activity.details}</p>
                  </div>
                  <span className="text-gray-400 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              title="Create Course"
              description="Add a new course to the platform"
              icon="➕"
              color="from-blue-500 to-cyan-600"
              onClick={() => navigate('/admin/courses')}
            />
            <QuickActionCard
              title="Manage Users"
              description="View and manage user accounts"
              icon="👤"
              color="from-green-500 to-emerald-600"
              onClick={() => navigate('/admin/users')}
            />
            <QuickActionCard
              title="Analytics"
              description="View detailed platform analytics"
              icon="📊"
              color="from-purple-500 to-violet-600"
              onClick={() => navigate('/admin/analytics')}
            />
            <QuickActionCard
              title="Settings"
              description="Configure platform settings"
              icon="⚙️"
              color="from-orange-500 to-yellow-600"
              onClick={() => navigate('/admin/settings')}
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {stats?.totalCourse ? Math.round((stats.totalLac / stats.totalCourse) * 10) / 10 : 0}
              </div>
              <div className="text-gray-400 text-sm">Avg Lectures per Course</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {stats?.totalUser ? Math.round((stats.totalUser / stats.totalCourse) * 10) / 10 : 0}
              </div>
              <div className="text-gray-400 text-sm">Avg Users per Course</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">98.5%</div>
              <div className="text-gray-400 text-sm">System Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard