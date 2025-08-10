import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../../Context/CourseContext";
import { Server } from "../../../main";
import { Clock, User, Star, BookOpen } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserData } from "../../../Context/UserContext";
import LoadingScreen from "../../Loading/LoadingScreen";
import Swal from "sweetalert2/dist/sweetalert2.js";
function CourseDescription({ user }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  // console.log(params.id)
  const navigate = useNavigate();
  const { fetchCourse, course, fetchAllCourses, fetchMyCourses } = CourseData();
  const { fetchUser } = UserData();
  // console.log(course);

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

 const checkOutHandler = async () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded m-5",
      cancelButton:
        "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded m-5",
    },
    buttonsStyling: false,
  });

  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "If you want to purchase this course, please use NetBanking. Since the payment is in test mode, no amount will be debited from your account — it’s just for testing purposes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("token");
      setLoading(true);

      // Create order on backend
      const {
        data: { order },
      } = await axios.post(
        `${Server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: { token },
        }
      );

      // Razorpay options
      const options = {
        key: "rzp_test_uplAZFyPYjXmpl",
        amount: order.amount,
        currency: "INR",
        name: "CurioX",
        description: "Learn With Us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const { data } = await axios.post(
              `${Server}/api/course/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: { token },
              }
            );

            // Refresh user & courses data
            await fetchUser();
            await fetchAllCourses();
            await fetchMyCourses();

            toast.success(data.msg);
            setLoading(false);

            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response?.data?.msg || "Payment verification failed");
            setLoading(false);
          }
        },
        prefill: {
          contact: "+91 83898 06944",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      swalWithBootstrapButtons.fire({
        title: "Processing...",
        text: "Redirecting to payment gateway.",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your payment process has been cancelled.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
    setLoading(false);
  }
};


  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className=" min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-black p-4 sm:p-6 lg:p-8 pt-24 sm:pt-20 lg:pt-24 pb-10 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          </div>

          {course && (
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm">
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 z-10"></div>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20 font-medium z-20">
                    {course.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                  <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 z-20">
                    <div className="flex  sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg inline-block w-fit">
                        Beginner to Advanced
                      </span>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 w-fit">
                        <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current drop-shadow-sm" />
                        <span className="text-white text-xs sm:text-sm font-semibold drop-shadow-sm">
                          4.8
                        </span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <h1 className="text-md font-light md:font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl  bg-clip-text text-white leading-tight">
                        {course.title}
                      </h1>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                </div>

                {/* Course Content */}
                <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
                  {/* Meta Info */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 rounded-xl border border-indigo-100 flex-1 sm:flex-none">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 font-medium">
                          Instructor
                        </div>
                        <span className="font-bold text-gray-800 text-sm sm:text-base truncate block">
                          {course.createdBy}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 rounded-xl border border-blue-100 flex-1 sm:flex-none">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 font-medium">
                          Duration
                        </div>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">
                          {course.duration} Weeks
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8 sm:mb-10">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-3">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm">
                          📖
                        </span>
                      </div>
                      About this course
                    </h2>
                    <div className="bg-gradient-to-r from-gray-50 to-indigo-50/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200/50">
                      <ul className="pl-6 space-y-2 text-gray-700 text-base sm:text-lg font-medium">
                        {course.description.split("\n").map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl sm:rounded-2xl border-2 border-gray-200/50 shadow-inner">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            ₹{course.price.toLocaleString()}
                          </span>
                          <span className="text-lg sm:text-xl text-gray-400 line-through font-semibold">
                            ₹{(course.price * 1.5).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                          One-time payment • Lifetime access
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse w-fit">
                        33% OFF
                      </div>
                    </div>

                    <div className="w-full lg:w-auto">
                      {user && user.subscription.includes(course._id) ? (
                        <button
                          onClick={() =>
                            navigate(`/course/study/${course._id}`)
                          }
                          className="w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 lg:min-w-[200px] group"
                        >
                          <span className="text-lg sm:text-xl">📚</span>
                          Study Course
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            →
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={checkOutHandler}
                          className="w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 lg:min-w-[200px] group border-2 border-orange-400"
                        >
                          <span className="text-lg sm:text-xl">🔒</span>
                          Buy Now
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            💳
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-100/50 hover:shadow-lg transition-shadow duration-300 group">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white text-lg sm:text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                        24/7
                      </div>
                      <div className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                        24/7 Support
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Get help whenever you need it
                      </div>
                    </div>

                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-100/50 hover:shadow-lg transition-shadow duration-300 group">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                        ∞
                      </div>
                      <div className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                        Lifetime Access
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Learn at your own pace, forever
                      </div>
                    </div>

                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl border border-emerald-100/50 hover:shadow-lg transition-shadow duration-300 group sm:col-span-2 lg:col-span-1">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                        📜
                      </div>
                      <div className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                        Certificate
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Earn a completion certificate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>

    // </div>
  );
}

export default CourseDescription;
