"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";

export default function WithdrawFunds() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !method || !accountDetails) {
      alert("Please fill in all fields before withdrawing.");
      return;
    }
    setShowModal(true);
  };

  return (
    <DashboardLayout>
    <div className="">
        <h1 className=" text-3xl font-bold mb-7">Withdraw Funds</h1>
      <div className="max-w-3xl mx-auto ">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white p-6 rounded-lg shadow-md my-7">
          <h1 className="text-2xl font-bold">Withdraw Funds</h1>
          <p className="opacity-90">Request to withdraw your available balance.</p>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center my-7">
          <p className="text-gray-500">Current Wallet Balance</p>
          <h2 className="text-3xl font-bold text-[#f59e0b]">$1,250.00</h2>
        </div>

        {/* Withdraw Form */}
        <div className="mb-2">
          <h2 className="text-xl font-bold">Withdrawal Details</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to withdraw"
                className="w-full border border-gray-300 rounded p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Withdrawal Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <option value="">Select Method</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="Crypto">Crypto (USDT, BTC)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Account Details</label>
              <textarea
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder="Enter bank account, PayPal email, or crypto wallet address"
                rows={3}
                className="w-full border border-gray-300 rounded p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white px-6 py-2 rounded shadow hover:opacity-90 transition w-fit"
            >
              Request Withdrawal
            </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Confirm Withdrawal</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to withdraw <span className="font-semibold">${amount}</span> via <span className="font-semibold">{method}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 cursor-pointer bg-gray-200 rounded hover:bg-gray-300 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white rounded shadow hover:opacity-90"
                onClick={() => {
                  setShowModal(false);
                  alert("Withdrawal request submitted successfully!");
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
}
