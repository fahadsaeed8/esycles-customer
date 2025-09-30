"use client";

import React from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // 👈 Add this
import ReactPopUp from "../common/react-popup";
import { useUser } from "../profileContext/profile-content";
import { useQueryClient } from "@tanstack/react-query";
import { capitalizeFirstWord } from "@/utils/capitalizeFirstWord";
import { handleLogout } from "@/utils/authHelper";
import { useRouter } from "next/navigation";

const ProfilePopUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const userProfile: any = queryClient.getQueryData(["profile"]);
  const userProfileData = userProfile?.user;

  const notifications = [
    {
      id: 1,
      message: "Settings",
      link: "/settings", // 👈 add link here
      avatar: <Settings size={16} className="text-white" />,
    },
    {
      id: 2,
      message: "Log out",
      link: "/logout", // you can adjust this later
      avatar: <LogOut size={16} className="text-white" />,
    },
  ];

  const popupContent = (close: () => void) => (
    <div className="w-[200px] rounded-[4px] shadow-lg bg-white border border-gray-200 mt-1 overflow-hidden">
      <div className="px-4 py-2 border-b border-b-gray-300 font-semibold text-sm">
        Profile
      </div>
      <div>
        {notifications.map((msg) => (
          <div
            onClick={() => {
              if (msg.message === "Log out") {
                handleLogout();
              } else if (msg.link) {
                router.push(msg.link);
              }
              close();
            }}
            key={msg.id}
            className="flex items-center gap-3 px-4 py-2 transition-colors duration-150 cursor-pointer border-b border-b-gray-300 hover:bg-gray-300"
          >
            <div className="min-w-10 max-w-10 min-h-10 max-h-10 bg-gray-600 rounded-full flex justify-center items-center">
              {msg.avatar}
            </div>
            <div className="flex flex-col text-xs">
              {msg.message && (
                <span className="font-medium">{msg.message}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="px-4 py-2 cursor-pointer text-center text-sm text-gray-700">
        Advanced Settings
      </div> */}
    </div>
  );

  return (
    <ReactPopUp popupContent={popupContent}>
      <div className="flex items-center gap-1 sm:gap-2 cursor-pointer ml-1 sm:ml-0">
        {userProfileData?.image ? (
          <Image
            src={userProfileData?.imag}
            alt="User"
            width={32}
            height={32}
            className="rounded-full h-[40px] w-[40px] object-cover"
          />
        ) : (
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-blue-500 rounded-full">
            <User size={20} className="text-white" />
          </div>
        )}
        <span className="font-medium text-sm hidden md:inline">
          {capitalizeFirstWord(userProfileData?.first_name)}
        </span>
        <ChevronDown size={16} className="text-gray-200 hidden md:inline" />
      </div>
    </ReactPopUp>
  );
};

export default ProfilePopUp;
