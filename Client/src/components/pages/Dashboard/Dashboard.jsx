import React from 'react'
import { CourseData } from '../../../Context/CourseContext'
import CourseCard from '../courses/CourseCard'

function Dashboard() {
  const {myCourses}=CourseData()
  console.log(myCourses)
  return (
    <div className=" bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="courses">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Enrolled{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            You Enroll this courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCourses && myCourses.length > 0 ? (
              myCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p>No Course Yet...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard