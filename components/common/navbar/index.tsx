"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import NotificationPopUp from "../../popup/notification-popup";
import ProfilePopUp from "../../popup/profile-popup";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Mock product list (you can replace this with API data)
  const products = [
    { id: 1, name: "Mountain Bike" },
    { id: 2, name: "Electric Scooter" },
    { id: 3, name: "Road Bicycle" },
    { id: 4, name: "Helmet" },
    { id: 5, name: "Bike Gloves" },
    { id: 6, name: "Racing Cycle" },
    { id: 7, name: "Kids Bicycle" },
    { id: 8, name: "Scooter Accessories" },
    { id: 9, name: "Biker Jacket" },
    { id: 10, name: "Sports Shoes" },
  ];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Mobile Search Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="absolute top-3 left-4 right-4 bg-white shadow-2xl p-2 rounded flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex">
              <input
                type="text"
                placeholder="What are you looking for"
                className="flex-1 px-3 py-2 text-sm text-black outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="bg-[#febd69] px-3 flex items-center justify-center cursor-pointer"
                onClick={() => setShowSearch(false)}
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* Search Results (Mobile) */}
            {search && (
              <ul className="mt-2 bg-white rounded shadow max-h-60 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 border-b last:border-none text-black hover:bg-gray-100 cursor-pointer"
                    >
                      <Link
                        href="/browse-products"
                        onClick={() => setShowSearch(false)}
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500 text-sm">
                    No products found
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="w-full bg-[#283a52] shadow-md px-4 py-2 flex items-center justify-between text-white relative">
        {/* Left Section - Mobile Search Button */}
        <div className="flex items-center gap-2 pl-7 lg:pl-0">
          <h3 className="text-base cursor-pointer lg:text-lg font-medium text-white">
            <Link href={'/'}>
            Dashboard
            </Link>
          </h3>
          <button onClick={() => setShowSearch(true)} className="lg:hidden p-1">
            <Search size={20} />
          </button>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-6 relative">
          <div className="flex border border-[#febd69] overflow-hidden bg-white w-full">
            <input
              type="text"
              placeholder="What are you looking for"
              className="flex-1 px-3 py-1.5 text-sm text-black outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#febd69] px-3 flex items-center justify-center cursor-pointer">
              <Search size={16} className="text-black" />
            </button>
          </div>

          {/* Search Results (Desktop) */}
          {search && (
            <ul className="absolute top-11 left-0 w-full bg-white rounded shadow max-h-60 overflow-y-auto z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="p-2 border-b last:border-none text-black hover:bg-gray-100 cursor-pointer"
                  >
                    <Link href="/browse-products">{product.name}</Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500 text-sm">
                  No products found
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Right Section - Notification + Profile */}
        <div className="flex items-center gap-4">
          <NotificationPopUp />
          <ProfilePopUp />
        </div>
      </div>
    </>
  );
}
