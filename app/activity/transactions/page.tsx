"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState, useRef, useEffect } from "react";
import { formatDateToMDY } from "@/utils/dateFormatter";

interface Transaction {
  id: number;
  product: string;
  type: "purchase" | "refund" | "bid";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface Message {
  id: number;
  sender: "customer" | "vendor";
  text: string;
  time: string;
}

export default function TransactionCommunicationHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, product: "Mountain Bike 2025", type: "purchase", amount: 300, date: "2025-09-01", status: "completed" },
    { id: 2, product: "Electric Scooter", type: "bid", amount: 450, date: "2025-09-02", status: "pending" },
    { id: 3, product: "Vintage Bicycle", type: "refund", amount: 150, date: "2025-09-03", status: "completed" },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "vendor", text: "Your order has been shipped.", time: "2025-09-01 10:00 AM" },
    { id: 2, sender: "customer", text: "Thank you, please provide tracking info.", time: "2025-09-01 10:05 AM" },
    { id: 3, sender: "vendor", text: "Tracking number: ES12345", time: "2025-09-01 10:10 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const statusColors = {
    completed: "bg-green-200 text-green-800",
    pending: "bg-yellow-200 text-yellow-800",
    failed: "bg-red-200 text-red-800",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: messages.length + 1,
      sender: "customer",
      text: newMessage,
      time: new Date().toLocaleString(),
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <DashboardLayout>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Transaction & Communication History</h1>

      {/* Transactions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {transactions.map((txn) => (
            <div key={txn.id} className="p-4 bg-white rounded shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{txn.product}</h3>
                <p className="text-sm text-gray-500">Type: {txn.type}</p>
                <p className="text-sm text-gray-500">Amount: ${txn.amount}</p>
                <p className={`inline-block mt-2 px-2 py-1 rounded text-sm font-semibold ${statusColors[txn.status]}`}>
                  Status: {txn.status}
                </p>
                <p className="text-sm text-gray-400 mt-1">Date: {formatDateToMDY(txn.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Communication / Messages */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="flex flex-col bg-white rounded shadow p-4 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex mb-2 ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  msg.sender === "customer" ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-400 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={1}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
