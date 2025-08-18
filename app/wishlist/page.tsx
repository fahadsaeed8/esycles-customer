"use client";

import { useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/dashboard-layout";

type WishlistItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Mountain Pro 500X",
      image: "/icons/cycle.png",
      price: 1299,
      inStock: true,
    },
    {
      id: 2,
      name: "City Cruiser Elite",
      image: "/icons/cycle.png",
      price: 899,
      inStock: false,
    },
    {
      id: 3,
      name: "RoadMaster SpeedX",
      image: "/icons/cycle.png",
      price: 1599,
      inStock: true,
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (id: number) => {
    console.log(`Moved item ${id} to cart`);
    removeFromWishlist(id);
  };

  return (
    <DashboardLayout>
      <div className="">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">My Wishlist</h1>

          {wishlist.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 24,
                     duration: 0.9,
                    }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-contain"
                      />
                      {!item.inStock && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-500 mb-4">${item.price}</p>
                      <div className="mt-auto flex gap-2">
                        <button
                          onClick={() => moveToCart(item.id)}
                          className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white px-3 py-2 rounded shadow hover:opacity-90 transition"
                          disabled={!item.inStock}
                        >
                          <FiShoppingCart /> Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="flex cursor-pointer items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded transition"
                        >
                          <FiHeart className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
