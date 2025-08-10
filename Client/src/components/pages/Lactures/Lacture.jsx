import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Server } from "../../../main";
import { CloudHail } from "lucide-react";
import LoadingScreen from "../../Loading/LoadingScreen";
import { toast } from "react-toastify";
// import LoadingScreen from "./../../Loading/LoadingScreen";

function Lacture({ user }) {
  const params = useParams();
  const navigate=useNavigate()
  const [lactures, setLactures] = useState([]);
  const [lacture, setLacture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lacloading, setLacLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [video, setVideo] = useState("")
  const [videoPrev, setVideoPrev] = useState("")
  const [loadingbtn, setLoadingBtn] = useState("")
  if(user && user.userRole!=='admin' && !user.subscription.includes(params.id)){return}
  async function fetlactures() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${Server}/api/course/getAllLactures/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLactures(data.lactures);
      console.log(data.lactures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchSingleLac(id) {
    setLacLoading(true);
    try {
      const { data } = await axios.get(
        `${Server}/api/course/getLacture/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLacture(data.lacture);
      console.log(data.lacture);
      setLacLoading(false);
    } catch (error) {
      console.log(error);
      setLacLoading(false);
    }
  }

const changeVideoHandler=(e)=>{
  const file=e.target.files[0]
    const reader=new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend=()=>{
      setVideoPrev(reader.result)
      setVideo(file)
    }
}
  
const lactureSubmitHandler=async(e)=>{
  setLoadingBtn(true)
  e.preventDefault()

  const myForm=new FormData()
  myForm.append("title",title)
  myForm.append("description",description)
  myForm.append("file",video)

  try {
    const {data}=await axios.post(`${Server}/api/admin/createLacture/${params.id}`,myForm,{
      headers:{
        token:localStorage.getItem("token")
      }
    })

    toast.success(data.msg)
    setLoadingBtn(false)
    setShow(false)
    fetlactures()
    setTitle("")
    setDescription("")
    setVideo("")
    setVideoPrev("")
  } catch (error) {
    // console.log(error)
    toast.error(error.response.data.msg)
    setLoadingBtn(false)
  }

}


const deleteLacHandler=async (id)=>{
  try {
    const {data}=await axios.delete(`${Server}/api/admin/deleteLac/${id}`,{
      headers:{
        token:localStorage.getItem("token")
      }
    })

    toast.success(data.msg)
    fetlactures()
  } catch (error) {
    toast.error(error.data.response.msg)
  }
}

  useEffect(() => {
    fetlactures();
  }, []);

  return (
  <>
  {loading ? (
    <LoadingScreen />
  ) : (
    <div className="pt-20 min-h-screen p-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white flex flex-col md:flex-row gap-8 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Left side - Video player */}
      <div className="md:w-2/3 w-full space-y-6 relative z-10">
        {lacloading ? (
          <LoadingScreen />
        ) : (
          <>
            {lacture.video ? (
              <div className="space-y-6">
                {/* Video Container */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                    <video
                      src={lacture.video}
                      className="w-full rounded-xl shadow-2xl"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                    ></video>
                  </div>
                </div>

                {/* Video Info */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">🎬</span>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-3 leading-tight">
                        {lacture.title}
                      </h1>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4"></div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {lacture.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl">📺</span>
                  </div>
                  <h1 className="text-xl font-semibold text-gray-300">Please Select a Lecture</h1>
                  <p className="text-gray-400">Choose a lecture from the list to start learning</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right side - Lecture list & form */}
      <div className="md:w-1/3 w-full space-y-6 relative z-10">
        
        {/* Add lecture button for admin */}
        {user && user.userRole === "admin" && (
          <button
            onClick={() => setShow(!show)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
          >
            <span className="text-xl">{show ? "📝" : "➕"}</span>
            {show ? "Close Form" : "Add Lecture"}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {show ? "×" : "→"}
            </span>
          </button>
        )}

        {/* Show form */}
        {show && (
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">📚</span>
              </div>
              <h2 className="text-xl font-bold text-white">Add New Lecture</h2>
            </div>
            
            <form className="space-y-5" onSubmit={lactureSubmitHandler}>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="Enter lecture title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-gray-400 resize-none"
                  placeholder="Enter lecture description"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">Video File</label>
                <div className="relative">
                  <input
                  onChange={changeVideoHandler}
                    type="file"
                    required
                    accept="video/*"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
                {
                  videoPrev && <video src={videoPrev} width={500} controls></video>
                }
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                <span className="text-lg">✓</span>
               {loadingbtn ? "Uploading Lacture..." : "Upload Lacture"}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </button>
            </form>
          </div>
        )}

        {/* Lecture List */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">📖</span>
            </div>
            <h2 className="text-xl font-bold text-white">Course Lectures</h2>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {lactures && lactures.length > 0 ? (
              lactures.map((e, i) => (
                <div key={e._id} className="space-y-3">
                  <div
                    onClick={() => fetchSingleLac(e._id)}
                    className={`cursor-pointer p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group ${
                      lacture._id === e._id 
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg scale-105' 
                        : 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        lacture._id === e._id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-gray-100 transition-colors duration-300">
                          {e.title}
                        </h3>
                        {lacture._id === e._id && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-xs text-white/80">Now Playing</span>
                          </div>
                        )}
                      </div>
                      {lacture._id === e._id && (
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">▶</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {user && user.userRole === 'admin' && (
                    <button
                    onClick={()=>deleteLacHandler(e._id)}
                    className="cursor-pointer w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group text-sm">
                      <span className="text-lg">🗑️</span>
                      Delete Lacture {i+1}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">×</span>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-gray-400 text-lg font-medium">No Lectures Added Yet</p>
                <p className="text-gray-500 text-sm mt-2">Start building your course content!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  )}
</>

  );
}

export default Lacture;
