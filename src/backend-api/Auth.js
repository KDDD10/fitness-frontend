import axios from "axios";

const api = axios.create({
  baseURL: "https://python-ecommerce-589e268bd578.herokuapp.com/api",
});
export const registerUser = async (data) => {
  try {
    const response = await api.post("/register/", data);
    if (response.status === 201) {
      return response;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};
export const loginUser = async (data) => {
  try {
    const response = await api.post("/login/", data);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get("/user-info/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const UsersPlans = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get("/user/plans/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const response = await api.patch("/user/update/", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
