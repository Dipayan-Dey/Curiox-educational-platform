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
  const navigate = useNavigate();
  const { fetchCourse, course, fetchAllCourses, fetchMyCourses } = CourseData();
  const { fetchUser } = UserData();

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
        text: "If you want to purchase this course, please use NetBanking. Since the payment is in test mode, no amount will be debited from your account — it's just for testing purposes.",
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
        <div className="min-h-screen bg-gray-900 pt-20 pb-12">
          {course && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {course.category}
                    </span>
                  </div>

                  {/* Course Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Beginner to Advanced
                      </span>
                      <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-black text-sm font-semibold">4.8</span>
                      </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {course.title}
                    </h1>
                  </div>
                </div>

                {/* Course Meta Information */}
                <div className="p-6 sm:p-8 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Instructor</p>
                        <p className="text-lg font-semibold text-gray-900">{course.createdBy}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Duration</p>
                        <p className="text-lg font-semibold text-gray-900">{course.duration} Weeks</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Description */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    About this course
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="prose prose-gray max-w-none">
                      {course.description.split("\n").map((point, index) => (
                        <p key={index} className="text-gray-700 mb-2 last:mb-0">
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing and CTA Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Pricing */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                          ₹{course.price.toLocaleString()}
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹{(course.price * 1.5).toLocaleString()}
                        </span>
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          33% OFF
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        One-time payment • Lifetime access
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="w-full lg:w-auto">
                    {user && user.subscription.includes(course._id) ? (
                      <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className="w-full lg:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-3"
                      >
                        <BookOpen className="w-5 h-5" />
                        Study Course
                      </button>
                    ) : (
                      <button
                        onClick={checkOutHandler}
                        className="w-full lg:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-3"
                      >
                        <span>💳</span>
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">24/7</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">Get help whenever you need it</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-purple-600">∞</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifetime Access</h3>
                  <p className="text-gray-600 text-sm">Learn at your own pace, forever</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📜</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate</h3>
                  <p className="text-gray-600 text-sm">Earn a completion certificate</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CourseDescription;