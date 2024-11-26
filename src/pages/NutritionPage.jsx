import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { fetchPlans } from "../backend-api/Plans";
import { useNavigate } from "react-router-dom";
import { subscribeAPlan } from "../backend-api/CartApi";
import BgImage from "../images/weight loss.jpg";
const NutritionPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("token");
  const showErrorNotification = (message) => {
    notification.error({
      message: "Error",
      description: message,
      duration: 3,
    });
  };
  useEffect(() => {
    const loadNutritionPlans = async () => {
      try {
        const data = await fetchPlans();
        const filteredData = data.filter(
          (item) => item.plan_type === "nutrition"
        );
        setPlans(filteredData);
      } catch (error) {
        console.error("Failed to load nutrition plans:", error);
        showErrorNotification(
          "Failed to load nutrition plans. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    loadNutritionPlans();
  }, []);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const start_date = getCurrentDate();

  const hanldleSubscribe = async (id) => {
    setSubscribeLoading(true);
    let data = { plan_id: id, start_date };
    try {
      const Subscribe = await subscribeAPlan(data);
      if (Subscribe?.message) {
        notification.success({
          message: Subscribe?.message,
        });
      }
    } catch (error) {
      showErrorNotification(
        error?.response?.data[0] || "Failed to Subscribe a Plan"
      );
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gray-100 pb-16">
        {/* Page Header */}
        <PageHeader
          heading="Personalized Nutrition Plans"
          subheading="Achieve your health and fitness goals with our personalized nutrition plans, tailored specifically to your needs."
        />

        {/* Nutrition Plans Section */}
        <div className="max-w-7xl mx-auto text-center mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Plans</h2>
          {loading ? (
            <p>Loading plans...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-cover bg-center rounded-lg overflow-hidden shadow-lg relative"
                  style={{
                    backgroundImage: `url(${BgImage})`,
                    backgroundBlendMode: "overlay",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  }}
                >
                  <div className="p-6 text-center bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
                    {/* Plan Title */}
                    <h3 className="text-3xl font-bold mb-4 text-white capitalize text-shadow-lg">
                      {plan.name}
                    </h3>

                    {/* Duration */}
                    <p className="text-lg font-medium my-1 text-orange-300 text-center text-shadow-lg">
                      🕒 Duration: {plan.duration_days} Days
                    </p>

                    {/* Description */}
                    <p className="text-white mb-4 text-shadow-md">
                      {plan.description}
                    </p>

                    {/* Goals Section */}
                    <div className="text-center mb-6">
                      <h4 className="text-2xl font-semibold text-white mb-2 text-shadow-md">
                        Day-wise Goals:
                      </h4>
                      {plan.goals?.slice(0, 5).map((goal, index) => (
                        <div
                          key={index}
                          className="text-white text-lg mb-2 text-shadow-sm"
                        >
                          <p>
                            📅 Day {goal.day_number}: {goal.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Subscribe Button */}
                    <div className="mt-4">
                      <Button
                        loading={subscribeLoading}
                        onClick={() =>
                          isLogged
                            ? hanldleSubscribe(plan.id)
                            : navigate("/login")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
                      >
                        {isLogged ? "Subscribe" : "Get Started"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nutrition Tips Section */}
        <div className="max-w-7xl mx-auto text-center mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Nutrition Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Drink More Water</h3>
              <p className="text-gray-600">
                Staying hydrated is essential for all body functions, including
                digestion, muscle recovery, and fat loss. Aim for 8 glasses a
                day.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Eat More Protein</h3>
              <p className="text-gray-600">
                Protein helps build muscle and keeps you fuller for longer.
                Include lean meats, legumes, and dairy in your diet.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">
                Don’t Skip Breakfast
              </h3>
              <p className="text-gray-600">
                Breakfast kick-starts your metabolism and provides the energy
                you need for a productive day.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQs</h2>
          <div className="text-left bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              How do I get started?
            </h3>
            <p className="text-gray-600 mb-4">
              Simply choose one of our nutrition plans and click on the "Get
              Started" button. You'll be guided through a few steps to
              personalize the plan to your specific needs.
            </p>
            <h3 className="text-xl font-semibold mb-4">
              Can I switch plans later?
            </h3>
            <p className="text-gray-600 mb-4">
              Yes, you can easily switch between plans as your goals evolve.
              Just head to your account settings and make the change anytime.
            </p>
            <h3 className="text-xl font-semibold mb-4">
              Are the plans customizable?
            </h3>
            <p className="text-gray-600">
              Absolutely! Our plans are fully customizable to match your dietary
              preferences, restrictions, and fitness goals.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NutritionPage;
