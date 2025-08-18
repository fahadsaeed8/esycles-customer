"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Layers,
  ShoppingCart,
  Settings,
  ChevronDown,
  Package,
  CreditCard,
  Mail,
  FileSearch,
  Star,
  Menu,
  X,
  Bell,
} from "lucide-react";
import Image from "next/image";
import SideProfilePopUp from "../../popup/side-profile-popup";

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  link?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  // Profile Section
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/",
  },
  { label: "My Profile", icon: <User size={18} />, link: "/profile" },

  // Buying Section
  {
    label: "Browse Products",
    icon: <Layers size={18} />,
    link: "/browse-products",
  },
  { label: "My Orders", icon: <ShoppingCart size={18} />, link: "/my-orders" },
  { label: "Wishlist", icon: <Star size={18} />, link: "/wishlist" },

  // Selling Section
  {
    label: "My Listings",
    icon: <Package size={18} />,
    link: "/my-listings",
    subItems: [
      { label: "Add New Product", link: "/my-listings/add" },
      { label: "All My Products", link: "/my-listings/all" },
      { label: "Sales History", link: "/my-listings/sales-history" },
    ],
  },

  // Payments & Wallet
  {
    label: "My Wallet",
    icon: <CreditCard size={18} />,
    link: "/wallet",
    subItems: [
      { label: "Wallet Balance", link: "/wallet/balance" },
      { label: "Payment History", link: "/wallet/payment-history" },
      { label: "Withdraw Funds", link: "/wallet/withdraw" },
    ],
  },

  // Communication
  { label: "Messages", icon: <Mail size={18} />, link: "/messages" },
  { label: "Notifications", icon: <Bell size={18} />, link: "/notifications" },

  // Support
  {
    label: "Help & Support",
    icon: <FileSearch size={18} />,
    link: "/help-support",
  },
  { label: "Settings", icon: <Settings size={18} />, link: "/settings" },

  // Logout
  { label: "Sign Out", icon: <X size={18} />, link: "/logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = (link?: string) => {
    if (!link) return false;
    if (link === "/") {
      return pathname === "/";
    }
    return pathname === link || pathname.startsWith(link + "/");
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      setOpenDropdowns((prev) =>
        prev.includes(item.label)
          ? prev.filter((i) => i !== item.label)
          : [...prev, item.label]
      );
    }
  };

  const renderMenu = (items: MenuItem[], level: number = 0) => {
    return items.map((item) => (
      <li key={item.label}>
        {!item.subItems ? (
          <Link
            href={item.link || "#"}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm transition ${
              isActive(item.link)
                ? `${
                    level === 0 ? "bg-[#febd69] text-black" : "text-[#febd69]"
                  } active-menu-item`
                : "hover:bg-white/10 text-gray-200"
            }`}
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </Link>
        ) : (
          <div>
            <button
              onClick={() => handleMenuClick(item)}
              className={`flex items-center justify-between mb-1 w-full px-4 py-2 rounded-md text-sm cursor-pointer transition ${
                isActive(item.link) || openDropdowns.includes(item.label)
                  ? "bg-[#febd69] text-black"
                  : "hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition ${
                  openDropdowns.includes(item.label) ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdowns.includes(item.label) && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-6"
                >
                  {renderMenu(item.subItems, level + 1)}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </li>
    ));
  };

  useEffect(() => {
    const openParents: string[] = [];

    const checkSubItems = (items: MenuItem[], parentLabel?: string) => {
      for (const item of items) {
        if (item.subItems) {
          checkSubItems(item.subItems, item.label);
        }
        if (item.link && pathname.startsWith(item.link)) {
          if (parentLabel && !openParents.includes(parentLabel)) {
            openParents.push(parentLabel);
          }
        }
      }
    };

    checkSubItems(menuItems);
    setOpenDropdowns(openParents);
  }, [pathname]);

  useEffect(() => {
    const activeItem = document.querySelector(".active-menu-item");
    if (activeItem && sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const offsetTop = (activeItem as HTMLElement).offsetTop;
      sidebar.scrollTo({
        top: offsetTop - 100, // adjust offset as needed
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-1 left-2 z-40">
        {!mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md bg-transparent text-white"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:relative z-30 w-[244px] min-w-[244px] max-w-[244px] h-screen overflow-y-auto 
        bg-gradient-to-t from-gray-500 to-[#232F3E] shadow-lg text-white p-4 hide-scrollbar
        transform transition-transform duration-300 ease-in-out
        ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end mb-2">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo */}
        <Link href={'/'}>
        <Image
          src="/icons/white-logo-latest.png"
          width={120}
          height={60}
          alt="Logo"
          className="w-fit h-fit cursor-pointer mb-2 !mx-auto"
        />
        </Link>
        {/* User Profile */}
        <div className="w-full  flex justify-between items-center border-b border-gray-400 pb-4 mb-4">
          <Link href={'/profile'}>
          <div className="flex cursor-pointer gap-2 items-center">
            <Image
              src="/icons/profile-active.jpg"
              width={35}
              height={35}
              alt="Logo"
              className="w-[35px] h-[35px] rounded-full cursor-pointer"
            />
            <div className="text-start">
              <p className="font-semibold text-sm">John Doe</p>
              <span className="text-xs text-gray-300">Customer</span>
            </div>
          </div>
          </Link>
          <SideProfilePopUp />
          {/* <EllipsisVertical className="w-5 h-[25px] cursor-pointer text-gray-300" /> */}
        </div>

        {/* Menu Items */}
        <ul className="space-y-1">{renderMenu(menuItems)}</ul>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
