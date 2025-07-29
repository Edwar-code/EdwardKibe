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
  // --- STATE NOW HANDLES USD ---
  const [amountUSD, setAmountUSD] = useState(1500); // Default donation amount in USD
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // --- IMPORTANT: This is a fixed exchange rate. For a real app, fetch this from an API. ---
  const USD_TO_KES_RATE = 130;
  
  // State for the progress bar (goal is now in USD)
  const [currentRaisedKES, setCurrentRaisedKES] = useState(0); // Fetched total is in KES
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const goalAmountUSD = 2000; // The goal amount in USD

  // Effect to fetch the real total from the database (which is in KES)
  useEffect(() => {
    if (isOpen) {
      setIsLoadingProgress(true);
      fetch('/api/get-total-donations')
        .then(res => res.json())
        .then(data => {
          setCurrentRaisedKES(data.total + 46000); // The total from DB is in KES
          setIsLoadingProgress(false);
        })
        .catch(error => {
          console.error("Failed to fetch donation total:", error);
          setCurrentRaisedKES(46000);
          setIsLoadingProgress(false);
        });
    }
  }, [isOpen]);

  // --- CONVERT USD TO KES for Paystack ---
  const amountInKES = amountUSD * USD_TO_KES_RATE;

  // Paystack configuration
  const config = {
      reference: (new Date()).getTime().toString(),
      email,
      amount: Math.round(amountInKES * 100), // Paystack amount is in kobo, so we use the KES value
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      currency: 'KES', // Paystack will process this in KES
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
    setIsLoading(false);

    // Add the KES equivalent to the raised amount
    setCurrentRaisedKES(prev => prev + amountInKES);
    
    setMessage("✅ Thank you so much! Your donation has been confirmed.");
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
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, ''), 10);
    setAmountUSD(isNaN(value) ? 0 : value);
  };

  // --- PROGRESS BAR CALCULATIONS in USD ---
  const currentRaisedUSD = currentRaisedKES / USD_TO_KES_RATE;
  const percentage = Math.min(100, (currentRaisedUSD / goalAmountUSD) * 100).toFixed(2);

  // Render the initial button if the modal is closed
  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-5 right-5 bg-yellow-400 text-gray-800 font-bold py-3 px-5 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 flex items-center z-40">
        <CoffeeIcon />
        Support my Work
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
        
        {/* Progress Bar (Displaying in USD) */}
        <div className="mb-6">
            <div className="flex justify-between items-end mb-1 text-sm font-medium text-gray-700">
                <span className="text-gray-500">Raised: ${Math.round(currentRaisedUSD).toLocaleString('en-US')}</span>
                <span className="text-gray-500">Goal: ${goalAmountUSD.toLocaleString('en-US')}</span>
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

        <p className="text-gray-600 mb-6">Every contribution helps fuel this creative work. Thank you!</p>
        
        {/* Donation Amount Input (in USD) */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <label htmlFor="donation-amount" className="block text-lg font-medium text-gray-700 mb-2 text-center">I'd like to support with:</label>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500 mr-2">$</span>
              <input 
                type="text" // Use text to allow for commas, but handle parsing
                id="donation-amount"
                value={amountUSD.toLocaleString('en-US')} // Display with commas
                onChange={handleAmountChange}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-2xl font-extrabold text-indigo-600 text-center"
                disabled={isLoading}
              />
            </div>
        </div>
        
        {/* Payment Form */}
        <form onSubmit={handlePaystackSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jane Doe" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <button type="submit" disabled={isLoading || amountUSD < 1} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex justify-center items-center">
            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : `Support with $${amountUSD.toLocaleString('en-US')}`}
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm font-medium ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>
    </div>
  );
};