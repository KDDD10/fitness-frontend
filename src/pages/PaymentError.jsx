import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentError = ({ errorCode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again
          or contact support if the issue persists.
        </p>
        {errorCode && (
          <p className="text-gray-800 mb-6">
            <strong>Error Code:</strong> {errorCode}
          </p>
        )}
        <Button
          type="primary"
          onClick={() => navigate("/checkout")}
          className="w-full mb-4"
        >
          Try Again
        </Button>
        <Button onClick={() => navigate("/")} className="w-full">
          Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentError;
