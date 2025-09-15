import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { FaCircleCheck } from "react-icons/fa6"; // ✅ Cool verified icon
import CharAvatar from "../Cards/CharAvatar";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div
      onClick={handleProfileClick}
      className="flex flex-col items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100"
    >
      {/* Bigger Avatar */}
      <div className="flex-shrink-0">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user.fullName}
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />
        ) : (
          <CharAvatar fullName={user.fullName} width="w-16" height="h-16" />
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center">
        {/* Name + Verified Icon in One Row */}
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800 text-base">
            {user.fullName}
          </h3>
          {user.emailVerified && (
            <FaCircleCheck className="text-green-500 text-sm" title="Verified" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
