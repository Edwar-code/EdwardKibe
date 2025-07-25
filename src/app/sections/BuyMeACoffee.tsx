"use client";

import React, { useState, useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';

// Helper component for the coffee icon
const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a8 8 0 00-8 8 3 3 0 003 3h1.333a2 2 0 011.996 1.817l.167.998a1 1 0 001.998-.166l-.167-.998A4 4 0 009.333 13H8a1 1 0 110-2h1.333a2 2 0 001.996-1.817l.167-.998a3 3 0 015.83-1.002A8 8 0 0010 2zm6 11h-1.333a4 4 0 00-3.996 3.634l-.167.998a1 1 0 101.998.166l.167-.998A2 2 0 0114.667 15H16a1 1 0 100-2z" />
  </svg>
);

export default function BuyMeACoffee() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // State for the progress bar
  const [currentRaised, setCurrentRaised] = useState(0);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const goalAmount = 210000;

  // Effect to fetch the real total from the database when the component opens
  useEffect(() => {
    if (isOpen) {
      setIsLoadingProgress(true);
      fetch('/api/get-total-donations')
        .then(res => res.json())
        .then(data => {
          // Add 46000 to the fetched total
          setCurrentRaised(data.total + 46000);
          setIsLoadingProgress(false);
        })
        .catch(error => {
          console.error("Failed to fetch donation total:", error);
          // If fetch fails, you might still want to show the base amount
          setCurrentRaised(46000);
          setIsLoadingProgress(false);
        });
    }
  }, [isOpen]);

  // Paystack configuration
  const config = {
      reference: (new Date()).getTime().toString(),
      email,
      amount: totalAmount * 100, // Paystack amount is in kobo/cents
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      currency: 'KES',
      metadata: {
        custom_fields: [{
          display_name: "Donor Name",
          variable_name: "donor_name",
          value: name
        }]
      },
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    console.log("Payment successful on client. Reference:", reference);
    console.log("The Paystack webhook is now responsible for saving this donation.");
    setIsLoading(false);

    setCurrentRaised(prev => prev + totalAmount);
    
    setMessage("✅ Asante sana! Your donation has been confirmed.");
    setTimeout(() => {
      setIsOpen(false);
      setMessage('');
      setName('');
      setEmail('');
    }, 5000);
  };

  const onClose = () => {
    console.log('Payment modal closed.');
    setIsLoading(false);
  };

  const handlePaystackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    initializePayment({ onSuccess, onClose });
  };

  // Helper functions to increase/decrease the donation amount
  const handleDecrease = () => setTotalAmount(prev => Math.max(500, prev - 100));
  const handleIncrease = () => setTotalAmount(prev => prev + 100); // <-- THIS LINE IS NOW FIXED
  
  // Calculate the progress percentage for the progress bar
  const percentage = Math.min(100, (currentRaised / goalAmount) * 100).toFixed(2);

  // Render the initial button if the modal is closed
  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-5 right-5 bg-yellow-400 text-gray-800 font-bold py-3 px-5 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 flex items-center z-40">
        <CoffeeIcon />
        Support my work
      </button>
    );
  }

  // Render the modal if it's open
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Support my Work</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl" disabled={isLoading}>×</button>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
            <div className="flex justify-between items-end mb-1 text-sm font-medium text-gray-700">
            <span className="text-gray-500">Status</span>
                <span className="text-gray-500">Goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                {isLoadingProgress ? (
                  <div className="h-4 bg-gray-300 rounded-full animate-pulse"></div>
                ) : (
                  <div
                    className="bg-indigo-600 h-4 rounded-full text-center text-white text-xs font-bold leading-4 transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  >
                    {parseFloat(percentage) > 10 ? `${percentage}%` : ''}
                  </div>
                )}
            </div>
        </div>

        <p className="text-gray-600 mb-6">For the love of creating (and the need for coffee). Asante sana!</p>
        
        {/* Donation Amount Selector */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-medium text-gray-700">You're Supporting:</p>
            <p className="text-4xl font-extrabold text-indigo-600">KES {totalAmount}</p>
            <div className="flex justify-center items-center gap-2 mt-3">
                <button type="button" onClick={handleDecrease} className="px-3 py-1 bg-gray-200 rounded-md" disabled={isLoading}>-</button>
                <span className="text-lg w-16 text-center">KES {totalAmount}</span>
                <button type="button" onClick={handleIncrease} className="px-3 py-1 bg-gray-200 rounded-md" disabled={isLoading}>+</button>
            </div>
        </div>
        
        {/* Payment Form */}
        <form onSubmit={handlePaystackSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Edward" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
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