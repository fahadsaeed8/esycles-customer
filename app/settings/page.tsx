"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import {
  FiUser,
  FiLock,
  FiBell,
  FiCreditCard,
  FiSave,
  FiMapPin,
  FiShield,
  FiLink2,
  FiCamera,
} from "react-icons/fi";

export default function Settings() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+123 456 7890",
    profilePicture: "/icons/profile-active.jpg",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    twoFactorAuth: false,
    paymentMethod: "Credit Card",
    linkedGoogle: true,
    linkedFacebook: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isChecked =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? isChecked : value,
    });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, profilePicture: fileURL });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className=" mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
          Account Settings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Profile Settings */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FiUser className="text-[#f59e0b]" /> Profile Information
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="relative w-20 h-20 rounded-full border">
                <div className="overflow-hidden rounded-full w-full h-full">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FiUser className="text-gray-500 text-3xl" />
                    </div>
                  )}
                </div>

                <label className="absolute bottom-0 right-0 bg-[#f59e0b] p-1 rounded-full cursor-pointer z-10">
                  <FiCamera className="text-white text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="text-gray-600 text-sm text-center md:text-start">
                Upload a profile picture (PNG or JPG)
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 transition-all duration-300 ease-in-out"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
            </div>
          </section>

          {/* Address Settings */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FiMapPin className="text-[#f59e0b]" /> Address Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street Address"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
            </div>
          </section>

          {/* Security Settings */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FiLock className="text-[#f59e0b]" /> Security
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
              />
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FiBell className="text-[#f59e0b]" /> Notifications
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                />
                Email Notifications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={formData.smsNotifications}
                  onChange={handleChange}
                />
                SMS Notifications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={formData.pushNotifications}
                  onChange={handleChange}
                />
                Push Notifications
              </label>
            </div>
          </section>

          {/* Two Factor Authentication */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FiShield className="text-[#f59e0b]" /> Security Enhancements
            </h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth}
                onChange={handleChange}
              />
              Enable Two-Factor Authentication
            </label>
          </section>

          {/* Linked Accounts */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FiLink2 className="text-[#f59e0b]" /> Linked Accounts
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="linkedGoogle"
                  checked={formData.linkedGoogle}
                  onChange={handleChange}
                />
                Google Account
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="linkedFacebook"
                  checked={formData.linkedFacebook}
                  onChange={handleChange}
                />
                Facebook Account
              </label>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
              <FiCreditCard className="text-[#f59e0b]" /> Payment
            </h2>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              <FiSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
