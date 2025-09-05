"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";

interface Ad {
  id: number;
  title: string;
  type: "classified" | "auction";
  bidsReceived: number;
  views: number;
  status: "active" | "paused" | "expired";
}

interface WatchlistItem {
  id: number;
  title: string;
  type: "product" | "auction";
  price: number;
}

export default function SellingActivity() {
  const [ads, setAds] = useState<Ad[]>([
    { id: 1, title: "Mountain Bike 2025", type: "classified", bidsReceived: 3, views: 120, status: "active" },
    { id: 2, title: "E-Bike Auction", type: "auction", bidsReceived: 5, views: 200, status: "active" },
    { id: 3, title: "Road Bike 2024", type: "classified", bidsReceived: 0, views: 80, status: "paused" },
  ]);

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { id: 1, title: "Electric Scooter", type: "product", price: 500 },
    { id: 2, title: "Vintage Bicycle Auction", type: "auction", price: 150 },
  ]);

  // Pause/Activate ad
  const toggleAdStatus = (id: number) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? {
              ...ad,
              status: ad.status === "active" ? "paused" : "active",
            }
          : ad
      )
    );
  };

  // Remove from watchlist
  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Selling Activity</h1>

      {/* Active Ads */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Ads</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="p-4 bg-white rounded shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{ad.title}</h3>
                <p className="text-sm text-gray-500">Type: {ad.type}</p>
                <p className="text-sm text-gray-500">Bids Received: {ad.bidsReceived}</p>
                <p className="text-sm text-gray-500">Views: {ad.views}</p>
                <p className={`text-sm font-semibold ${ad.status === "active" ? "text-green-600" : "text-yellow-600"}`}>
                  Status: {ad.status}
                </p>
              </div>
              <button
                onClick={() => toggleAdStatus(ad.id)}
                className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {ad.status === "active" ? "Pause Ad" : "Activate Ad"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Watchlist */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-500">No items in your watchlist.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {watchlist.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-500">Type: {item.type}</p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromWatchlist(item.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
}
