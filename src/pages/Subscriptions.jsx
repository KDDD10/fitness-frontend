import React, { useState, useEffect } from "react";
import { notification, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  fetchSubscriptionPlans,
  getSubscriptionPlanById,
  subscribeToPlan,
} from "../backend-api/SubscriptionApi";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch subscription plans on component mount
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const response = await fetchSubscriptionPlans();
        setPlans(response);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to load subscription plans.",
        });
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  const isLogged = localStorage.getItem("token");
  // Show plan details in modal
  const handleViewDetails = async (id) => {
    try {
      const planDetails = await getSubscriptionPlanById(id);
      setSelectedPlan(planDetails);
      setIsModalVisible(true);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch plan details.",
      });
    }
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPlan(null);
  };

  // Handle subscription
  const handleSubscribe = async (planId) => {
    try {
      const response = await subscribeToPlan(planId);
      if (response?.payment_url) {
        window.location.href = response.payment_url;
        handleModalClose();
      } else {
        notification.error({
          message: "Subscription Error",
          description: "Payment link not provided.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Subscription Failed",
        description:
          error.response.data.detail || "Failed to subscribe to the plan.",
      });
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gray-100 pb-16">
        <PageHeader
          heading="Subscription Plans"
          subheading="Choose a plan that suits your needs."
        />
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <p>Loading subscription plans...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-gradient-to-tr from-blue-200 via-white to-blue-300 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-blue-800 uppercase">
                      {plan.name}
                    </h3>
                    {plan.description.split(" ").slice(0, 60).join(" ")}...
                  </div>
                  <div className="bg-white shadow-inner rounded-lg p-4">
                    <p className="text-lg text-blue-700 font-semibold">
                      <span className="text-2xl font-bold">${plan.price}</span>{" "}
                      / {plan.days} days
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Duration:</strong> {plan.days} days
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      type="primary"
                      onClick={() => handleViewDetails(plan.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      type="default"
                      onClick={() =>
                        isLogged ? handleSubscribe(plan.id) : navigate("/login")
                      }
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Plan Details Modal */}
      <Modal
        title={selectedPlan?.name}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
          <Button
            key="subscribe"
            type="primary"
            onClick={() =>
              isLogged ? handleSubscribe(selectedPlan.id) : navigate("/login")
            }
          >
            Subscribe
          </Button>,
        ]}
      >
        {selectedPlan ? (
          <div>
            <p>
              <strong>Description:</strong> {selectedPlan.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedPlan.price}
            </p>
            <p>
              <strong>Duration:</strong> {selectedPlan.days} days
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </>
  );
};

export default Subscriptions;
