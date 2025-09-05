"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  type: "bidUpdate" | "adExpiry" | "response";
  message: string;
  time: string;
  read: boolean;
}

export default function CustomerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "bidUpdate",
      message: "Your bid on 'Road Bike Auction' has been outbid!",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "adExpiry",
      message: "Your ad 'Used Mountain Bike' will expire in 1 day.",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 3,
      type: "response",
      message: "Vendor A has replied to your inquiry on 'Bike Accessories Bulk Deal'.",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Optional: simulate receiving new notifications every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotif: Notification = {
        id: notifications.length + 1,
        type: "bidUpdate",
        message: `New bid update received for 'Product #${notifications.length + 1}'!`,
        time: "Just now",
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }, 15000);
    return () => clearInterval(interval);
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative p-2 rounded-full hover:bg-gray-200"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg overflow-hidden z-50">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <span className="font-semibold">Notifications</span>
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-100 flex justify-between items-start ${
                        n.read ? "bg-gray-50" : "bg-white"
                      }`}
                      onClick={() => markAsRead(n.id)}
                    >
                      <div>
                        <p className="text-sm">{n.message}</p>
                        <span className="text-xs text-gray-400">{n.time}</span>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                      )}
                    </li>
                  ))}
                  {notifications.length === 0 && (
                    <li className="px-4 py-3 text-sm text-gray-500">
                      No notifications
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Optional: Show notifications as a list on page */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">All Notifications</h3>
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`p-3 rounded border flex justify-between items-center ${
                  n.read ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div>
                  <p className="text-sm">{n.message}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
