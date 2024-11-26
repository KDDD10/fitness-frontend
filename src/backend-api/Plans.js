import axios from "axios";

const api = axios.create({
  baseURL: "https://python-ecommerce-589e268bd578.herokuapp.com/api",
});

// Fetch nutrition plans
export const fetchPlans = async () => {
  const response = await api.get("/plans/");
  return response.data;
};

export const getPlanById = async (id) => {
  try {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching plan by ID:", error);
    throw error;
  }
};

export const startPlan = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(`/start-plan/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error starting the plan:", error);
    throw error;
  }
};
