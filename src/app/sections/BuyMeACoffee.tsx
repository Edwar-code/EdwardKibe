"use client";

import React, { useState } from 'react';

const CoffeeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 00-8 8 3 3 0 003 3h1.333a2 2 0 011.996 1.817l.167.998a1 1 0 001.998-.166l-.167-.998A4 4 0 009.333 13H8a1 1 0 110-2h1.333a2 2 0 001.996-1.817l.167-.998a3 3 0 015.83-1.002A8 8 0 0010 2zm6 11h-1.333a4 4 0 00-3.996 3.634l-.167.998a1 1 0 101.998.166l.167-.998A2 2 0 0114.667 15H16a1 1 0 100-2z" />
    </svg>
);

const BuyMeACoffee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberOfCoffees, setNumberOfCoffees] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const coffeePrice = 1000; // KES 1000 per coffee
  const totalAmount = numberOfCoffees * coffeePrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/buy-coffee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, amount: totalAmount }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setMessage("✅ Success! Check your phone to complete the payment.");
      setTimeout(() => {
        setIsOpen(false);
        setMessage('');
        setPhoneNumber('');
      }, 5000);

    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-yellow-400 text-gray-800 font-bold py-3 px-5 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 flex items-center z-40"
      >
        <CoffeeIcon />
        Buy me a coffee
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Buy me Coffee</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">×</button>
        </div>
        <p className="text-gray-600 mb-6">For the love of creating (and the need for caffeine) Asante sana!</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-medium text-gray-700">You're donating:</p>
            <p className="text-4xl font-extrabold text-indigo-600">KES {totalAmount}</p>
            <div className="flex justify-center items-center gap-2 mt-3">
                <button onClick={() => setNumberOfCoffees(v => Math.max(1, v - 1))} className="px-3 py-1 bg-gray-200 rounded-md">-</button>
                <span className="text-lg w-10 text-center">{numberOfCoffees} ☕️</span>
                <button onClick={() => setNumberOfCoffees(v => v + 1)} className="px-3 py-1 bg-gray-200 rounded-md">+</button>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Phone Number</label>
            <input
              type="tel" id="phone" value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., 0712345678" required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex justify-center items-center">
            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : `Donate KES ${totalAmount}`}
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default BuyMeACoffee;
