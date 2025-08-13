import React from "react";
import DashboardLayout from "../components/layout/dashboard-layout";
import { Package, Star, CreditCard, ShoppingCart, Mail } from "lucide-react";
import Table from "@/components/common/table/page";

const Page = () => {
  const stats = [
    {
      icon: (
        <ShoppingCart
          className="text-blue-500 text-5xl"
          style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.7))" }}
        />
      ),
      value: 12,
      label: "My Orders",
    },
    {
      icon: (
        <Star
          className="text-yellow-500 text-5xl"
          style={{ filter: "drop-shadow(0 0 8px rgba(234,179,8,0.7))" }}
        />
      ),
      value: 8,
      label: "Wishlist",
    },
    {
      icon: (
        <CreditCard
          className="text-green-500 text-5xl"
          style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.7))" }}
        />
      ),
      value: "$150.00",
      label: "Wallet Balance",
    },
    {
      icon: (
        <Package
          className="text-purple-500 text-5xl"
          style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,0.7))" }}
        />
      ),
      value: 5,
      label: "My Listings",
    },
  ];

  type Product = {
    orderId: string;
    product: string;
    date: string;
    status: string;
  };

  const products: Product[] = [
    {
      orderId: "#0012",
      product: "Mountain Bike",
      date: "Aug 12, 2025",
      status: "Delivered",
    },
    {
      orderId: "#0011",
      product: "Helmet",
      date: "Aug 10, 2025",
      status: "Pending",
    },
    {
      orderId: "#0010",
      product: "Electric Scooter",
      date: "Aug 8, 2025",
      status: "Cancelled",
    },
  ];

  const columns: { key: keyof Product; label: string }[] = [
    { key: "orderId", label: "Order ID" },
    { key: "product", label: "Product" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        {/* Page Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Customer Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 rounded-3xl shadow-lg px-5 py-8 w-full
                         bg-gradient-to-tr from-white/90 to-white/60 backdrop-blur-lg border border-gray-200"
            >
              {item.icon}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.value}
                </h2>
                <p className="text-gray-500 text-sm">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-md p-5 overflow-x-auto mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Orders
          </h2>
          <Table columns={columns} data={products} highlightKey="status" />
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Recent Messages
          </h3>
          <ul className="space-y-5">
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-blue-500" />
              <div>
                <p className="font-medium text-gray-800">Vendor Ali</p>
                <p className="text-sm text-gray-500">Your order is shipped.</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-blue-500" />
              <div>
                <p className="font-medium text-gray-800">Tech Hub</p>
                <p className="text-sm text-gray-500">Stock available now.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
