"use client";

import { ReactNode } from "react";
import Loader from "@/components/common/loader";
import { useCustomerProtected } from "./hooks/useCustomerProtected";

interface ProtectedProviderProps {
  children: ReactNode;
}

const ProtectedProvider = ({ children }: ProtectedProviderProps) => {
  const { isCustomer, AccessModal, isLoading } = useCustomerProtected();

  if (isLoading) {
    return <Loader size="lg" />;
  }

  if (!isCustomer) {
    return AccessModal;
  }

  return <>{children}</>;
};

export default ProtectedProvider;
