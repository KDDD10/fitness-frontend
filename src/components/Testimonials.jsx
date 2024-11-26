import React from "react";
import Client1 from "../images/client1.jpg";
import Client2 from "../images/client2.jpg";
import Client3 from "../images/client3.jpg";
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "This nutrition plan completely changed my life! I lost 30lbs in just 3 months and feel more energized than ever. Highly recommend it to anyone looking to transform their health.",
      imageUrl: Client1,
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback:
        "The muscle gain plan was exactly what I needed. I’ve gained 15lbs of muscle in 6 months, and I feel stronger and more confident in the gym. The personalized meal plans were spot on!",
      imageUrl: Client2,
    },
    {
      id: 3,
      name: "Emily Johnson",
      feedback:
        "I love the healthy lifestyle plan! It’s easy to follow and fits perfectly into my busy schedule. I’ve been able to maintain a healthy weight and improve my overall wellbeing.",
      imageUrl: Client3,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Real stories from our satisfied customers who have transformed their
          lives with our nutrition and fitness plans.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
            <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
