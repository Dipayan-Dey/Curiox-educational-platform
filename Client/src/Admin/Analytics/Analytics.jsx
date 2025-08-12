import React, { useState, useEffect } from 'react';
import Layout from '../Utils/Layout';
import { CourseData } from '../../Context/CourseContext';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(true);
  
  // Get courses from context
  const { courses, fetchAllCourses } = CourseData();

  // Function to process course data for pie chart
  const processCategoryData = (coursesData) => {
    if (!coursesData || coursesData.length === 0) {
      return [];
    }

    const categoryColors = {
      'Web Development': '#8b5cf6',
      'Data Science': '#06b6d4', 
      'Mobile Development': '#10b981',
      'AI/ML': '#f59e0b',
      'UI/UX Design': '#ef4444',
      'DevOps': '#14b8a6',
      'Cybersecurity': '#f97316',
      'Other': '#6b7280'
    };

    // Count courses by category
    const categoryCount = {};
    let totalCourses = coursesData.length;

    coursesData.forEach(course => {
      const category = course.category || 'Other';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Convert to pie chart data format
    return Object.entries(categoryCount).map(([name, count]) => ({
      name,
      value: Math.round((count / totalCourses) * 100),
      count,
      color: categoryColors[name] || categoryColors['Other']
    }));
  };

  // Function to calculate real metrics from courses data
  const calculateMetrics = (coursesData) => {
    if (!coursesData || coursesData.length === 0) {
      return {
        totalRevenue: 0,
        totalCourses: 0,
        avgPrice: 0,
        categories: 0
      };
    }

    const totalRevenue = coursesData.reduce((sum, course) => sum + (course.price || 0), 0);
    const totalCourses = coursesData.length;
    const avgPrice = totalRevenue / totalCourses;
    const categories = new Set(coursesData.map(course => course.category)).size;

    return {
      totalRevenue,
      totalCourses,
      avgPrice,
      categories
    };
  };

  // Process real data
  const categoryData = processCategoryData(courses);
  const metrics = calculateMetrics(courses);

  // Mock data for charts that don't depend on courses
  const revenueData = [
    { name: 'Jan', revenue: 45000, students: 120, courses: 8 },
    { name: 'Feb', revenue: 52000, students: 145, courses: 12 },
    { name: 'Mar', revenue: 48000, students: 132, courses: 10 },
    { name: 'Apr', revenue: 61000, students: 178, courses: 15 },
    { name: 'May', revenue: 55000, students: 165, courses: 13 },
    { name: 'Jun', revenue: 67000, students: 195, courses: 18 },
    { name: 'Jul', revenue: 73000, students: 210, courses: 22 }
  ];

  // Generate performance data from real courses
  const performanceData = courses ? courses.slice(0, 5).map((course, index) => ({
    name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title,
    completion: Math.floor(Math.random() * 30) + 70, // Mock completion rate
    rating: (Math.random() * 1 + 4).toFixed(1), // Mock rating 4.0-5.0
    enrollments: Math.floor(Math.random() * 200) + 50, // Mock enrollments
    price: course.price
  })) : [];

  const trafficData = [
    { name: 'Mon', visits: 2400, conversions: 240 },
    { name: 'Tue', visits: 2210, conversions: 198 },
    { name: 'Wed', visits: 2290, conversions: 229 },
    { name: 'Thu', visits: 2000, conversions: 180 },
    { name: 'Fri', visits: 2181, conversions: 196 },
    { name: 'Sat', visits: 2500, conversions: 275 },
    { name: 'Sun', visits: 2100, conversions: 189 }
  ];

  useEffect(() => {
    // Fetch courses if not already loaded
    if (!courses) {
      fetchAllCourses();
    }
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, [courses, fetchAllCourses]);

  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className={`text-sm font-medium px-3 py-1 rounded-full ${
          change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-400">Loading Analytics...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-transparent text-white p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400">Track your course performance and revenue insights</p>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex bg-gray-800 rounded-lg p-1 mt-4 sm:mt-0">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    timeRange === range
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '3 Months' : '1 Year'}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Revenue"
              value={`₹${metrics.totalRevenue.toLocaleString()}`}
              change={12.5}
              icon="💰"
              color="from-green-500 to-emerald-600"
            />
            <MetricCard
              title="Total Courses"
              value={metrics.totalCourses.toString()}
              change={8.2}
              icon="📚"
              color="from-blue-500 to-cyan-600"
            />
            <MetricCard
              title="Avg. Course Price"
              value={`₹${Math.round(metrics.avgPrice).toLocaleString()}`}
              change={-2.4}
              icon="💎"
              color="from-purple-500 to-violet-600"
            />
            <MetricCard
              title="Categories"
              value={metrics.categories.toString()}
              change={5.1}
              icon="📂"
              color="from-orange-500 to-yellow-600"
            />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Revenue Trend</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveMetric('revenue')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeMetric === 'revenue' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setActiveMetric('students')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeMetric === 'students' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Students
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Course Categories */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Course Categories Distribution</h2>
            {categoryData.length > 0 ? (
              <div className="flex flex-col lg:flex-row items-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
                              <p className="text-white font-medium">{data.name}</p>
                              <p className="text-gray-300 text-sm">{data.count} courses ({data.value}%)</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="lg:ml-6 mt-4 lg:mt-0 min-w-[200px]">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between mb-3 p-2 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div>
                          <p className="text-white text-sm font-medium">{category.name}</p>
                          <p className="text-gray-400 text-xs">{category.count} courses</p>
                        </div>
                      </div>
                      <span className="text-white font-semibold">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <p className="text-lg mb-2">📊</p>
                  <p>No course data available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Performance */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Top Performing Courses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completion" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic & Conversions */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Weekly Traffic & Conversions</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Courses</h2>
          <div className="space-y-4">
            {courses && courses.slice(0, 4).map((course, index) => (
              <div key={course._id} className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <img 
                  src={course.image || "https://via.placeholder.com/60x60/6b46c1/ffffff?text=Course"} 
                  alt={course.title}
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{course.title}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-purple-400 text-sm">{course.category}</span>
                    <span className="text-green-400 text-sm font-medium">₹{course.price}</span>
                    <span className="text-gray-400 text-sm">{course.duration} hours</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">By {course.createdBy}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {(!courses || courses.length === 0) && (
              <div className="text-center py-8 text-gray-400">
                <p>No courses available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}