import React from "react";
import Muscle from "../images/muscle gain.jpg";
import WeightLoss from "../images/weight loss.jpg";
import HealthLife from "../images/healthy life style.png";
import { useNavigate } from "react-router-dom";
const NutritionPlans = () => {
  const navigate = useNavigate();
  const plans = [
    {
      id: 1,
      name: "Weight Loss Plan",
      description:
        "A balanced meal plan to help you shed unwanted weight while staying energized and healthy.",
      features: ["Low-calorie meals", "Balanced macros", "Daily meal tracker"],
      imageUrl: Muscle,
    },
    {
      id: 2,
      name: "Muscle Gain Plan",
      description:
        "A high-protein meal plan designed to fuel muscle growth and recovery after intense workouts.",
      features: [
        "High-protein meals",
        "Customized calorie intake",
        "Nutrient timing for workouts",
      ],
      imageUrl: WeightLoss,
    },
    {
      id: 3,
      name: "Healthy Lifestyle Plan",
      description:
        "A wholesome, balanced meal plan for those looking to maintain or improve overall health and wellness.",
      features: [
        "Whole foods",
        "Daily nutrients",
        "Flexible meals for a healthy lifestyle",
      ],
      imageUrl: HealthLife,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Nutrition Plans
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Explore our curated nutrition plans tailored to help you achieve your
          fitness goals.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={plan.imageUrl}
              alt={plan.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="text-gray-600 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    • {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/nutrition")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NutritionPlans;
