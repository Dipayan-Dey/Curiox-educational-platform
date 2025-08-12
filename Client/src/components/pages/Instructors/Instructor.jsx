import React from "react";
import { UserData } from "../../../Context/UserContext";

function Instructor() {
  const { user } = UserData();
  console.log(user);
  return (
    <div className="min-h-screen bg-tranparent p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Meet Our Instructors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {user ? (
          // 
          <>
            </>
        ) : (
          <p>No instructor</p>
        )}
      </div>
    </div>
  );
}

export default Instructor;
