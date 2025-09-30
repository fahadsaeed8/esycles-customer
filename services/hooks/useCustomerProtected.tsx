"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfileAPI } from "../api";
import { parseCookies } from "nookies";
import CustomerAccessModal from "@/components/modals/customer-access-modal";

export const useCustomerProtected = () => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  console.log("token", token);

  useEffect(() => {
    const cookies = parseCookies({});
    setToken(cookies.token || null);
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (!token) {
      setShowModal(true);
      return;
    }

    if (isError) {
      setShowModal(true);
    }

    if (data && data.user?.role !== "customer") {
      setShowModal(true);
    }
  }, [token, data, isError]);

  return {
    isLoading,
    isCustomer: data?.user?.role === "customer",
    AccessModal: showModal ? (
      <CustomerAccessModal
        onClose={() =>
          window.location.replace("https://user.esycles.com/login")
        }
      />
    ) : null,
  };
};
