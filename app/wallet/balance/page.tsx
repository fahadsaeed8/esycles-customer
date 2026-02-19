"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { FiPlus, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { formatDateToMDY } from "@/utils/dateFormatter";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function WalletBalance() {
  const [balance, setBalance] = useState(250.75);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Credit", amount: 100, date: "2025-08-01", method: "Credit Card" },
    { id: 2, type: "Debit", amount: 50, date: "2025-08-05", method: "Purchase" },
    { id: 3, type: "Credit", amount: 200, date: "2025-08-10", method: "PayPal" },
  ]);

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    paymentMethod: Yup.string().required("Payment method is required"),
    transactionId: Yup.string().required("Transaction ID is required"),
    amount: Yup.number().positive("Amount must be greater than 0").required("Amount is required"),
  });

  return (
    <DashboardLayout>
      <div className="">
        <h1 className=" text-3xl font-bold mb-7">MY Wallet</h1>
        <div className="max-w-5xl mx-auto">
          {/* Wallet Card */}
          <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Wallet Balance</h1>
              <p className="text-4xl font-semibold mt-2">${balance.toFixed(2)}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 md:mt-0 cursor-pointer bg-white text-gray-800 px-5 py-2 rounded shadow flex items-center gap-2 hover:opacity-90 transition"
            >
              <FiPlus /> Add Funds
            </button>
          </div>

          {/* Transaction History */}
          <div className="mt-10 mb-2">
            <h2 className="text-xl font-bold">Transaction History</h2>
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
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b last:border-none border-gray-300 hover:bg-gray-50"
                    >
                      <td className="p-3">{formatDateToMDY(tx.date)}</td>
                      <td className="p-3 flex items-center gap-2">
                        {tx.type === "Credit" ? (
                          <FiArrowDown className="text-green-500" />
                        ) : (
                          <FiArrowUp className="text-red-500" />
                        )}
                        {tx.type}
                      </td>
                      <td
                        className={`p-3 font-semibold ${
                          tx.type === "Credit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {tx.type === "Credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                      </td>
                      <td className="p-3">{tx.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Funds Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)} // close when clicking outside
            >
              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
              >
                <h2 className="text-xl font-semibold mb-4">Add Funds</h2>

                <Formik
                  initialValues={{
                    paymentMethod: "Credit Card",
                    transactionId: "",
                    amount: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    const amt = parseFloat(values.amount as unknown as string);

                    console.log("💰 Add Funds Data:", values); // ✅ log to console

                    setBalance(balance + amt);
                    setTransactions([
                      {
                        id: transactions.length + 1,
                        type: "Credit",
                        amount: amt,
                        date: new Date().toISOString().split("T")[0],
                        method: values.paymentMethod,
                      },
                      ...transactions,
                    ]);

                    resetForm();
                    setIsModalOpen(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      {/* Payment Method */}
                      <Field
                        as="select"
                        name="paymentMethod"
                        className="border border-gray-300 rounded p-2 w-full focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                      >
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Bank Transfer</option>
                      </Field>
                      <ErrorMessage
                        name="paymentMethod"
                        component="p"
                        className="text-red-500 text-sm"
                      />

                      {/* Transaction ID */}
                      <Field
                        type="text"
                        name="transactionId"
                        placeholder="Transaction ID / Reference No."
                        className="border border-gray-300 rounded p-2 w-full focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                      />
                      <ErrorMessage
                        name="transactionId"
                        component="p"
                        className="text-red-500 text-sm"
                      />

                      {/* Amount */}
                      <Field
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        className="border border-gray-300 rounded p-2 w-full focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                      />
                      <ErrorMessage
                        name="amount"
                        component="p"
                        className="text-red-500 text-sm"
                      />

                      {/* Buttons */}
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 cursor-pointer rounded border border-gray-300 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white px-5 py-2 rounded hover:opacity-90"
                        >
                          {isSubmitting ? "Adding..." : "Add Funds"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
