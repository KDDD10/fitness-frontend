import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { fetchPlans, getPlanById, startPlan } from "../backend-api/Plans";
import { notification, Modal, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { subscribeAPlan } from "../backend-api/CartApi";

const Exercise = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isStartingPlan, setIsStartingPlan] = useState(false);
  const isLogged = localStorage.getItem("token");

  const showErrorNotification = (message) => {
    notification.error({
      message: "Error",
      description: message,
      duration: 3,
    });
  };

  const showSuccessNotification = (message) => {
    notification.success({
      message: "Success",
      description: message,
      duration: 3,
    });
  };

  // Fetch plans on component mount
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchPlans();
        const filteredData = data.filter(
          (item) => item.plan_type === "exercise"
        );
        setPlans(filteredData);
      } catch (error) {
        console.error("Failed to load plans:", error);
        showErrorNotification("Failed to load plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const start_date = getCurrentDate();

  const handleSubscribe = async (id) => {
    let data = { plan_id: id, start_date };
    try {
      const Subscribe = await subscribeAPlan(data);
      if (Subscribe?.data?.message) {
        notification.success({
          message: Subscribe?.data?.message,
        });
      }
    } catch (error) {
      showErrorNotification(
        error?.response?.data[0] || "Failed to Subscribe to a Plan"
      );
    }
  };

  // Show plan details in a modal
  const handleViewPlan = async (id) => {
    setLoading(true);
    try {
      const planDetails = await getPlanById(id);
      setSelectedPlan(planDetails);
      setModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch plan details:", error);
      showErrorNotification("Failed to load plan details.");
    } finally {
      setLoading(false);
    }
  };

  // Start a plan
  const handleStartPlan = async () => {
    setIsStartingPlan(true);
    if (!selectedPlan) return;
    try {
      const response = await startPlan(selectedPlan.id);
      showSuccessNotification(
        response?.data?.message || "Plan started successfully!"
      );
      setModalVisible(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error("Failed to start plan:", error);
      showErrorNotification("Failed to start the plan.");
    } finally {
      setIsStartingPlan(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gray-100 pb-16">
        <PageHeader
          heading="Exercise Tips for a Better Workout"
          subheading="Maximize your results with these simple, effective tips for every workout."
        />

        {/* Tips Section */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p>Loading plans...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {plans.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-gradient-to-tr from-blue-200 via-white to-blue-300 shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-800 text-center uppercase mb-2">
                      {tip.name}
                    </h3>
                    <p className="text-md font-medium text-orange-500 text-center mb-3">
                      🕒 Duration: {tip.duration_days} Days
                    </p>
                    <p className="text-gray-700 text-center mb-4">
                      {tip.description}
                    </p>

                    {/* Goals Section */}
                    {isLogged && (
                      <div className="bg-white bg-opacity-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-blue-600 text-center mb-3">
                          🎯 Goals of This Plan
                        </h3>
                        {tip?.goals?.slice(0, 5).map((goal) => (
                          <div key={goal.day_number} className="mb-3">
                            <p className="text-sm font-semibold text-gray-800 text-center">
                              📅 Day {goal.day_number}
                            </p>
                            <p className="text-xs text-gray-600 text-center">
                              {goal.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Button Section */}
                  <div className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 flex justify-between">
                    <Button
                      loading={isStartingPlan}
                      onClick={() =>
                        isLogged ? handleSubscribe(tip.id) : navigate("/login")
                      }
                      className="bg-white text-blue-700 font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      {isLogged ? "Subscribe" : "Get Started"}
                    </Button>
                    <Button
                      onClick={() => handleViewPlan(tip.id)}
                      className="bg-white text-blue-700 font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Modal for Viewing Plan Details */}
      <Modal
        title={selectedPlan?.name || "Plan Details"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="start"
            type="primary"
            onClick={handleStartPlan}
            loading={isStartingPlan}
          >
            Start Plan
          </Button>,
        ]}
      >
        {loading ? (
          <Spin />
        ) : selectedPlan ? (
          <div>
            <p>
              <strong>Description:</strong> {selectedPlan.description}
            </p>
            <p>
              <strong>Duration:</strong> {selectedPlan.duration_days} days
            </p>
            <p>
              <strong>Price:</strong> ${selectedPlan.price}
            </p>
            <p>
              <strong>Goals:</strong>
            </p>
            <ul className="list-disc ml-5">
              {selectedPlan.goals?.map((goal, index) => (
                <li key={index}>{goal.description}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No plan details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Exercise;
