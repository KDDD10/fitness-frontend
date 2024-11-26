import React from "react";
import Sara from "../images/sara.jpg";
import John from "../images/john.jpg";
import Community from "../images/community.jpg";
import { Button, Input } from "antd";
const CommunityUpdates = () => {
  const updates = [
    {
      id: 1,
      title: "John’s 50lb Weight Loss Journey",
      description:
        "After following our weight loss plan for 6 months, John managed to lose 50lbs and transformed his lifestyle. He now runs marathons and continues his fitness journey with us!",
      imageUrl: John,
      date: "September 20, 2024",
    },
    {
      id: 2,
      title: "Sara’s Muscle Gain Transformation",
      description:
        "Sara gained 20lbs of lean muscle over 8 months using our high-protein meal plans and strength training programs. Her progress has inspired many in our community.",
      imageUrl: Sara,
      date: "August 15, 2024",
    },
    {
      id: 3,
      title: "Community Bootcamp Challenge",
      description:
        "Our recent community bootcamp saw over 100 participants smash their fitness goals in just 4 weeks. The challenge helped people build strength and improve their stamina.",
      imageUrl: Community,
      date: "July 30, 2024",
    },
    {
      id: 4,
      title: "John’s 50lb Weight Loss Journey",
      description:
        "After following our weight loss plan for 6 months, John managed to lose 50lbs and transformed his lifestyle. He now runs marathons and continues his fitness journey with us!",
      imageUrl: John,
      date: "September 20, 2024",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 ">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Latest Community Updates
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Celebrating the amazing achievements and successes of our fitness
          community.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={update.imageUrl}
              alt={update.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{update.title}</h3>
              <p className="text-gray-600 mb-4">{update.description}</p>
              <p className="text-gray-500 text-sm">{update.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full bg-[#3b60ff] px-10 py-20 mt-20 ">
        <p className="text-4xl font-bold text-center text-white uppercase">
          Join Us!
        </p>
        <p className="text-white text-base text-center">
          Join Our NewsLetter For more community updates
        </p>
        <div className="flex justify-between gap-1 pt-3 px-10">
          <Input placeholder="example@mail.com" />
          <Button className="text-[#3b60ff] uppercase font-bold">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityUpdates;
