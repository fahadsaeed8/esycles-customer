"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { formatDateToMDY } from "@/utils/dateFormatter";

interface Bid {
  id: number;
  adTitle: string;
  bidAmount: number;
  status: "pending" | "accepted" | "rejected";
  date: string;
}

interface Offer {
  id: number;
  adTitle: string;
  offerAmount: number;
  status: "pending" | "accepted" | "rejected";
  date: string;
}

interface Purchase {
  id: number;
  product: string;
  price: number;
  quantity: number;
  date: string;
  status: "delivered" | "processing" | "cancelled";
}

export default function BuyingActivity() {
  const [bids, setBids] = useState<Bid[]>([
    { id: 1, adTitle: "Mountain Bike 2025", bidAmount: 300, status: "pending", date: "2025-09-01" },
    { id: 2, adTitle: "E-Bike Auction", bidAmount: 450, status: "accepted", date: "2025-09-02" },
  ]);

  const [offers, setOffers] = useState<Offer[]>([
    { id: 1, adTitle: "Vintage Bicycle", offerAmount: 150, status: "pending", date: "2025-09-03" },
    { id: 2, adTitle: "Electric Scooter", offerAmount: 500, status: "rejected", date: "2025-09-01" },
  ]);

  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: 1, product: "Mountain Bike 2025", price: 300, quantity: 1, date: "2025-08-28", status: "delivered" },
    { id: 2, product: "E-Bike Auction", price: 450, quantity: 1, date: "2025-09-02", status: "processing" },
  ]);

  const statusColors = {
    pending: "bg-yellow-200 text-yellow-800",
    accepted: "bg-green-200 text-green-800",
    rejected: "bg-red-200 text-red-800",
    delivered: "bg-green-200 text-green-800",
    processing: "bg-blue-200 text-blue-800",
    cancelled: "bg-red-200 text-red-800",
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Buying Activity</h1>

      {/* Bids Placed */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Bids Placed</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {bids.map((bid) => (
            <div key={bid.id} className="p-4 bg-white rounded shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{bid.adTitle}</h3>
                <p className="text-sm text-gray-500">Bid Amount: ${bid.bidAmount}</p>
                <p className={`inline-block mt-2 px-2 py-1 rounded text-sm font-semibold ${statusColors[bid.status]}`}>
                  Status: {bid.status}
                </p>
                <p className="text-sm text-gray-400 mt-1">Date: {formatDateToMDY(bid.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Made */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Offers Made</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.id} className="p-4 bg-white rounded shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{offer.adTitle}</h3>
                <p className="text-sm text-gray-500">Offer Amount: ${offer.offerAmount}</p>
                <p className={`inline-block mt-2 px-2 py-1 rounded text-sm font-semibold ${statusColors[offer.status]}`}>
                  Status: {offer.status}
                </p>
                <p className="text-sm text-gray-400 mt-1">Date: {formatDateToMDY(offer.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchases History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="p-4 bg-white rounded shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{purchase.product}</h3>
                <p className="text-sm text-gray-500">Price: ${purchase.price}</p>
                <p className="text-sm text-gray-500">Quantity: {purchase.quantity}</p>
                <p className={`inline-block mt-2 px-2 py-1 rounded text-sm font-semibold ${statusColors[purchase.status]}`}>
                  Status: {purchase.status}
                </p>
                <p className="text-sm text-gray-400 mt-1">Date: {formatDateToMDY(purchase.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
