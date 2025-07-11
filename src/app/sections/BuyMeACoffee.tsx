"use client";

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

const CoffeeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 00-8 8 3 3 0 003 3h1.333a2 2 0 011.996 1.817l.167.998a1 1 0 001.998-.166l-.167-.998A4 4 0 009.333 13H8a1 1 0 110-2h1.333a2 2 0 001.996-1.817l.167-.998a3 3 0 015.83-1.002A8 8 0 0010 2zm6 11h-1.333a4 4 0 00-3.996 3.634l-.167.998a1 1 0 101.998.166l.167-.998A2 2 0 0114.667 15H16a1 1 0 100-2z" />
    </svg>
);

export default function BuyMeACoffee() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Change 1: State now directly manages the donation amount.
  // Default is 500 KES.
  const [totalAmount, setTotalAmount] = useState(500);
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const config = {
      reference: (new Date()).getTime().toString(),
      email: email,
      amount: totalAmount * 100, // We still multiply by 100 for Paystack
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      currency: 'KES',
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: name
          }
        ]
      },
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    console.log("Payment successful. Reference:", reference);
    setMessage("✅ Asante sana! Your support is much appreciated.");
    setIsLoading(false);
    setTimeout(() => {
      setIsOpen(false);
      setMessage('');
      setName('');
      setEmail('');
    }, 5000);
  };

  const onClose = () => {
    setIsLoading(false);
    console.log('Payment popup closed.');
  };

  const handlePaystackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    initializePayment({onSuccess, onClose});
  };

  // Change 2: Create simple handler functions for amount changes
  const handleDecrease = () => {
    // Ensure the amount does not go below 500
    setTotalAmount(prevAmount => Math.max(500, prevAmount - 100));
  };

  const handleIncrease = () => {
    // Increase the amount by 100
    setTotalAmount(prevAmount => prevAmount + 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-yellow-400 text-gray-800 font-bold py-3 px-5 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 flex items-center z-40"
      >
        <CoffeeIcon />
        Support my work
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Support my Work</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl" disabled={isLoading}>×</button>
        </div>
        <p className="text-gray-600 mb-6">For the love of creating (and the need for coffee) Asante sana!</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-medium text-gray-700">You're donating:</p>
            {/* The display now uses the `totalAmount` state directly */}
            <p className="text-4xl font-extrabold text-indigo-600">KES {totalAmount}</p>
            <div className="flex justify-center items-center gap-2 mt-3">
                {/* Change 3: The buttons now call our new handler functions */}
                <button type="button" onClick={handleDecrease} className="px-3 py-1 bg-gray-200 rounded-md" disabled={isLoading}>-</button>
                <span className="text-lg w-16 text-center">KES {totalAmount}</span>
                <button type="button" onClick={handleIncrease} className="px-3 py-1 bg-gray-200 rounded-md" disabled={isLoading}>+</button>
            </div>
        </div>

        <form onSubmit={handlePaystackSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex justify-center items-center">
            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : `Support with KES ${totalAmount}`}
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>
    </div>
  );
};