import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import {
  fetchCartItems,
  updateCartItemQuantity,
  removeCartItem,
  placeOrder,
} from "../backend-api/CartApi";
import { useNavigate } from "react-router-dom";
import { Modal, InputNumber, Button } from "antd";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  //const [selectedPayment, setSelectedPayment] = useState("credit-card");

  // State for modal visibility and the item being edited
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);
  const [qtyLoading, setQtyLoading] = useState(false);

  // Load cart items from the backend
  const loadCart = async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Get total price for all items in the cart
  const getTotalPrice = () => {
    return cartItems
      .reduce(
        (total, item) => total + item.product.product_price * item.quantity,
        0
      )
      .toFixed(2);
  };

  // Remove an item from the cart
  const handleRemoveItem = async (id) => {
    try {
      setLoading(true);
      await removeCartItem(id);
      loadCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Open the modal to edit the quantity
  const showEditModal = (item) => {
    setEditingItem(item);
    setNewQuantity(item.quantity);
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  // Update item quantity
  const handleUpdateQuantity = async () => {
    const parsedQuantity = parseInt(newQuantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) return;

    try {
      // console.log(
      //   `Updating item ${editingItem.id} with quantity: ${parsedQuantity}`
      // );
      setQtyLoading(true);

      // Update the quantity via API call
      await updateCartItemQuantity(editingItem.id, parsedQuantity);

      // Optimistically update local cart state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingItem.id
            ? { ...item, quantity: parsedQuantity }
            : item
        )
      );

      // Close modal and reset
      setIsModalVisible(false);
      setEditingItem(null);
      setNewQuantity(1);
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    } finally {
      setQtyLoading(false);
    }
  };

  // Place an order
  const handlePlaceOrder = async () => {
    setPaymentLoading(true);
    try {
      const paymentLink = await placeOrder();

      if (paymentLink) {
        window.location.href = paymentLink;
      } else {
        console.error("Payment link not returned from the API.");
      }
    } catch (error) {
      console.log("Error during placing order:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-gray-100 pb-16">
        <PageHeader heading="Cart" />
        <div className="max-w-7xl mx-auto mb-12">
          {loading ? (
            <p className="text-lg text-gray-600 text-center">Loading cart...</p>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
              <div className="lg:col-span-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-lg rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.product.images[0].image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {item?.product?.product_name}
                        </h3>
                        <p className="text-gray-600">
                          ${item?.product?.product_price?.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm">
                          Qty: {item.quantity}
                        </span>
                        <button
                          onClick={() => showEditModal(item)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          Edit Quantity
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <p className="text-gray-600 mb-4">Total: ${getTotalPrice()}</p>

                <Button
                  loading={paymentLoading}
                  onClick={() => handlePlaceOrder()}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-lg text-gray-600 text-center">
              Your cart is empty
            </p>
          )}
        </div>
      </div>
      <Footer />

      {/* Modal for editing quantity */}
      <Modal
        title="Edit Quantity"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={[
          <Button key="back" onClick={handleCancelModal}>
            Cancel
          </Button>,
          <Button
            loading={qtyLoading}
            key="submit"
            type="primary"
            onClick={handleUpdateQuantity}
          >
            Update Quantity
          </Button>,
        ]}
      >
        <InputNumber
          min={1}
          value={newQuantity}
          onChange={(value) => setNewQuantity(value)}
          className="w-full"
        />
      </Modal>
    </>
  );
};

export default Cart;
