import React, { useState } from "react";
import Layout from "../Utils/Layout";
// import { CourseData } from "../../Context/CourseContext";
// import CourseCard from "../../components/pages/courses/CourseCard";
import { toast } from "react-toastify";
import axios from "axios";
// import { Server } from "../../main";
// import LoadingScreen from "../../components/Loading/LoadingScreen";
import AdminCourseCard from "./AdminCourseCard";
import { CourseData } from "../../Context/CourseContext";
import { Server } from "../../main";
import LoadingScreen from "../../components/Loading/LoadingScreen";

function AdminCourses() {
  const { admincourses, fetchAdminOwnedCourses } = CourseData();
  console.log(admincourses)
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

  const closeModal = () => {
    setIsFormOpen(false);
  };
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
    await  fetchAdminOwnedCourses();
      setTitle("");
      setDescription("");
      setImage("");
      setDuration("");
      setCategory("");
      setAuthor("");
      setIsFormOpen(false);
      setloading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoadingBtn(false);
    }
  };

  return (
    <Layout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-transparent text-white">
          <section className="py-20 px-4 sm:px-6 lg:px-8" id="courses">
            <div className="max-w-7xl mx-auto">
              {/* Add Course Button */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  + Add New Course
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {admincourses && admincourses.length > 0 ? (
                  admincourses.map((admincourses ,i) => (
                    <AdminCourseCard admincourses={admincourses} />
                  ))
                ) : (
                  <p className="text-center col-span-full text-gray-300">
                    No Course Yet...
                  </p>
                )}
              </div>
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
