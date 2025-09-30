"use client";

import Loader from "@/components/common/loader";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { getHigestBidderAPI, sellerTriggerBidAPI } from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

interface Bidder {
  bidId: string;
  bidAmount: number;
  offerStatus?: string;
  rank: string;
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
  };
}

export default function AuctionFallbackUI() {
  const params = useParams();
  const auctionId = params.id as string;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["highestBidder", auctionId],
    queryFn: () => getHigestBidderAPI(auctionId),
  });

  const { mutate: triggerBid, isPending } = useMutation({
    mutationFn: () => sellerTriggerBidAPI(auctionId),
    onSuccess: (res) => {
      toast.success(res.data?.message || "Bid triggered successfully!");
      queryClient.invalidateQueries({ queryKey: ["highestBidder", auctionId] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to trigger bid!");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size="md" />
      </div>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex justify-center items-center text-red-500 font-semibold">
          {(error as Error).message || "Failed to load highest bidders."}
        </div>
      </DashboardLayout>
    );
  }

  // ✅ Normalize data: winner case (object) or multiple bidders case (array)
  let bidders: Bidder[] = [];
  if (data?.data) {
    bidders = Array.isArray(data.data) ? data.data : [data.data];
  }

  return (
    <DashboardLayout>
      {/* Seller Dashboard */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Highest Bidders
        </h2>

        {/* 🔘 Trigger Button */}
        <button
          onClick={() => triggerBid()}
          disabled={isPending}
          className={`bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow-md cursor-pointer transition ${
            isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? "Triggering..." : "Trigger Fallback"}
        </button>

        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            {bidders.length === 1 && bidders[0]?.rank === "Winner"
              ? "Winning Bidder"
              : "Highest Bidders"}
          </h3>

          <div className="space-y-3">
            {bidders.length > 0 ? (
              bidders.map((b) => (
                <div
                  key={b.bidId}
                  className={`flex justify-between items-center p-4 rounded-xl shadow-sm border ${
                    b.rank === "Winner"
                      ? "border-green-400 bg-green-50"
                      : "border-orange-300 bg-orange-50"
                  }`}
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {b.user.first_name} {b.user.last_name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Bid: ${b.bidAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Email: {b.user.email}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Mobile: {b.user.mobile_number}
                    </p>

                    {b.offerStatus && (
                      <p
                        className={`text-sm font-medium ${
                          b.offerStatus === "Pending"
                            ? "text-orange-600"
                            : b.offerStatus === "Accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Status: {b.offerStatus}
                      </p>
                    )}

                    <p className="text-xs text-gray-500">Rank: {b.rank}</p>
                  </div>

                  {b.rank === "Leading" && (
                    <span className="text-sm text-orange-500 font-medium">
                      Leading
                    </span>
                  )}
                  {b.rank === "Winner" && (
                    <span className="text-sm text-green-600 font-semibold">
                      🏆 Winner
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No bidders found for this auction.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
