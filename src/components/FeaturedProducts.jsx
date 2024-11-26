import React, { useState, useEffect } from "react";
import Protein from "../images/protein.jpg";
import Band from "../images/band.jpg";
import SmartBand from "../images/smart band.jpg";
import Rug from "../images/rug.jpg";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../backend-api/ProductsAndCategories";
const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData();
  }, []);
  console.log(products);
  // const products = [
  //   {
  //     id: 1,
  //     name: "Premium Protein Powder",
  //     description:
  //       "Boost your muscle recovery with our all-natural, high-protein formula.",
  //     imageUrl: Protein,
  //     price: "$29.99",
  //   },
  //   {
  //     id: 2,
  //     name: "Fitness Resistance Bands",
  //     description:
  //       "Enhance your workouts with durable, versatile resistance bands.",
  //     imageUrl: SmartBand,
  //     price: "$19.99",
  //   },
  //   {
  //     id: 3,
  //     name: "Smart Fitness Watch",
  //     description:
  //       "Track your workouts, monitor your heart rate, and stay connected on the go.",
  //     imageUrl: Band,
  //     price: "$99.99",
  //   },
  //   {
  //     id: 4,
  //     name: "Fitness Rug",
  //     description:
  //       "Track your workouts, monitor your heart rate, and stay connected on the go.",
  //     imageUrl: Rug,
  //     price: "$49.99",
  //   },
  // ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Featured Products
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Explore our top-selling products, handpicked to support your fitness
          journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.images[0].image}
              alt={product.product_name}
              className="w-full h-40 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">
                {product.product_name}
              </h3>
              <p className="text-gray-600 mb-2 text-xs">
                {product.product_description}
              </p>
              <p className="text-xl font-bold text-gray-900 mb-2">
                ${product.product_price}
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
