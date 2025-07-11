'use client';

import React from 'react';

// This component receives a function to tell the parent to go back to the main view.
type ThankYouSectionProps = {
  onReturnHome: () => void;
};

export default function ThankYouSection({ onReturnHome }: ThankYouSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <div className="bg-white text-gray-800 p-10 md:p-12 rounded-xl shadow-lg max-w-lg w-full animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Asante Sana!</h1>
        <p className="text-gray-600 mb-6 text-lg">Thank you for your generous support. Your "coffee" will fuel my creativity.</p>
        <button onClick={onReturnHome} className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Return to Home
        </button>
      </div>
    </div>
  );
}