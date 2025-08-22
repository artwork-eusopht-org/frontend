import React from "react";

const PaymentSuccess: React.FC = () => {
  
  return (
      <div className="flex items-center justify-center min-h-screen bg-green-100 px-4">
          <div className="bg-white shadow-lg p-8 rounded-md text-center max-w-md w-full">
              <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
              <p className="text-gray-700 text-lg">Your payment was successful.</p>
          </div>
      </div>
  );
};

export default PaymentSuccess;
