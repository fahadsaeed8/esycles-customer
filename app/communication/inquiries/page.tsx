"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";

interface Inquiry {
  id: number;
  adTitle: string;
  from: string;
  message: string;
  type: "inquiry" | "counter" | "bulk";
  status: "pending" | "accepted" | "rejected";
}

export default function CustomerInquiriesPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 1,
      adTitle: "Used Mountain Bike",
      from: "Vendor A",
      message: "Hi, can you accept 5 units for $450 each?",
      type: "counter",
      status: "pending",
    },
    {
      id: 2,
      adTitle: "Road Bike Auction",
      from: "Vendor B",
      message: "Is your bid still valid for 2 units?",
      type: "inquiry",
      status: "pending",
    },
    {
      id: 3,
      adTitle: "Bike Accessories Bulk Deal",
      from: "Vendor C",
      message: "Can you accept a bulk order of 20 units?",
      type: "bulk",
      status: "pending",
    },
  ]);

  const [replyMessage, setReplyMessage] = useState<string>("");

  const handleReply = (id: number) => {
    if (!replyMessage.trim()) return;
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? {
              ...inq,
              message: `${inq.message}\nCustomer replied: ${replyMessage}`,
              status: "accepted",
            }
          : inq
      )
    );
    setReplyMessage("");
  };

  const handleAccept = (id: number) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: "accepted" } : inq))
    );
  };

  const handleReject = (id: number) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: "rejected" } : inq))
    );
  };

  return (
    <DashboardLayout>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Inquiries & Counter-Offers</h2>
      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{inq.adTitle}</h3>
                <p className="text-sm text-gray-600">From: {inq.from}</p>
                <p className="mt-2 whitespace-pre-line">{inq.message}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Status:{" "}
                  <span
                    className={`${
                      inq.status === "pending"
                        ? "text-yellow-600"
                        : inq.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    } font-semibold`}
                  >
                    {inq.status}
                  </span>
                </p>
              </div>
              <div className="space-x-2 flex-shrink-0">
                {inq.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(inq.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(inq.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Reply Section */}
            {inq.status === "pending" && (
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 border rounded px-3 py-2 focus:outline-none"
                />
                <button
                  onClick={() => handleReply(inq.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </DashboardLayout>
  );
}
