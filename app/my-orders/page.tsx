"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDateToMDY } from "@/utils/dateFormatter";

type Order = {
  id: string;
  date: string;
  items: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
};

export default function OrdersPage() {
  const initialOrders: Order[] = [
    {
      id: "ORD12345",
      date: "2025-08-01",
      items: "Mountain Pro 500X",
      total: 1299,
      status: "Pending",
    },
    {
      id: "ORD12346",
      date: "2025-07-20",
      items: "City Cruiser Elite",
      total: 899,
      status: "Shipped",
    },
    {
      id: "ORD12347",
      date: "2025-07-05",
      items: "RoadMaster SpeedX",
      total: 1599,
      status: "Delivered",
    },
    {
      id: "ORD12348",
      date: "2025-06-29",
      items: "Urban Comet",
      total: 750,
      status: "Cancelled",
    },
  ];

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [deletedOrderIds, setDeletedOrderIds] = useState<Set<string>>(new Set());

  // Load deleted order IDs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("deletedMyOrders");
    if (stored) {
      try {
        const deletedIds = JSON.parse(stored);
        setDeletedOrderIds(new Set(deletedIds));
        setOrders(initialOrders.filter((o) => !deletedIds.includes(o.id)));
      } catch (error) {
        console.error("Error loading deleted orders from localStorage:", error);
      }
    }
  }, []);

  // Handle delete action
  const handleDelete = (id: string) => {
    const newDeletedIds = new Set([...deletedOrderIds, id]);
    setDeletedOrderIds(newDeletedIds);
    setOrders(orders.filter((o) => o.id !== id));
    
    // Save to localStorage
    localStorage.setItem("deletedMyOrders", JSON.stringify(Array.from(newDeletedIds)));
  };

  const statusStyles = {
    Pending: { color: "text-yellow-600", bg: "bg-yellow-100", icon: <FiPackage /> },
    Shipped: { color: "text-blue-600", bg: "bg-blue-100", icon: <FiTruck /> },
    Delivered: { color: "text-green-600", bg: "bg-green-100", icon: <FiCheckCircle /> },
    Cancelled: { color: "text-red-600", bg: "bg-red-100", icon: <FiXCircle /> },
  };

  return (
    <DashboardLayout>
    <div className="">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Orders</h1>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center w-12"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-300 last:border-none"
                >
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.items}</td>
                  <td className="py-3 px-4 font-semibold">${order.total}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full ${statusStyles[order.status].bg} ${statusStyles[order.status].color}`}
                    >
                      {statusStyles[order.status].icon} {order.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{order.id}</h2>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${statusStyles[order.status].bg} ${statusStyles[order.status].color}`}
                >
                  {statusStyles[order.status].icon} {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{order.date}</p>
              <p className="mt-2">{order.items}</p>
              <p className="mt-2 font-semibold">${order.total}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
