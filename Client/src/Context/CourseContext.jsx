import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Server } from "../main";

const CourseContext = createContext();

export const CourseContextProvide = ({ children }) => {
  const [courses, setCourse] = useState();
  const [course, setCours] = useState();
  const [myCourses, setMyCourses] = useState([]);

  async function fetchAllCourses() {
    try {
      const { data } = await axios.get(`${Server}/api/course/allcourse`);
      setCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(
        `${Server}/api/course/singlecourse/${id}`
      );
      setCours(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMyCourses() {
    try {
      const { data } = await axios.get(`${Server}/api/course/getmycourses`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setMyCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllCourses();
    fetchMyCourses();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchAllCourses,
        fetchCourse,
        course,
        fetchMyCourses,
        myCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// ✅ Correct way to use context in components
export const CourseData = () => useContext(CourseContext);
