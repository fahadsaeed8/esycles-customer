"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import { getClassifiedAdsAPI, getAuctionAdsAPI } from "@/services/api";
import DashboardLayout from "@/components/layout/dashboard-layout";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function LeafMapSection({
  showLayout = true,
}: {
  showLayout?: boolean;
}) {
  // Classified Ads
  const {
    data: classifiedAds,
    isLoading: classifiedLoading,
    isError: classifiedError,
  } = useQuery({
    queryKey: ["classifiedAds"],
    queryFn: () => getClassifiedAdsAPI("Published", "Accepted"),
  });

  // Auction Ads
  const {
    data: auctionAds,
    isLoading: auctionLoading,
    isError: auctionError,
  } = useQuery({
    queryKey: ["auctionAds"],
    queryFn: () => getAuctionAdsAPI("Published", "Accepted"),
  });

  // Combine both ads
  const allAds = [...(classifiedAds?.data || []), ...(auctionAds?.data || [])];

  console.log("All Ads for map:", allAds);

  const mapUI = (
    <div className="relative z-0 h-[600px] w-full rounded-xl shadow-lg overflow-hidden mt-10">
      <MapContainer
        center={[39.8283, -98.5795]} // Default USA center
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {allAds
            ?.filter((ad: any) => ad.latitude && ad.longitude) // ✅ only valid coords
            .map((ad: any) => (
              <Marker
                key={ad._id}
                position={[parseFloat(ad.latitude), parseFloat(ad.longitude)]}
                icon={customIcon}
              >
                <Popup>
                  <div className="w-48">
                    <img
                      src={ad.images?.[0]}
                      alt={ad.title}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-bold text-sm">{ad.title}</h3>
                    {ad.price && (
                      <p className="text-xs text-gray-600">${ad.price}</p>
                    )}
                    <p className="text-xs text-gray-500">{ad.category}</p>
                    <a
                      href={
                        ad?.adType === "auction"
                          ? `http://user.esycles.com/auction-ad-details-preview?id=${ad._id}`
                          : `http://user.esycles.com/ads-details-preview?id=${ad._id}`
                      }
                      className="text-blue-500 text-xs underline mt-1 inline-block"
                    >
                      View Details
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );

  return showLayout ? <DashboardLayout>{mapUI}</DashboardLayout> : mapUI;
}
