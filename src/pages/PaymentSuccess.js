// src/pages/PaymentSuccess.js
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ transactionId, amount }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been processed
          successfully.
        </p>

        <Button
          type="primary"
          onClick={() => navigate("/shop")}
          className="w-full mb-4"
        >
          Back To Shop
        </Button>
        <Button onClick={() => navigate("/")} className="w-full">
          Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
