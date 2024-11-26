// src/backend-api/ShopAPI.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://python-ecommerce-589e268bd578.herokuapp.com/api", // Replace with your backend URL
});

// Fetch all products
export const fetchAllProducts = async () => {
  const response = await api.get("/products/");
  return response.data;
};

// Fetch categories
export const fetchCategories = async () => {
  const response = await api.get("/category/");
  return response.data;
};

export const fetchProductById = async (productId) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};
