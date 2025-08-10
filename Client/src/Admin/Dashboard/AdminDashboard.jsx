import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Utils/Layout'
import axios from 'axios'
import { Server } from '../../main'

function AdminDashboard({user}) {
const [stats,setStats]=useState()

async function fetchStats (){
  try {
    const {data}=await axios.get(`${Server}/api/admin/allDetails`,{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    setStats(data.details)
    console.log(stats)
    
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchStats()

  
}, [])

  const navigate=useNavigate()
  if(user.userRole!=='admin' ) {return navigate("/")}
  return (
  <Layout user={user}>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {stats ? (
      <>
        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Courses</h2>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalCourse}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Lectures</h2>
          <p className="text-3xl font-bold text-green-600">{stats?.totalLac}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-purple-600">{stats?.totalUser}</p>
        </div>
      </>
    ) : (
      <div className="col-span-full text-center text-gray-600 text-lg">Loading stats...</div>
    )}
  </div>
</Layout>

  )
}

export default AdminDashboard