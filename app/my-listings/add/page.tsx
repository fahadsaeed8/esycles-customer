"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";

export default function AddNewProduct() {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProductImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New product data:", { ...formData, productImage });
    alert("✅ Product Added Successfully!");
    setFormData({ name: "", category: "", price: "", description: "" });
    setProductImage(null);
  };

  return (
    <DashboardLayout>
    <div className="">
         <h1 className="text-3xl font-bold mb-7">Add New Products</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white p-6">
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-sm opacity-90">
            List your bicycle for sale easily
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="productImage"
              className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              {productImage ? (
                <img
                  src={productImage}
                  alt="Product"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FiCamera className="text-gray-400 text-4xl" />
              )}
              <input
                type="file"
                id="productImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () =>
                      setProductImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Click to upload product image
            </p>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Mountain Bike"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Road Bike, Hybrid"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 299"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your bicycle..."
              rows={4}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-fit cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white py-2 px-8 rounded shadow hover:opacity-90 transition"
          >
            Add Product
          </button>
          </div>
        </form>
      </div>
    </div>
    </DashboardLayout>
  );
}
