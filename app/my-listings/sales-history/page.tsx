"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { FiSearch, FiEye, FiX } from "react-icons/fi";

type Sale = {
  id: number;
  productName: string;
  date: string;
  price: number;
  status: "Delivered" | "In Progress" | "Cancelled";
  image: string;
};

export default function SalesHistory() {
  const [search, setSearch] = useState("");
  const [sales] = useState<Sale[]>([
    {
      id: 1,
      productName: "Mountain Bike",
      date: "2025-08-01",
      price: 500,
      status: "Delivered",
      image: "/icons/cycle.png",
    },
    {
      id: 2,
      productName: "Road Bike",
      date: "2025-07-15",
      price: 750,
      status: "Delivered",
      image: "/icons/cycle.png",
    },
    {
      id: 3,
      productName: "BMX Bike",
      date: "2025-06-20",
      price: 300,
      status: "Cancelled",
      image: "/icons/cycle.png",
    },
  ]);

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const filteredSales = sales.filter((sale) =>
    sale.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
    <div className="">
      {/* Page Heading */}
      <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Sales History</h1>

        {/* Search */}
        <div className="flex items-center mt-4 md:mt-0 bg-white text-gray-700 rounded-lg shadow overflow-hidden ">
          <FiSearch className="ml-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search sales..."
            className="px-3 py-2 outline-none w-48 md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Sales Table */}
     <div className="bg-white rounded-lg shadow-md overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-[768px] w-full text-left border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
          <th className="p-3">Product</th>
          <th className="p-3">Date</th>
          <th className="p-3">Price</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredSales.map((sale) => (
          <tr key={sale.id} className="border-b last:border-none border-gray-300 hover:bg-gray-50">
            <td className="p-3 flex items-center gap-3">
              <img
                src={sale.image}
                alt={sale.productName}
                className="w-12 h-12 rounded object-contain"
              />
              {sale.productName}
            </td>
            <td className="p-3">{sale.date}</td>
            <td className="p-3">${sale.price}</td>
            <td className="p-3">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  sale.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : sale.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {sale.status}
              </span>
            </td>
            <td className="p-3">
              <button
                onClick={() => setSelectedSale(sale)}
                className="flex items-center cursor-pointer gap-1 text-[#f59e0b] hover:text-[#d97706] font-medium"
              >
                <FiEye /> View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {filteredSales.length === 0 && (
    <p className="text-center p-6 text-gray-500">No sales found.</p>
  )}
</div>

      {/* View Details Modal */}
      {selectedSale && (
        <Modal onClose={() => setSelectedSale(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <img
              src={selectedSale.image}
              alt={selectedSale.productName}
              className="w-full h-64 object-contain rounded"
            />
            <p className="mt-4">
              <strong>Product:</strong> {selectedSale.productName}
            </p>
            <p>
              <strong>Date:</strong> {selectedSale.date}
            </p>
            <p>
              <strong>Price:</strong> ${selectedSale.price}
            </p>
            <p>
              <strong>Status:</strong> {selectedSale.status}
            </p>
          </div>
        </Modal>
      )}
    </div>
    </DashboardLayout>
  );
}

/* ------------------ Modal Component ------------------ */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // clicking backdrop closes modal
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent click from closing modal
      >
        <button
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

