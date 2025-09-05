// "use client";

// import DashboardLayout from "@/components/layout/dashboard-layout";
// import { useState } from "react";

// interface Ad {
//   id: number;
//   title: string;
//   views: number;
//   clicks: number;
//   inquiries: number;
//   promoted: boolean;
//   promotedType?: "highlight" | "top" | "racing";
//   bidsReceived: number;
//   competitorOffers: number;
// }

// export default function AdPerformancePanel() {
//   const [ads, setAds] = useState<Ad[]>([
//     {
//       id: 1,
//       title: "Used Mountain Bike",
//       views: 150,
//       clicks: 45,
//       inquiries: 10,
//       promoted: false,
//       bidsReceived: 3,
//       competitorOffers: 2,
//     },
//     {
//       id: 2,
//       title: "Road Bike Auction",
//       views: 200,
//       clicks: 75,
//       inquiries: 20,
//       promoted: true,
//       promotedType: "highlight",
//       bidsReceived: 5,
//       competitorOffers: 4,
//     },
//     {
//       id: 3,
//       title: "Bike Accessories",
//       views: 120,
//       clicks: 30,
//       inquiries: 5,
//       promoted: false,
//       bidsReceived: 1,
//       competitorOffers: 0,
//     },
//   ]);

//   const handlePromote = (id: number, type: "highlight" | "top" | "racing") => {
//     setAds((prev) =>
//       prev.map((ad) =>
//         ad.id === id
//           ? { ...ad, promoted: true, promotedType: type }
//           : ad
//       )
//     );
//   };

//   const handleRemovePromotion = (id: number) => {
//     setAds((prev) =>
//       prev.map((ad) =>
//         ad.id === id ? { ...ad, promoted: false, promotedType: undefined } : ad
//       )
//     );
//   };

//   return (
//     <DashboardLayout>
//       <div className="">
//         <h2 className="text-2xl font-bold mb-6">Ad Performance & Visibility</h2>

//         <div className="overflow-x-auto bg-white rounded shadow p-4">
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-4 py-2 text-left">Ad Title</th>
//                 <th className="px-4 py-2 text-center">Views</th>
//                 <th className="px-4 py-2 text-center">Clicks</th>
//                 <th className="px-4 py-2 text-center">Inquiries</th>
//                 <th className="px-4 py-2 text-center">Bids Received</th>
//                 <th className="px-4 py-2 text-center">Competitor Offers</th>
//                 <th className="px-4 py-2 text-center">Promotion</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ads.map((ad) => (
//                 <tr key={ad.id} className="border-b">
//                   <td className="px-4 py-2">{ad.title}</td>
//                   <td className="px-4 py-2 text-center">{ad.views}</td>
//                   <td className="px-4 py-2 text-center">{ad.clicks}</td>
//                   <td className="px-4 py-2 text-center">{ad.inquiries}</td>
//                   <td className="px-4 py-2 text-center">{ad.bidsReceived}</td>
//                   <td className="px-4 py-2 text-center">{ad.competitorOffers}</td>
//                   <td className="px-4 py-2 text-center space-x-1">
//                     {ad.promoted ? (
//                       <>
//                         <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
//                           {ad.promotedType?.toUpperCase()}
//                         </span>
//                         <button
//                           onClick={() => handleRemovePromotion(ad.id)}
//                           className="ml-2 text-red-500 text-sm hover:underline"
//                         >
//                           Remove
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => handlePromote(ad.id, "highlight")}
//                           className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
//                         >
//                           Highlight
//                         </button>
//                         <button
//                           onClick={() => handlePromote(ad.id, "top")}
//                           className="bg-purple-500 text-white text-xs px-2 py-1 rounded hover:bg-purple-600"
//                         >
//                           Top
//                         </button>
//                         <button
//                           onClick={() => handlePromote(ad.id, "racing")}
//                           className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
//                         >
//                           Racing
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }


"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUp, FiArrowDown, FiStar } from "react-icons/fi";

interface Ad {
  id: number;
  title: string;
  views: number;
  clicks: number;
  inquiries: number;
  promoted: boolean;
  promotedType?: "highlight" | "top" | "racing";
  bidsReceived: number;
  competitorOffers: number;
}

export default function AdPerformancePanel() {
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 1,
      title: "Used Mountain Bike",
      views: 150,
      clicks: 45,
      inquiries: 10,
      promoted: false,
      bidsReceived: 3,
      competitorOffers: 2,
    },
    {
      id: 2,
      title: "Road Bike Auction",
      views: 200,
      clicks: 75,
      inquiries: 20,
      promoted: true,
      promotedType: "highlight",
      bidsReceived: 5,
      competitorOffers: 4,
    },
    {
      id: 3,
      title: "Bike Accessories",
      views: 120,
      clicks: 30,
      inquiries: 5,
      promoted: false,
      bidsReceived: 1,
      competitorOffers: 0,
    },
  ]);

  const handlePromote = (id: number, type: "highlight" | "top" | "racing") => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? { ...ad, promoted: true, promotedType: type }
          : ad
      )
    );
  };

  const handleRemovePromotion = (id: number) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, promoted: false, promotedType: undefined } : ad
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Ad Performance & Visibility
        </h1>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Ad Title</th>
                <th className="py-3 px-4 text-left">Views</th>
                <th className="py-3 px-4 text-left">Clicks</th>
                <th className="py-3 px-4 text-left">Inquiries</th>
                <th className="py-3 px-4 text-left">Bids Received</th>
                <th className="py-3 px-4 text-left">Competitor Offers</th>
                <th className="py-3 px-4 text-left">Promotion</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad, i) => (
                <motion.tr
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-300 last:border-none"
                >
                  <td className="py-3 px-4">{ad.title}</td>
                  <td className="py-3 px-4">{ad.views}</td>
                  <td className="py-3 px-4">{ad.clicks}</td>
                  <td className="py-3 px-4">{ad.inquiries}</td>
                  <td className="py-3 px-4">{ad.bidsReceived}</td>
                  <td className="py-3 px-4">{ad.competitorOffers}</td>
                  <td className="py-3 px-4 space-x-2">
                    {ad.promoted ? (
                      <>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                          <FiStar /> {ad.promotedType?.toUpperCase()}
                        </span>
                        <button
                          onClick={() => handleRemovePromotion(ad.id)}
                          className="ml-2 text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handlePromote(ad.id, "highlight")}
                          className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Highlight
                        </button>
                        <button
                          onClick={() => handlePromote(ad.id, "top")}
                          className="bg-purple-500 text-white text-xs px-2 py-1 rounded hover:bg-purple-600"
                        >
                          Top
                        </button>
                        <button
                          onClick={() => handlePromote(ad.id, "racing")}
                          className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Racing
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
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
                {ad.promoted && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                    <FiStar /> {ad.promotedType?.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Views: {ad.views} | Clicks: {ad.clicks} | Inquiries: {ad.inquiries}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Bids: {ad.bidsReceived} | Competitor Offers: {ad.competitorOffers}
              </p>
              {!ad.promoted && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handlePromote(ad.id, "highlight")}
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Highlight
                  </button>
                  <button
                    onClick={() => handlePromote(ad.id, "top")}
                    className="bg-purple-500 text-white text-xs px-2 py-1 rounded hover:bg-purple-600"
                  >
                    Top
                  </button>
                  <button
                    onClick={() => handlePromote(ad.id, "racing")}
                    className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Racing
                  </button>
                </div>
              )}
              {ad.promoted && (
                <button
                  onClick={() => handleRemovePromotion(ad.id)}
                  className="mt-2 text-red-500 text-sm hover:underline"
                >
                  Remove Promotion
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
