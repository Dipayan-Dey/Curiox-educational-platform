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
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded m-5",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded m-5",
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwind.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "No, cancel!",
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

        // toast.success(data.msg);
        fetchAllUsers();

        swalWithTailwind.fire(
          "Updated!",
          "Your User has been Updated.",
          "success"
        );
      } catch (error) {
        toast.error(error.response?.data?.msg || "Something went wrong");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwind.fire("Cancelled", "Your User is safe :)", "error");
    }
  }
  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.userName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
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
    // 'editor': Edit3
  };
  async function DeleteUser(id) {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded m-5",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded m-5",
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwind.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    // alert(id)
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

        // toast.success(data.msg);
        fetchAllUsers();

        swalWithTailwind.fire(
          "Deleted!",
          "Your Course has been deleted.",
          "success"
        );
      } catch (error) {
        toast.error(error.response?.data?.msg || "Something went wrong");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwind.fire("Cancelled", "Your Course is safe :)", "error");
    }
  }

  const roleColors = {
    admin: "bg-gradient-to-r from-purple-500 to-pink-500",
    user: "bg-gradient-to-r from-green-500 to-emerald-500",
    superadmin: "bg-gradient-to-r from-orange-500 to-red-500",
    // 'editor': 'bg-gradient-to-r from-blue-500 to-cyan-500'
  };

  const RoleIcon = ({ role }) => {
    const IconComponent = roleIcons[role?.toLowerCase()] || UserCheck;
    return <IconComponent className="w-4 h-4" />;
  };

  // console.log(users);

  return (
    <Layout>
      <div className="h-screen bg-transparent p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold  mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-slate-300">
              Manage your team members and their permissions
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="All">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="superadmin">SuperAdmin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm">
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Email ID
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredUsers &&
                    filteredUsers
                      .slice(pageVisited, pageVisited + postPerPage)
                      .map((e, i) => (
                        <tr
                          key={i}
                          onMouseEnter={() => setHoveredRow(i)}
                          onMouseLeave={() => setHoveredRow(null)}
                          className={`transition-all duration-300 ${
                            hoveredRow === i
                              ? "bg-gradient-to-r from-slate-700/30 to-slate-600/30 transform scale-[1.01]"
                              : "bg-slate-800/20 hover:bg-slate-700/20"
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-bold">
                              {i + 1}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                <div
                                  className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden cursor-pointer"
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
                                <div className="text-base font-medium text-white">
                                  {e.userName}
                                </div>
                              </div>
                            </div>
                          </td>

                          {isOpenImg && (
                            <div
                              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                              onClick={() => setIsOpenImg(false)} // close when clicking background
                            >
                              <div className="relative">
                                <img
                                  src={selectedImage}
                                  alt="User"
                                  className="max-w-[90vw] max-h-screen rounded-lg shadow-lg"
                                />
                                <button
                                  className=" top-2 right-2 bg-white text-white rounded-full px-2 py-1 font-bold"
                                  onClick={() => setIsOpenImg(false)}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )}

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-slate-300 hover:text-white transition-colors duration-200">
                              {e.userEmail}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
                                roleColors[e.userRole?.toLowerCase()] ||
                                "bg-gradient-to-r from-gray-500 to-slate-500"
                              }`}
                            >
                              <RoleIcon role={e.userRole} />
                              <span className="ml-2 capitalize">
                                {e.userRole}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 flex gap-2 whitespace-nowrap text-right">
                            <button
                              onClick={() => UpdateRole(e._id)}
                              className=" cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:ring-offset-slate-800 shadow-lg hover:shadow-xl"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Update Role
                            </button>
                            <button
                              onClick={() => DeleteUser(e._id)}
                              className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:ring-offset-slate-800 shadow-lg hover:shadow-xl"
                            >
                              <Trash
                                strokeWidth={2.25}
                                className="w-4 h-4 mr-2"
                              />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="flex flex-wrap justify-end r-2 space-x-1 items-center sm:space-x-2 text-sm m-4 text-white"
                pageClassName="px-3 py-1 border rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                activeClassName="bg-blue-600 text-white"
                previousClassName="px-3 py-1 border rounded-md cursor-pointer"
                nextClassName="px-3 py-1 border rounded-md cursor-pointer"
                breakClassName="px-2 py-1"
              />
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-slate-400 text-lg">
                  {users.length === 0
                    ? "Loading users..."
                    : "No users found matching your criteria"}
                </div>
                {users.length > 0 && (
                  <p className="text-slate-500 mt-2">
                    Try adjusting your search or filter settings
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Stats Footer - Removed */}
        </div>
      </div>
    </Layout>
  );
}

export default UsersTable;
