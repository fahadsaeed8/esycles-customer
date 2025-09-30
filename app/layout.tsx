import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/components/profileContext/profile-content";
import ReactQueryProvider from "@/services/ReactQueryProvider";
import ProtectedProvider from "@/services/ProtectedProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Esycles Customer",
  description: "Esycles Customer",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <UserProvider>
            <ProtectedProvider>
              <div>{children}</div>
              <ToastContainer />
            </ProtectedProvider>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
