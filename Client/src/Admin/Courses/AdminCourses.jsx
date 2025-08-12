import React, { useEffect, useState } from "react";
import Layout from "../Utils/Layout";
// import { CourseData } from "../../Context/CourseContext";
// import CourseCard from "../../components/pages/courses/CourseCard";
import { toast } from "react-toastify";
import axios from "axios";
// import { Server } from "../../main";
// import LoadingScreen from "../../components/Loading/LoadingScreen";
import AdminCourseCard from "./AdminCourseCard";
// import { CourseData } from "../../Context/CourseContext";
import { Server } from "../../main";
import LoadingScreen from "../../components/Loading/LoadingScreen";

function AdminCourses({ user }) {
  // const { admincourses, fetchAdminOwnedCourses } = CourseData();
  // console.log(admincourses)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setloading] = useState(false);
  // const [isFormOpen, setIsFormOpen] = useState(false)
  // const [isFormOpen, setIsFormOpen] = useState(false)
  // const [isFormOpen, setIsFormOpen] = useState(false)
  const [admincourses, setAdminCourses] = useState([]);

  // async function fetchAdminOwnedCourses(userId) {
  //   try {
  //     const {data}=await axios.get(`${Server}/api/admin/getadmincourse/${userId}`,{
  //       headers:{
  //         token:localStorage.getItem("token")
  //       }
  //     })

  //     setAdminCourses(data.courses)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const closeModal = () => {
    setIsFormOpen(false);
  };
  async function fetchAdminOwnedCourses(userId) {
    try {
      const { data } = await axios.get(
        `${Server}/api/admin/getadmincourse/${userId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setAdminCourses(data.courses);
      console.log(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  const imageFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const handleCreateCourse = async (e) => {
    setloading(true);
    e.preventDefault();
    // alert()
    const mydata = new FormData();
    mydata.append("title", title);
    mydata.append("description", description);
    mydata.append("file", image);
    mydata.append("price", price);
    mydata.append("duration", duration);
    mydata.append("category", category);
    mydata.append("createdBy", author);

    try {
      const { data } = await axios.post(
        `${Server}/api/admin/createcourse`,
        mydata,
        {
          headers: {
            token: localStorage.getItem("token"),
            // DO NOT add 'Content-Type': 'multipart/form-data'
          },
        }
      );

      toast.success(data.message);
      setLoadingBtn(false);
      // await  fetchAdminOwnedCourses();
      fetchAdminOwnedCourses();
      setTitle("");
      setDescription("");
      setImage("");
      setDuration("");
      setCategory("");
      setAuthor("");
      setIsFormOpen(false);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    const userId = user?._id; // adjust if stored differently
    if (userId) {
      fetchAdminOwnedCourses(userId);
    }
  }, []);

  return (
    <Layout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-transparent text-white min-h-screen">
          <section className="py-20 px-4 sm:px-6 lg:px-8" id="courses">
            <div className="max-w-7xl mx-auto">
              {/* Add Course Button */}
              <div className="text-center mb-12">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  + Add New Course
                </button>
              </div>

              {/* Course Grid */}
              {admincourses && admincourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {admincourses.map((course) => (
                    <div
                      key={course._id}
                      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
                    >
                      {/* Course Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={
                            course.image ||
                            "https://via.placeholder.com/400x200/6b46c1/ffffff?text=Course+Image"
                          }
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {course.category || "General"}
                          </span>
                        </div>
                        {/* Price Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                            ₹{course.price || "Free"}
                          </span>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-5 flex flex-col h-full">
                        {/* Course Title */}
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
                          {course.title}
                        </h3>

                        {/* Course Description */}
                        <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                          {course.description.length > 80
                            ? course.description.slice(0, 80) + "..."
                            : course.description}
                        </p>

                        {/* Course Info */}
                        <div className="space-y-2 mb-4">
                          {/* Duration */}
                          <div className="flex items-center text-gray-400 text-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>{course.duration ? `${course.duration} hours` : "Self-paced"}</span>
                          </div>

                          {/* Author */}
                          {course.createdBy && (
                            <div className="flex items-center text-gray-400 text-sm">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              <span>By {course.createdBy}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-auto">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                            View Details
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) 
              
              
              : (
                <div className="text-center py-16">
                  <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">No Courses Yet</h3>
                    <p className="text-gray-300 mb-4">Get started by creating your first course</p>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                    >
                      Create Course
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Modal Form */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Add New Course
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleCreateCourse} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      // name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter course title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      // name="description"

                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter course description"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      // name="image"
                      // value={formData.image}
                      onChange={imageFileHandler}
                      required
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      // placeholder="https://example.com/image.jpg"
                    />
                    {imagePrev && (
                      <img src={imagePrev} width={700} className="mt-5" />
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        // name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        // min="0"
                        // step="0.01"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Course Price"
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration *
                      </label>
                      <input
                        type="number"
                        // name="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., 4 weeks, 20 hours"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      // name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">
                        Mobile Development
                      </option>
                      <option value="Data Science">Data Science</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Created By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Created By
                    </label>
                    <input
                      type="text"
                      // name="createdBy"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Instructor name"
                    />
                  </div>

                  {/* Form Buttons */}
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition duration-300"
                    >
                      {loadingBtn ? "Course Uploading..." : "Upload Course"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default AdminCourses;