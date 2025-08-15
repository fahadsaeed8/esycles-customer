"use client";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Announcements from "@/components/sections/messages/annoucments";
import ChatArea from "@/components/sections/messages/chat-area";
import ChatSidebar from "@/components/sections/messages/chat-sidebar";
import React, { useState } from "react";
import {
  FaHeart,
  FaFolder,
  FaInbox,
  FaPaperPlane,
  FaRegFileAlt,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const ChatScreen: React.FC = () => {
  const [active, setActive] = useState("Inbox");

  const menuItems = [
    { name: "Inbox", icon: <FaInbox />, count: 10 },
    { name: "Sent", icon: <FaPaperPlane />, count: 10 },
    { name: "Drafts", icon: <FaRegFileAlt />, count: 3 },
    { name: "Create Folder", icon: <FaFolder /> },
    { name: "Contact", icon: <FaHeart /> },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-full">
        <ChatSidebar />
        <ChatArea />
        <Announcements />
      </div>
    </DashboardLayout>
  );
};

export default ChatScreen;
