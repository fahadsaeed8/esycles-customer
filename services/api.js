import { axiosInstance, handleAPIRequest } from "./axiosInstance";

export const getProfileAPI = () =>
  handleAPIRequest(axiosInstance.get, "api/profile");

export const getHigestBidderAPI = (id) =>
  handleAPIRequest(axiosInstance.get, `api/auction-ad/${id}/top-bids`);

export const getAuctionAdsAPI = (publishedStatus, status) => {
  let url = `api/auction-ads?status=${publishedStatus}`;
  if (status) {
    url += `&ad_status=${status}`;
  }

  return handleAPIRequest(axiosInstance.get, url);
};

export const getClassifiedAdsAPI = (publishedStatus, status) => {
  let url = `api/classified-ads?status=${publishedStatus}`;
  if (status) {
    url += `&ad_status=${status}`;
  }

  return handleAPIRequest(axiosInstance.get, url);
};

export const sellerTriggerBidAPI = (id) =>
  handleAPIRequest(axiosInstance.post, `api/auction-ad/${id}/update-offer`);
