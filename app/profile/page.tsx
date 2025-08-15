"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiCalendar,
  FiGlobe,
  FiMoon,
  FiAward,
  FiShoppingBag,
  FiHeart,
  FiActivity,
} from "react-icons/fi";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default function CustomerProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@gmail.com",
    phone: "+1 234 567 890",
    address: "123 Bike Street, NY",
    dob: "2000-05-13",
    gender: "Male",
    bio: "Love cycling and exploring new routes.",
    currency: "USD",
    language: "English",
    darkMode: false,
    favoriteBike: "Mountain Bike",
    experience: "Intermediate",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully ✅");
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Customer Profile
        </h1>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profileImage || "/icons/profile-active.jpg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-white text-gray-700 p-1 rounded-full shadow cursor-pointer"
                >
                  <FiCamera />
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{formData.fullName}</h1>
                <p className="text-sm opacity-90">{formData.bio}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-gray-800 px-5 py-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileCard
              icon={<FiUser />}
              label="Full Name"
              value={formData.fullName}
            />
            <ProfileCard
              icon={<FiMail />}
              label="Email"
              value={formData.email}
            />
            <ProfileCard
              icon={<FiPhone />}
              label="Phone"
              value={formData.phone}
            />
            <ProfileCard
              icon={<FiMapPin />}
              label="Address"
              value={formData.address}
            />
            <ProfileCard
              icon={<FiCalendar />}
              label="Date of Birth"
              value={formData.dob}
            />
            <ProfileCard
              icon={<FiUser />}
              label="Gender"
              value={formData.gender}
            />
            <ProfileCard
              icon={<FiGlobe />}
              label="Preferred Language"
              value={formData.language}
            />
            <ProfileCard
              icon={<FiAward />}
              label="Experience Level"
              value={formData.experience}
            />
            <ProfileCard
              icon={<FiActivity />}
              label="Favorite Bike"
              value={formData.favoriteBike}
            />
            <StatsCard
              icon={<FiShoppingBag />}
              label="Total Orders"
              value="42"
            />
            <StatsCard icon={<FiHeart />} label="Wishlist Items" value="15" />
            <StatsCard icon={<FiAward />} label="Completed Rides" value="120" />
          </div>
        </div>
      </div>

      {/* Modal for Edit */}
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <AnimatedInput
              name="fullName"
              value={formData.fullName}
              placeholder="Full Name"
              onChange={handleChange}
            />
            <AnimatedInput
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
            />
            <AnimatedInput
              name="phone"
              value={formData.phone}
              placeholder="Phone"
              onChange={handleChange}
            />
            <AnimatedInput
              name="address"
              value={formData.address}
              placeholder="Address"
              onChange={handleChange}
            />
            <AnimatedInput
              name="dob"
              type="date"
              value={formData.dob}
              placeholder="Date of Birth"
              onChange={handleChange}
            />
            <SelectInput
              name="gender"
              value={formData.gender}
              options={["Male", "Female", "Other"]}
              onChange={handleChange}
            />
            <SelectInput
              name="language"
              value={formData.language}
              options={["English", "Spanish", "French"]}
              onChange={handleChange}
            />
            <SelectInput
              name="favoriteBike"
              value={formData.favoriteBike}
              options={["Mountain Bike", "Road Bike", "Hybrid Bike"]}
              onChange={handleChange}
            />
            <SelectInput
              name="experience"
              value={formData.experience}
              options={["Beginner", "Intermediate", "Expert"]}
              onChange={handleChange}
            />
            {/* <div className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
              />
              <label>Enable Dark Mode</label>
            </div> */}
            <div className="flex gap-4 md:col-span-2">
              <button
                type="submit"
                className="cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white px-6 py-2 rounded-full shadow"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer bg-gray-300 text-gray-800 px-6 py-2 rounded-full shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}

/* Modal Component */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full"
      >
        {children}
      </div>
    </div>
  );
}

/* Your existing ProfileCard, StatsCard, AnimatedInput, SelectInput components remain unchanged */
function ProfileCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
      <div className="text-[#f59e0b] text-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function StatsCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white p-4 rounded-lg shadow flex items-center gap-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm">{label}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}

function AnimatedInput({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 rounded-full px-4 py-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
    />
  );
}

function SelectInput({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-full px-4 py-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:border-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
