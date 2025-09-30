"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useUser } from "@/components/profileContext/profile-content";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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
import { useState } from "react";

// ✅ Yup Validation Schema
const SettingsSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Postal code is required"),
  currentPassword: Yup.string(),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export default function Settings() {
  const { profileImage } = useUser();
  const [profilePicture, setProfilePicture] = useState(
    "/site-icons/profile-active.jpg"
  );

  const handleProfilePicChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setProfilePicture(fileURL);
      setFieldValue("profilePicture", fileURL);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
          Account Settings
        </h1>

        <Formik
          initialValues={{
            fullName: "John Doe",
            email: "john@example.com",
            phone: "+123 456 7890",
            profilePicture: "/site-icons/profile-active.jpg",
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
          }}
          validationSchema={SettingsSchema}
          onSubmit={(values) => {
            console.log("Form Submitted:", values);
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form className="space-y-10">
              {/* Profile Settings */}
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
                  <FiUser className="text-[#f59e0b]" /> Profile Information
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 rounded-full border">
                    <div className="overflow-hidden rounded-full w-full h-full">
                      {profilePicture ? (
                        <img
                          src={profileImage || profilePicture}
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
                      <FiCamera className="text-white text-sm cursor-pointer" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleProfilePicChange(e, setFieldValue)
                        }
                        className="hidden"
                      />
                    </label>
                  </div>

                  <p className="text-gray-600 text-sm text-center md:text-start">
                    Upload a profile picture (PNG or JPG)
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 transition-all duration-300 ease-in-out"
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}

                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}

                  <Field
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </section>

              {/* Address Settings */}
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
                  <FiMapPin className="text-[#f59e0b]" /> Address Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
                  />
                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
                  />
                  <Field
                    type="text"
                    name="state"
                    placeholder="State"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
                  />
                  <Field
                    type="text"
                    name="postalCode"
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
                  <Field
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
                  />
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700"
                  />
                  <Field
                    type="password"
                    name="confirmPassword"
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
                    <Field type="checkbox" name="emailNotifications" />
                    Email Notifications
                  </label>
                  <label className="flex items-center gap-2">
                    <Field type="checkbox" name="smsNotifications" />
                    SMS Notifications
                  </label>
                  <label className="flex items-center gap-2">
                    <Field type="checkbox" name="pushNotifications" />
                    Push Notifications
                  </label>
                </div>
              </section>

              {/* Two Factor */}
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
                  <FiShield className="text-[#f59e0b]" /> Security Enhancements
                </h2>
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="twoFactorAuth" />
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
                    <Field type="checkbox" name="linkedGoogle" />
                    Google Account
                  </label>
                  <label className="flex items-center gap-2">
                    <Field type="checkbox" name="linkedFacebook" />
                    Facebook Account
                  </label>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
                  <FiCreditCard className="text-[#f59e0b]" /> Payment
                </h2>
                <Field
                  as="select"
                  name="paymentMethod"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </Field>
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
            </Form>
          )}
        </Formik>
      </div>
    </DashboardLayout>
  );
}
