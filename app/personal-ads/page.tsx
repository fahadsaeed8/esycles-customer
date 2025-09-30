"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  MapPin,
  Calendar,
  Tag,
  Eye,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getAuctionAdsAPI, getClassifiedAdsAPI } from "@/services/api";
import DashboardLayout from "@/components/layout/dashboard-layout";
import LeafMapSection from "@/components/sections/leaf-map-section";

type Ad = {
  _id: string;
  title: string;
  price?: number;
  buyNowPrice?: number;
  location?: string;
  category: string;
  status: string;
  images: string[];
  views: number;
  calls: number;
  chats: number;
  createdAt: string;
  adType: "classified" | "auction";
};

export default function SellerAdsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("id");
  const initialType =
    (searchParams.get("type") as "classified" | "auction" | "mapAd") ||
    "classified";

  const [activeTab, setActiveTab] = useState<
    "classified" | "auction" | "mapAd"
  >(initialType);
  const [highlightedAd, setHighlightedAd] = useState<string | null>(null);

  // Classified Ads
  const {
    data: classifiedAds,
    isLoading: classifiedLoading,
    isError: classifiedError,
  } = useQuery({
    queryKey: ["classifiedAds", activeTab],
    queryFn: () => getClassifiedAdsAPI("Published", "Accepted"),
    enabled: activeTab === "classified",
  });

  // Auction Ads
  const {
    data: auctionAds,
    isLoading: auctionLoading,
    isError: auctionError,
  } = useQuery({
    queryKey: ["auctionAds", activeTab],
    queryFn: () => getAuctionAdsAPI("Published", "Accepted"),
    enabled: activeTab === "auction",
  });

  const ads =
    activeTab === "classified" ? classifiedAds?.data : auctionAds?.data;
  const loading =
    activeTab === "classified" ? classifiedLoading : auctionLoading;
  const error = activeTab === "classified" ? classifiedError : auctionError;

  const handleClick = (ad: Ad) => {
    if (activeTab === "classified") {
      router.push(
        `http://user.esycles.com/ads-details-preview?id=${ad._id}&type=${activeTab}`
      );
    } else {
      router.push(
        `http://user.esycles.com/auction-ad-details-preview?id=${ad._id}&type=${activeTab}`
      );
    }
  };

  // 🔥 Highlight effect merge kiya
  useEffect(() => {
    if (highlightId && !loading && ads?.length > 0) {
      setHighlightedAd(highlightId);

      // Scroll to highlighted card
      const scrollTimer = setTimeout(() => {
        const element = document.getElementById(`ad-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);

      // Reset highlight after 2s
      const resetTimer = setTimeout(() => {
        setHighlightedAd(null);
      }, 2000);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [highlightId, activeTab, loading, ads]);

  return (
    <DashboardLayout>
      <div className="max-w-full px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["classified", "auction", "mapAd"].map((tab) => (
            <button
              key={tab}
              className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-all shadow-sm ${
                activeTab === tab
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() =>
                setActiveTab(tab as "classified" | "auction" | "mapAd")
              }
            >
              {tab === "classified"
                ? "Classified Ads"
                : tab === "auction"
                ? "Auction Ads"
                : "Ads Map"}
            </button>
          ))}
        </div>

        {/* Map Section */}
        {activeTab === "mapAd" && (
          <div className="mt-6">
            <LeafMapSection showLayout={false} />
          </div>
        )}

        {/* Ads Listing */}
        {activeTab !== "mapAd" && (
          <>
            {/* Loader */}
            {loading && (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin w-8 h-8 text-orange-500" />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center text-red-500">
                Failed to load ads.
              </div>
            )}

            {/* Ads List */}
            {!loading && ads?.length > 0 && (
              <div className="space-y-4">
                {ads.map((ad: Ad) => (
                  <div
                    id={`ad-${ad._id}`}
                    key={ad._id}
                    onClick={() => handleClick(ad)}
                    className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl shadow-sm border transition 
                      ${
                        highlightedAd === ad._id
                          ? "bg-yellow-100 border-yellow-400"
                          : "bg-white border-gray-200 hover:shadow-md"
                      }`}
                  >
                    {/* Image */}
                    <div className="w-32 h-28 relative rounded-lg overflow-hidden border">
                      {ad.images?.length > 0 ? (
                        <Image
                          src={ad.images[0]}
                          alt={ad.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {ad.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm gap-4 mt-1">
                        {ad.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {ad.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Tag size={14} /> {ad.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />{" "}
                          {new Date(ad.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Status:{" "}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            ad.status === "Published"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {ad.status}
                        </span>
                      </p>
                    </div>

                    {/* Analytics */}
                    <div className="flex gap-6 text-sm text-gray-600">
                      <div className="text-center">
                        <p className="font-semibold flex items-center justify-center gap-1">
                          <Eye size={14} /> {ad.views}
                        </p>
                        <p className="text-xs">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold flex items-center justify-center gap-1">
                          <Phone size={14} /> {ad.calls}
                        </p>
                        <p className="text-xs">Calls</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold flex items-center justify-center gap-1">
                          <MessageSquare size={14} /> {ad.chats}
                        </p>
                        <p className="text-xs">Chats</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="ml-4 text-right">
                      <span className="text-orange-600 font-bold text-lg">
                        {activeTab === "classified"
                          ? ad.price && `$${ad.price}`
                          : ad.buyNowPrice && `$${ad.buyNowPrice}`}
                      </span>
                    </div>

                    {ad?.adType === "auction" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/personal-ads/top-bidders?id=${ad?._id}`
                          );
                        }}
                        type="button"
                        className="ml-4 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                      >
                        View All Bidders
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!loading && ads?.length === 0 && (
              <p className="text-center text-gray-500 py-10">No ads found.</p>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
