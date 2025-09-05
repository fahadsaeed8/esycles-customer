// "use client";

// import DashboardLayout from "@/components/layout/dashboard-layout";
// import { useState } from "react";

// type AdType = "Classified" | "Auction";

// interface VendorAd {
//   id: number;
//   type: AdType;
//   title: string;
//   description: string;
//   price: number;
//   duration: number; // in days
//   status: "Active" | "Paused" | "Expired";
//   createdAt: string;
// }

// export default function AdDurationSelection() {
//   const [ads, setAds] = useState<VendorAd[]>([
//     {
//       id: 1,
//       type: "Classified",
//       title: "Mountain Bike",
//       description: "Almost new, size M",
//       price: 200,
//       duration: 15,
//       status: "Active",
//       createdAt: "2025-09-01",
//     },
//     {
//       id: 2,
//       type: "Auction",
//       title: "Vintage Bike Auction",
//       description: "Rare collectible",
//       price: 500,
//       duration: 30,
//       status: "Paused",
//       createdAt: "2025-08-25",
//     },
//   ]);

//   const [newAd, setNewAd] = useState<
//     Omit<VendorAd, "id" | "status" | "createdAt">
//   >({
//     type: "Classified",
//     title: "",
//     description: "",
//     price: 0,
//     duration: 1,
//   });

//   const [editingAdId, setEditingAdId] = useState<number | null>(null);

//   const handleAddOrUpdate = () => {
//     if (!newAd.title || !newAd.description) return;

//     if (editingAdId) {
//       setAds((prev) =>
//         prev.map((ad) => (ad.id === editingAdId ? { ...ad, ...newAd } : ad))
//       );
//       setEditingAdId(null);
//     } else {
//       const ad: VendorAd = {
//         ...newAd,
//         id: ads.length + 1,
//         status: "Active",
//         createdAt: new Date().toISOString().split("T")[0],
//       };
//       setAds([...ads, ad]);
//     }

//     setNewAd({
//       type: "Classified",
//       title: "",
//       description: "",
//       price: 0,
//       duration: 1,
//     });
//   };

//   const handleEdit = (ad: VendorAd) => {
//     setEditingAdId(ad.id);
//     setNewAd({
//       type: ad.type,
//       title: ad.title,
//       description: ad.description,
//       price: ad.price,
//       duration: ad.duration,
//     });
//   };

//   const handleDelete = (id: number) => {
//     setAds(ads.filter((ad) => ad.id !== id));
//   };

//   const handleDurationChange = (id: number, duration: number) => {
//     setAds((prev) =>
//       prev.map((ad) => (ad.id === id ? { ...ad, duration } : ad))
//     );
//   };

//   return (
//     <DashboardLayout>
//       <div className="">
//         <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
//           <h1 className="text-2xl font-bold mb-6">Ad Duration Selection</h1>

//           {/* Form to Add/Edit Ad */}
//           <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-3">
//             <h2 className="font-semibold">
//               {editingAdId ? "Edit Ad" : "Create New Ad"}
//             </h2>

//             <div className="flex flex-col md:flex-row gap-4">
//               <select
//                 value={newAd.type}
//                 onChange={(e) =>
//                   setNewAd({ ...newAd, type: e.target.value as AdType })
//                 }
//                 className="border rounded px-3 py-2 flex-1 focus:outline-none"
//               >
//                 <option value="Classified">Classified</option>
//                 <option value="Auction">Auction</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={newAd.title}
//                 onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
//                 className="border rounded px-3 py-2 flex-1 focus:outline-none"
//               />

//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={newAd.price}
//                 onChange={(e) =>
//                   setNewAd({ ...newAd, price: Number(e.target.value) })
//                 }
//                 className="border rounded px-3 py-2 w-32 focus:outline-none"
//               />

//               <select
//                 value={newAd.duration}
//                 onChange={(e) =>
//                   setNewAd({ ...newAd, duration: Number(e.target.value) })
//                 }
//                 className="border rounded px-3 py-2 w-32 focus:outline-none"
//               >
//                 {[1, 3, 7, 15, 30, 60, 90].map((d) => (
//                   <option key={d} value={d}>
//                     {d} day{d > 1 ? "s" : ""}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <textarea
//               placeholder="Description"
//               value={newAd.description}
//               onChange={(e) =>
//                 setNewAd({ ...newAd, description: e.target.value })
//               }
//               className="border rounded px-3 py-2 w-full focus:outline-none resize-none"
//             />

//             <button
//               onClick={handleAddOrUpdate}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               {editingAdId ? "Update Ad" : "Add Ad"}
//             </button>
//           </div>

//           {/* Ads List */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-600 text-sm">
//                   <th className="p-3 border-b">ID</th>
//                   <th className="p-3 border-b">Type</th>
//                   <th className="p-3 border-b">Title</th>
//                   <th className="p-3 border-b">Price</th>
//                   <th className="p-3 border-b">Duration</th>
//                   <th className="p-3 border-b">Status</th>
//                   <th className="p-3 border-b">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {ads.map((ad) => (
//                   <tr key={ad.id} className="hover:bg-gray-50 text-sm">
//                     <td className="p-3 border-b">{ad.id}</td>
//                     <td className="p-3 border-b">{ad.type}</td>
//                     <td className="p-3 border-b">{ad.title}</td>
//                     <td className="p-3 border-b">${ad.price}</td>
//                     <td className="p-3 border-b">
//                       <select
//                         value={ad.duration}
//                         onChange={(e) =>
//                           handleDurationChange(ad.id, Number(e.target.value))
//                         }
//                         className="border rounded px-2 py-1 focus:outline-none"
//                       >
//                         {[1, 3, 7, 15, 30, 60, 90].map((d) => (
//                           <option key={d} value={d}>
//                             {d} day{d > 1 ? "s" : ""}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td
//                       className={`p-3 border-b font-medium ${
//                         ad.status === "Active"
//                           ? "text-green-600"
//                           : ad.status === "Paused"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {ad.status}
//                     </td>
//                     <td className="p-3 border-b flex gap-2">
//                       <button
//                         onClick={() => handleEdit(ad)}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(ad.id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {ads.length === 0 && (
//                   <tr>
//                     <td colSpan={7} className="p-4 text-center text-gray-500">
//                       No ads available.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }





"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { motion } from "framer-motion";

type AdType = "Classified" | "Auction";

interface CustomerAd {
  id: number;
  type: AdType;
  title: string;
  description: string;
  price: number;
  duration: number; // in days
  status: "Active" | "Expired" | "Paused";
  createdAt: string;
}

export default function PersonalAdManagement() {
  const [ads, setAds] = useState<CustomerAd[]>([
   {
      id: 1,
      type: "Classified",
      title: "Mountain Bike",
      description: "Almost new, size M",
      price: 200,
      duration: 15,
      status: "Active",
      createdAt: "2025-09-01",
    },
    {
      id: 2,
      type: "Auction",
      title: "Vintage Bike Auction",
      description: "Rare collectible",
      price: 500,
      duration: 30,
      status: "Paused",
      createdAt: "2025-08-25",
    },
  ]);

  const [newAd, setNewAd] = useState<Omit<CustomerAd, "id" | "status" | "createdAt">>({
    type: "Classified",
    title: "",
    description: "",
    price: 0,
    duration: 1,
  });

  const [editingAdId, setEditingAdId] = useState<number | null>(null);

  const handleAddOrEditAd = () => {
    if (!newAd.title || !newAd.description) return;

    if (editingAdId) {
      setAds((prev) =>
        prev.map((ad) =>
          ad.id === editingAdId ? { ...ad, ...newAd } : ad
        )
      );
      setEditingAdId(null);
    } else {
      const ad: CustomerAd = {
        ...newAd,
        id: ads.length + 1,
        status: "Active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setAds([...ads, ad]);
    }

    setNewAd({
      type: "Classified",
      title: "",
      description: "",
      price: 0,
      duration: 1,
    });
  };

  const handleEdit = (ad: CustomerAd) => {
    setEditingAdId(ad.id);
    setNewAd({
      type: ad.type,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      duration: ad.duration,
    });
  };

  const handleDelete = (id: number) => {
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const handleRenew = (id: number) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? { ...ad, status: "Active", createdAt: new Date().toISOString().split("T")[0] }
          : ad
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Ad Duration Selection</h1>

        {/* Ad Form */}
        <div className=" bg-white p-4 rounded-lg mb-6 space-y-3">
          <h2 className="font-semibold">{editingAdId ? "Edit Ad" : "Create New Ad"}</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={newAd.type}
              onChange={(e) => setNewAd({ ...newAd, type: e.target.value as AdType })}
              className="border border-[#f6a01e] rounded px-3 py-2 flex-1 focus:outline-none"
            >
              <option value="Classified">Classified</option>
              <option value="Auction">Auction</option>
            </select>

            <input
              type="text"
              placeholder="Title"
              value={newAd.title}
              onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
              className="border border-[#f6a01e] rounded px-3 py-2 flex-1 focus:outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={newAd.price}
              onChange={(e) => setNewAd({ ...newAd, price: Number(e.target.value) })}
              className="border border-[#f6a01e] rounded px-3 py-2 w-32 focus:outline-none"
            />

            <select
              value={newAd.duration}
              onChange={(e) => setNewAd({ ...newAd, duration: Number(e.target.value) })}
              className="border border-[#f6a01e] rounded px-3 py-2 w-32 focus:outline-none"
            >
              {[1, 3, 7, 15, 30, 60, 90].map((d) => (
                <option key={d} value={d}>{d} day{d > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Description"
            value={newAd.description}
            onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
            className="border border-[#f6a01e] rounded px-3 py-2 w-full focus:outline-none resize-none"
          />

          <button
            onClick={handleAddOrEditAd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingAdId ? "Update Ad" : "Add Ad"}
          </button>
        </div>

        {/* Ads Table for Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad, i) => (
                <motion.tr
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-300 last:border-none hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{ad.id}</td>
                  <td className="py-3 px-4">{ad.type}</td>
                  <td className="py-3 px-4">{ad.title}</td>
                  <td className="py-3 px-4 font-semibold">${ad.price}</td>
                  <td className="py-3 px-4">{ad.duration} day{ad.duration > 1 ? "s" : ""}</td>
                  <td className={`py-3 px-4 font-medium ${
                    ad.status === "Active" ? "text-green-600" :
                    ad.status === "Paused" ? "text-yellow-600" :
                    "text-red-600"
                  }`}>{ad.status}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(ad)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    {ad.status === "Expired" && (
                      <button
                        onClick={() => handleRenew(ad.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Renew
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
              {ads.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No ads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {ads.map((ad, i) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{ad.title}</h2>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  ad.status === "Active" ? "bg-green-100 text-green-600" :
                  ad.status === "Paused" ? "bg-yellow-100 text-yellow-600" :
                  "bg-red-100 text-red-600"
                }`}>{ad.status}</span>
              </div>
              <p className="text-sm text-gray-500">Type: {ad.type}</p>
              <p className="mt-1 text-sm text-gray-500">{ad.description}</p>
              <p className="mt-1 font-semibold">${ad.price}</p>
              <p className="mt-1 text-gray-500">{ad.duration} day{ad.duration > 1 ? "s" : ""}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                <button
                  onClick={() => handleEdit(ad)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                {ad.status === "Expired" && (
                  <button
                    onClick={() => handleRenew(ad.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Renew
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
