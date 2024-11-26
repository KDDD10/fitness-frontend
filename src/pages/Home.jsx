import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Banner from "../images/hero1.jpg";
import Intro from "../images/hero.jpg";
import FeaturedProducts from "../components/FeaturedProducts";
import CommunityUpdates from "../components/CommunityUpdates";
import NutritionPlans from "../components/NutritionPlans";
import Testimonials from "../components/Testimonials";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navigation />
      <div>
        <div
          className="relative bg-cover bg-center h-screen"
          style={{
            backgroundImage: `url(${Banner})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Transform Your Body, Elevate Your Health
            </h1>
            <p className="mt-4 text-lg md:text-2xl">
              Get personalized workout and nutrition plans tailored to your
              fitness goals.
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
        {/* Section  Who we are*/}
        <div className="bg-gray-100 py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center md:justify-end">
              <img
                src={Intro}
                alt="Who We Are"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
                Who We Are
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                At FITNESS, we’re more than just a fitness brand. We are a
                global community of people dedicated to helping others transform
                their lives through health, fitness, and wellness.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                With expert guidance, cutting-edge nutrition, and training
                tools, we empower you to reach your personal best. Whether
                you're a beginner or a seasoned athlete, we’re here to help you
                achieve your goals.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>

        {/* Section  Featured Produce*/}
        <FeaturedProducts />
        <div>
          {/* Section  Nutrition Plans*/}
          <NutritionPlans />
        </div>
        {/* Section Community updates*/}
        <div>
          <CommunityUpdates />
        </div>
        {/* Section Testimonial*/}
        <div>
          <Testimonials />
        </div>
      </div>
      {/* Section Footer*/}
      <Footer />
    </div>
  );
};

export default Home;
