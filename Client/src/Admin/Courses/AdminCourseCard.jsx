import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server } from "../../main";

const AdminCourseCard = ({ admincourses }) => {
  // const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // Get token from localStorage

  //       if (!token) {
  //         console.error("No token found");
  //         return;
  //       }

  //       const res = await axios.get(
  //         `${Server}/api/courses/admin/${userId}`,
  //         {
  //           headers: {
  //            token // Pass token in headers
  //           },
  //         }
  //       );

  //       setCourses(res.data.courses || []); // Set courses from response
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, [adminId]);

  // if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-6 p-5">
      {admincourses.length > 0 ? (
        admincourses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-lg rounded-lg p-4 border hover:shadow-xl transition duration-300"
          >
            <img
              src={course.thumbnail || "https://via.placeholder.com/300"}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-3">{course.title}</h2>
            <p className="text-gray-600 mt-1">
              {course.description?.slice(0, 80)}...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Price: ₹{course.price}
            </p>
          </div>
        ))
      ) : (
        <p>No admincourses found</p>
      )}
    </div>
  );
};

export default AdminCourseCard;




// export default AdminCourseCard