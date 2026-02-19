"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiMail, FiPhone, FiHelpCircle } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FAQ {
  question: string;
  answer: string;
}

export default function HelpSupport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add them to your cart, and proceed to checkout. You can track your order from your profile.",
    },
    {
      question: "How can I contact the seller?",
      answer:
        "Go to the product page and click 'Contact Seller' to send a direct message.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, PayPal, and direct bank transfers.",
    },
    {
      question: "How do I request a refund?",
      answer:
        "Go to your orders, select the item, and click 'Request Refund'. Our support team will assist you.",
    },
  ];

  // ✅ Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto ">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-transparent bg-clip-text flex items-center gap-2">
            <FiHelpCircle className=" text-black" /> Help & Support
          </h1>
          <p className="text-gray-600 mt-2">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <FiMail className="text-[#f59e0b] text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Email Us</h3>
            <p className="text-gray-600 text-sm">support@esycles.com</p>
          </div>
          {/* Call Us - saved for later
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <FiPhone className="text-[#f59e0b] text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Call Us</h3>
            <p className="text-gray-600 text-sm">+1 234 567 890</p>
          </div>
          */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <FiHelpCircle className="text-[#f59e0b] text-3xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Live Chat</h3>
            <p className="text-gray-600 text-sm">Available 9 AM - 6 PM</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold shadow-lg p-4 rounded-t-lg bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
            Frequently Asked Questions
          </h2>
          <div className="bg-white divide-y divide-gray-300 rounded-b-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 hover:bg-orange-50">
                <button
                  className="flex justify-between items-center w-full text-left font-medium cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {faq.question}
                  {openIndex === index ? (
                    <FiChevronUp className="text-[#f59e0b]" />
                  ) : (
                    <FiChevronDown className="text-[#f59e0b]" />
                  )}
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form with Formik */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Contact Support</h2>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form Data:", values);
              resetForm();
            }}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Your Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:shadow-green-700 outline-none focus:boroder-[1px] focus:border-green-500 transition-all duration-300 ease-in-out"
                    placeholder="Write your message here..."
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </DashboardLayout>
  );
}
