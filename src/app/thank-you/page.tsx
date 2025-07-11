import React from "react";
import Link from "next/link";

// Set page metadata
export const metadata = {
  title: "Thank You for Your Support!",
  description: "Confirmation page for your generous donation to Krinzie Devs.",
};

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <div className="bg-white p-10 md:p-12 rounded-xl shadow-lg max-w-lg w-full">
        {/* Checkmark Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Asante Sana!
        </h1>

        <p className="text-gray-600 mb-6 text-lg">
          Thank you for your generous support. Your "coffee" will fuel many
          hours of creativity and development.
        </p>

        <p className="text-gray-500 text-sm mb-8">
          We have received your donation confirmation and truly appreciate your
          contribution to Krinzie Devs. For any inquiries, please contact me.
        </p>

        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
      <footer className="mt-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} Krinzie Devs by Edward Munene. All Rights
        Reserved.
      </footer>
    </div>
  );
}
