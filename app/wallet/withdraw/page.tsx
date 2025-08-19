"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function WithdrawFunds() {
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // ✅ Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      amount: "",
      method: "",
      accountDetails: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Amount is required")
        .min(1, "Amount must be greater than 0"),
      method: Yup.string().required("Withdrawal method is required"),
      accountDetails: Yup.string().required("Account details are required"),
    }),
    onSubmit: (values) => {
      console.log("Form Data Submitted:", values);
      setSubmittedData(values);
      setShowModal(true);
    },
  });

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
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  min="1"
                  {...formik.getFieldProps("amount")}
                  placeholder="Enter amount to withdraw"
                  className="w-full border border-gray-300 rounded p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                />
                {formik.touched.amount && formik.errors.amount ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.amount}</p>
                ) : null}
              </div>

              {/* Method */}
              <div>
                <label className="block text-sm font-medium mb-1">Withdrawal Method</label>
                <select
                  {...formik.getFieldProps("method")}
                  className="w-full border border-gray-300 rounded p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <option value="">Select Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Crypto">Crypto (USDT, BTC)</option>
                </select>
                {formik.touched.method && formik.errors.method ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.method}</p>
                ) : null}
              </div>

              {/* Account Details */}
              <div>
                <label className="block text-sm font-medium mb-1">Account Details</label>
                <textarea
                  {...formik.getFieldProps("accountDetails")}
                  placeholder="Enter bank account, PayPal email, or crypto wallet address"
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                ></textarea>
                {formik.touched.accountDetails && formik.errors.accountDetails ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.accountDetails}</p>
                ) : null}
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
        {showModal && submittedData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-2">Confirm Withdrawal</h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to withdraw{" "}
                <span className="font-semibold">${submittedData.amount}</span> via{" "}
                <span className="font-semibold">{submittedData.method}</span>?
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
