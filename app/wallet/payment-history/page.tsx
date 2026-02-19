"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { formatDateToMDY } from "@/utils/dateFormatter";

export default function PaymentHistory() {
  const [payments] = useState([
    { id: 1, date: "2025-08-01", type: "Credit", amount: 120.5, method: "Credit Card", status: "Completed" },
    { id: 2, date: "2025-08-05", type: "Debit", amount: 50, method: "Purchase", status: "Completed" },
    { id: 3, date: "2025-08-08", type: "Credit", amount: 300, method: "PayPal", status: "Pending" },
    { id: 4, date: "2025-08-12", type: "Debit", amount: 80, method: "Bank Transfer", status: "Failed" },
  ]);

  return (
    <DashboardLayout>
    <div className="">
        <h1 className=" text-3xl font-bold mb-7">Payment History</h1>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Payment History</h1>
          <p className="opacity-90">View all your past payments and transactions.</p>
        </div>

        {/* Payment Table */}
        <div className="mt-10 mb-2">
          <h2 className="text-xl font-bold">Transaction Records</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-[768px] w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                  <th className="p-3">Date</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((pay) => (
                  <tr key={pay.id} className="border-b border-gray-300 last:border-none hover:bg-gray-50">
                    <td className="p-3">{formatDateToMDY(pay.date)}</td>
                    <td className="p-3 flex items-center gap-2">
                      {pay.type === "Credit" ? (
                        <FiArrowDown className="text-green-500" />
                      ) : (
                        <FiArrowUp className="text-red-500" />
                      )}
                      {pay.type}
                    </td>
                    <td className={`p-3 font-semibold ${pay.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                      {pay.type === "Credit" ? "+" : "-"}${pay.amount.toFixed(2)}
                    </td>
                    <td className="p-3">{pay.method}</td>
                    <td
                      className={`p-3 font-semibold ${
                        pay.status === "Completed"
                          ? "text-green-600"
                          : pay.status === "Pending"
                          ? "text-yellow-500"
                          : "text-red-600"
                      }`}
                    >
                      {pay.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    </DashboardLayout>
  );
}
