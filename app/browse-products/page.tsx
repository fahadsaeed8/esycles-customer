"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";
import DashboardLayout from "@/components/layout/dashboard-layout";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

type CartItem = Product & { quantity: number };

export default function BrowseProductsPage() {
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Mountain Pro 500X",
      price: 1299,
      category: "Mountain",
      image: "/site-icons/cycle.png",
    },
    {
      id: 2,
      name: "City Cruiser Elite",
      price: 899,
      category: "City",
      image: "/site-icons/cycle.png",
    },
    {
      id: 3,
      name: "RoadMaster SpeedX",
      price: 1599,
      category: "Road",
      image: "/site-icons/cycle.png",
    },
    {
      id: 4,
      name: "Urban Comet",
      price: 750,
      category: "City",
      image: "/site-icons/cycle.png",
    },
    {
      id: 5,
      name: "Trail Blazer XT",
      price: 1350,
      category: "Mountain",
      image: "/site-icons/cycle.png",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["All", "Mountain", "City", "Road"];

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // hides after 3 seconds
  };

  const filteredProducts = allProducts.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        showToast(`${product.name} quantity updated in cart`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  type === "inc"
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <DashboardLayout>
      <div className="">
        {toastMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slideIn">
            {toastMessage}
          </div>
        )}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Browse Products</h1>
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>

          {/* Search + Categories */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div
              className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 w-full md:w-1/2
               transition-all duration-300 ease-in-out
               focus-within:shadow-[0_0_8px_rgba(0,0,0,0.1)] focus-within:shadow-green-700 
               focus-within:border-[1px] focus-within:border-green-500 !focus-within:outline-none border-none !outline-none"
            >
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for bicycles..."
                className="outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Buttons */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white shadow"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain transition-transform group-hover:scale-105"
                    />
                    <button
                      onClick={() => addToCart(product)}
                      className="cursor-pointer absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                    >
                      <FiShoppingCart />
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg">{product.name}</h2>
                    <p className="text-gray-500">{product.category} Bike</p>
                    <p className="mt-2 text-xl font-bold">${product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 cursor-pointer w-full bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white py-2 rounded shadow hover:opacity-90 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>

        {/* Cart Modal */}
        {/* Cart Modal */}
        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setIsCartOpen(false)} // close if click on backdrop
          >
            <div
              className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
            >
              <button
                onClick={() => setIsCartOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <FiX size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b border-gray-300 pb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.category} Bike
                        </p>
                        <p className="text-sm font-semibold">
                          ${item.price} × {item.quantity} ={" "}
                          <span className="text-[#f59e0b]">
                            ${item.price * item.quantity}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, "dec")}
                          className="p-1 cursor-pointer rounded-full border border-gray-400 hover:bg-gray-100"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, "inc")}
                          className="p-1 cursor-pointer rounded-full border border-gray-400 hover:bg-gray-100"
                        >
                          <FiPlus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 cursor-pointer rounded-full border hover:bg-red-100 text-red-500"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 text-right font-bold">
                    Total: ${totalAmount}
                  </div>
                  <button
                    className="w-full mt-4 cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white py-2 rounded shadow hover:opacity-90 transition"
                    onClick={() => alert("Proceeding to checkout...")}
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
