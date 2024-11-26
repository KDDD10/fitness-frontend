import axios from "axios";

const api = axios.create({
  baseURL: "https://python-ecommerce-589e268bd578.herokuapp.com/api",
});

export const fetchCartItems = async () => {
  const response = await api.get("/cart/get-items/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const addItemToCart = async (productId, quantity) => {
  const response = await api.post(
    "/cart/add-item/",
    { product: productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

// Update item quantity in cart
export const updateCartItemQuantity = async (productId, quantity) => {
  const response = await api.patch(
    `/cart/update-item/${productId}/`,
    { product: productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

// Remove item from cart
export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/remove-item/${productId}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
export const subscribeAPlan = async (data) => {
  const response = await api.post(`/start-plan/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
export const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const response = await api.post(
      "/order/session-checkout/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: function (status) {
          return status === 200 || status === 303;
        },
      }
    );
    if (response.status === 303 && response.headers?.location) {
      return response.headers.location;
    } else if (response.data?.checkout_url) {
      return response.data.checkout_url;
    } else {
      throw new Error("Checkout URL not available in response.");
    }
  } catch (error) {
    console.error("Error in placeOrder:", error);
    throw error;
  }
};
