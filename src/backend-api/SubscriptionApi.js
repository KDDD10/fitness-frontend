import axios from "axios";

const api = axios.create({
  baseURL: "https://python-ecommerce-589e268bd578.herokuapp.com/api",
});

export const fetchSubscriptionPlans = async () => {
  const response = await api.get("/subscription-plans/");
  return response.data;
};

export const getSubscriptionPlanById = async (id) => {
  const response = await api.get(`/subscription-plans/${id}/`);
  return response.data;
};

export const subscribeToPlan = async (planId) => {
  const response = await api.post(
    "/subscriptions/",
    { subscription_plan: planId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
