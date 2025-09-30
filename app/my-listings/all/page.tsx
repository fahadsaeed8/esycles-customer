"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { FiEdit, FiTrash2, FiEye, FiSearch, FiX } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  status: "Available" | "Sold";
};

export default function AllMyProducts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Mountain Bike",
      price: 500,
      image: "/site-icons/cycle.png",
      status: "Available",
    },
    {
      id: 2,
      name: "Road Bike",
      price: 750,
      image: "/site-icons/cycle.png",
      status: "Sold",
    },
    {
      id: 3,
      name: "BMX Bike",
      price: 300,
      image: "/site-icons/cycle.png",
      status: "Available",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEditSave = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setModalType(null);
    setSelectedProduct(null);
  };

  return (
    <DashboardLayout>
      <div className="">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All My Products</h1>
          <div className="flex items-center gap-2 mt-4 md:mt-0 ">
            <div
              className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm  transition-all duration-300 ease-in-out
               focus-within:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus-within:shadow-green-700 
               focus-within:border-[1px] focus-within:border-green-500"
            >
              <FiSearch className="ml-2 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-2 outline-none "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-contain"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-500">${product.price}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                      product.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.status}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="flex items-center cursor-pointer gap-1 text-blue-500 hover:text-blue-700 transition"
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalType("edit");
                      }}
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      className="flex items-center cursor-pointer gap-1 text-red-500 hover:text-red-700 transition"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                    <button
                      className="flex items-center cursor-pointer gap-1 text-gray-500 hover:text-gray-700 transition"
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalType("view");
                      }}
                    >
                      <FiEye /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}

        {/* View Modal */}
        {modalType === "view" && selectedProduct && (
          <Modal onClose={() => setModalType(null)}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedProduct.name}
              </h2>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-contain rounded"
              />
              <p className="mt-4 text-gray-600">
                Price: ${selectedProduct.price}
              </p>
              <p>Status: {selectedProduct.status}</p>
            </div>
          </Modal>
        )}

        {/* Edit Modal */}
        {modalType === "edit" && selectedProduct && (
          <Modal onClose={() => setModalType(null)}>
            <EditProductForm
              product={selectedProduct}
              onSave={handleEditSave}
              onCancel={() => setModalType(null)}
            />
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ---------------------- Modal Component ---------------------- */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // close modal if click is on backdrop
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <button
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ---------------------- Edit Form Component ---------------------- */
function EditProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(product);

  return (
    <form
      className="p-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
    >
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <input
        type="text"
        className="border border-gray-300 w-full p-2 rounded focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        className="border border-gray-300 w-full p-2 rounded focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />
      <select
        className="border border-gray-300 w-full p-2 rounded focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
        value={formData.status}
        onChange={(e) =>
          setFormData({
            ...formData,
            status: e.target.value as "Available" | "Sold",
          })
        }
      >
        <option value="Available">Available</option>
        <option value="Sold">Sold</option>
      </select>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="px-4 cursor-pointer py-2 border border-gray-300 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 cursor-pointer rounded text-white bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706]"
        >
          Save
        </button>
      </div>
    </form>
  );
}
