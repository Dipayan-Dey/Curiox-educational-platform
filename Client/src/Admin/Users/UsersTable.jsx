import React, { useEffect, useState } from "react";
import Layout from "./../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Server } from "../../main";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  Edit3,
  UserCheck,
  Shield,
  Crown,
  Search,
  Filter,
  Trash,
  Users,
  UserPlus,
  Activity,
  TrendingUp,
  Eye,
  MoreVertical,
  Settings,
  Calendar
} from "lucide-react";
import ReactPaginate from "react-paginate";

function UsersTable({ user }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isOpenImg, setIsOpenImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const postPerPage = 4;

  if (user.userRole !== "admin") {
    return navigate("/");
  }

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get(`${Server}/api/admin/allUsers`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function UpdateRole(id) {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg m-2 transition-all",
        cancelButton: "bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg m-2 transition-all",
        popup: "bg-white rounded-xl shadow-2xl",
        title: "text-gray-800 font-semibold",
        content: "text-gray-600"
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwind.fire({
      title: "Update User Role",
      text: "Are you sure you want to update this user's role?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.put(
          `${Server}/api/admin/updateUsers/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        fetchAllUsers();
        swalWithTailwind.fire("Success!", "User role has been updated.", "success");
      } catch (error) {
        toast.error(error.response?.data?.msg || "Something went wrong");
      }
    }
  }

  async function DeleteUser(id) {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg m-2 transition-all",
        cancelButton: "bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg m-2 transition-all",
        popup: "bg-white rounded-xl shadow-2xl",
        title: "text-gray-800 font-semibold",
        content: "text-gray-600"
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwind.fire({
      title: "Delete User",
      text: "This action cannot be undone. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(
          `${Server}/api/admin/deleteUser/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        fetchAllUsers();
        swalWithTailwind.fire("Deleted!", "User has been deleted successfully.", "success");
      } catch (error) {
        toast.error(error.response?.data?.msg || "Something went wrong");
      }
    }
  }

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.userName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.userRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const pageVisited = pageNumber * postPerPage;
  const pageCount = Math.ceil(filteredUsers.length / postPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setPageNumber(0);
  }, []);

  const roleIcons = {
    admin: Crown,
    user: UserCheck,
    superadmin: Shield,
  };

  const roleColors = {
    admin: "bg-purple-100 text-purple-800 border-purple-200",
    user: "bg-green-100 text-green-800 border-green-200",
    superadmin: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const RoleIcon = ({ role }) => {
    const IconComponent = roleIcons[role?.toLowerCase()] || UserCheck;
    return <IconComponent className="w-4 h-4" />;
  };

  // Stats calculations
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.userRole === 'admin').length;
  const activeUsers = users.length; // You can modify this based on your active user logic

  return (
    <Layout>
      <div className="min-h-screen bg-transparent p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  User Management
                </h1>
                <p className="text-gray-600">
                  Manage your team members and their permissions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-white">{totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 ">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-white">{activeUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-white">{adminCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Growth</p>
                  <p className="text-2xl font-bold text-white">+12%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer bg-transparent"
                  >
                    <option className="text-black" value="All">All Roles</option>
                    <option className="text-black" value="admin">Admin</option>
                    <option className="text-black" value="user">User</option>
                    <option className="text-black" value="superadmin">SuperAdmin</option>
                    <option className="text-black" value="editor">Editor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-white">Users List</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-transparent">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers &&
                    filteredUsers
                      .slice(pageVisited, pageVisited + postPerPage)
                      .map((e, i) => (
                        <tr
                        className="cursor-pointer"
                          key={i}
                          // onMouseEnter={() => setHoveredRow(i)}
                          // onMouseLeave={() => setHoveredRow(null)}
                          // className={`transition-all duration-200 ${
                          //   hoveredRow === i ? "bg-gray-50" : "hover:bg-gray-50"
                          // }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div
                                  className="h-10 w-10 rounded-full overflow-hidden cursor-pointer ring-2 ring-gray-200 hover:ring-blue-400 transition-all"
                                  onClick={() => {
                                    setSelectedImage(e.profileImg);
                                    setIsOpenImg(true);
                                  }}
                                >
                                  <img
                                    src={e.profileImg}
                                    alt={e.userName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-white">
                                  {e.userName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {pageVisited + i + 1}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm text-white">{e.userEmail}</div>
                          </td>

                          <td className="px-6 py-4">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                                roleColors[e.userRole?.toLowerCase()] ||
                                "bg-gray-100 text-gray-800 border-gray-200"
                              }`}
                            >
                              <RoleIcon role={e.userRole} />
                              <span className="ml-2 capitalize">{e.userRole}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Active
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => UpdateRole(e._id)}
                                className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
                              >
                                <Edit3 className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => DeleteUser(e._id)}
                                className="inline-flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
                              >
                                <Trash className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t text-white">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center items-center space-x-2 text-sm"
                pageClassName="px-3 py-2 border border-white  rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                activeClassName="bg-blue-600 text-white border-blue-600"
                previousClassName="px-4 py-2 border border-white  rounded-lg cursor-pointer hover:bg-white transition-colors"
                nextClassName="px-4 py-2 border border-white  rounded-lg cursor-pointer hover:bg-white transition-colors"
                breakClassName="px-3 py-2"
              />
            </div>

            {/* Image Modal */}
            {isOpenImg && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={() => setIsOpenImg(false)}
              >
                <div className="relative max-w-4xl mx-4">
                  <img
                    src={selectedImage}
                    alt="User Profile"
                    className="max-w-full max-h-screen rounded-lg shadow-2xl"
                  />
                  <button
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                    onClick={() => setIsOpenImg(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500 text-lg font-medium">
                  {users.length === 0 ? "Loading users..." : "No users found"}
                </div>
                {users.length > 0 && (
                  <p className="text-gray-400 mt-2">
                    Try adjusting your search or filter settings
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UsersTable;