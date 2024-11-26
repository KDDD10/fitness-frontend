import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { Modal, Button, Carousel, InputNumber, notification } from "antd";
import {
  fetchCategories,
  fetchAllProducts,
  fetchProductById,
} from "../backend-api/ProductsAndCategories";
import { addItemToCart } from "../backend-api/CartApi";
import { useNavigate } from "react-router-dom";
const ShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("token");

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const categoriesData = await fetchCategories();
      const productsData = await fetchAllProducts();
      setCategories([
        "all",
        ...categoriesData.map((category) => category.name),
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Filter products based on selected category
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.product_categories.some((cat) => cat.name === category)
        )
      );
    }
  }, [category, products]);

  const handleViewProduct = async (productId) => {
    try {
      const product = await fetchProductById(productId);
      setSelectedProduct(product);
      setQuantity(1);
      setModalVisible(true);
    } catch (error) {
      notification.error({ message: "Failed to load product details" });
    }
  };

  const handleAddToCart = async () => {
    if (selectedProduct && quantity > 0) {
      try {
        await addItemToCart(selectedProduct.id, quantity);
        notification.success({
          message: "Success",
          description: "Product added to cart successfully.",
        });
        setModalVisible(false);
        loadData();
      } catch (error) {
        console.error("Failed to add to cart:", error);
        notification.error({ message: "Failed to add to cart" });
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gray-100 pb-16">
        <PageHeader
          heading="Shop Our Products"
          subheading="Discover the best fitness products and accessories to support your goals."
        />

        {/* Category Filter Buttons */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`mx-2 px-4 py-2 text-white font-semibold rounded-full ${
                category === cat
                  ? "bg-blue-500"
                  : "bg-gray-500 hover:bg-gray-700"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
              {/* Capitalize category */}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          {loading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={product?.images[0]?.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-4">
                    {product.product_name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product?.product_description}
                  </p>
                  <p className="text-gray-600 mb-4">
                    ${product?.product_price?.toFixed(2)}
                  </p>

                  <Button
                    type="primary"
                    onClick={() =>
                      isLogged
                        ? handleViewProduct(product.id)
                        : navigate("/login")
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">
              No products found.
            </p>
          )}
        </div>
      </div>
      <Footer />

      {/* Product View Modal */}
      {selectedProduct && (
        <Modal
          title={selectedProduct.product_name}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="buy"
              type="primary"
              disabled={selectedProduct.total_quantity <= 0}
              onClick={handleAddToCart}
            >
              Buy
            </Button>,
          ]}
        >
          {/* Image Slider */}
          <Carousel>
            {selectedProduct.images.map((img) => (
              <div key={img.id}>
                <img
                  src={img.image}
                  alt={selectedProduct.product_name}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>

          {/* Product Details */}
          <div className="mt-4">
            <p className="text-gray-600">
              <strong>Description:</strong>{" "}
              {selectedProduct.product_description}
            </p>
            <p className="text-gray-600">
              <strong>Available Quantity:</strong>{" "}
              {selectedProduct.total_quantity > 0 ? (
                selectedProduct.total_quantity
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>
            <div className="mt-4 flex items-center">
              <span className="mr-4">Quantity:</span>
              <InputNumber
                min={1}
                max={selectedProduct.total_quantity}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ShopPage;
