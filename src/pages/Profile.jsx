import React, { useState, useEffect } from "react";
import {
  Progress,
  List,
  Avatar,
  Modal,
  Form,
  Input,
  Button,
  message,
} from "antd";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { getUserProfile, UsersPlans, updateUser } from "../backend-api/Auth";
import { useNavigate } from "react-router-dom";

// Helper function calculate progress
const calculateProgress = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();

  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const daysPassed = (today - startDate) / (1000 * 60 * 60 * 24);
  return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100).toFixed(2);
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [userPlans, setUserPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plansError, setPlansError] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch user profile and plans
  const fetchProfileAndPlans = async () => {
    try {
      const userProfile = await getUserProfile();
      setProfile(userProfile);

      try {
        const userPlansResponse = await UsersPlans();
        setUserPlans(userPlansResponse.data);
        setPlansError(false); // Clear plans error if successful
      } catch (error) {
        console.error("Failed to load user plans:", error);
        setPlansError(true); // Set error flag for plans
      }
    } catch (error) {
      setError("Could not load profile information. Please log in!");
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndPlans();
  }, []);

  const handleLogout = () => {
    setProfile(null);
    setError("You have been logged out. Please log in to continue.");
    localStorage.removeItem("token");
  };

  const showEditModal = () => {
    if (profile) {
      form.setFieldsValue({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = async (values) => {
    try {
      const updatedUser = await updateUser(values);
      setProfile(updatedUser.data);
      message.success("Profile updated successfully!");
      fetchProfileAndPlans();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="py-16 px-4 min-h-[60vh]">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {loading && <p className="text-center text-xl">Loading profile...</p>}
          {!loading && error && (
            <>
              <div className="text-center text-xl text-red-500">{error}</div>
              <p
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer text-center py-5 text-xl font-semibold"
              >
                Log In
              </p>
            </>
          )}
          {!loading && profile && (
            <>
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 mr-6">
                  <Avatar
                    src={
                      "https://res.cloudinary.com/dcb1zsjuk/image/upload/v1732179824/profile-user-svgrepo-com_qn2ecs.svg" ||
                      ""
                    }
                    alt={profile.name || "User"}
                    size={96}
                    className="rounded-full border border-gray-300 shadow-lg"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">
                    {profile.first_name || "Name not available"}{" "}
                    {profile?.last_name}
                  </h1>
                  <p className="text-gray-600">
                    {profile.email || "Email not available"}
                  </p>

                  <div className="flex space-x-4 mt-2">
                    <p
                      onClick={handleLogout}
                      className="text-blue-500 cursor-pointer"
                    >
                      Log Out
                    </p>
                    <p
                      onClick={showEditModal}
                      className="text-blue-500 cursor-pointer"
                    >
                      Edit Profile
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4">
                Subscription Status & Purchased Plans
              </h2>

              {plansError ? (
                <p className="text-center text-gray-500">
                  No plans available to display.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                  {userPlans.map((plan, index) => {
                    const progress = calculateProgress(
                      plan.start_date,
                      plan.end_date
                    );

                    return (
                      <div
                        key={plan.plan.id}
                        className="border-red-200 border rounded-md p-4 bg-slate-100"
                      >
                        <div className="text-lg font-bold leading-7 text-stone-400">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          Subscription Status:{" "}
                          <span
                            className={`${
                              plan.status.toLowerCase() === "active"
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {plan.status}
                          </span>
                        </h3>
                        <p className="text-lg">
                          <strong>Subscription:</strong>{" "}
                          <span className="text-blue-500">
                            {plan.plan.name || "No Subscription"}
                          </span>
                        </p>
                        <p className="text-lg">
                          <strong>Started on:</strong>{" "}
                          <span className="text-emerald-500">
                            {plan.start_date || "N/A"}
                          </span>
                        </p>
                        <p className="text-lg">
                          <strong>Expires on:</strong>{" "}
                          <span className="text-rose-600">
                            {plan.end_date || "N/A"}
                          </span>
                        </p>
                        {/* Progress Bar */}
                        <div className="mt-4">
                          <Progress
                            percent={progress}
                            status={progress >= 100 ? "success" : "active"}
                          />
                          <p className="text-lg mt-2">
                            You've completed {progress}% of your subscription
                            duration!
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={{
            first_name: profile?.first_name || "",
            last_name: profile?.last_name || "",
            phone: profile?.phone_no || "",
          }}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Footer />
    </>
  );
};

export default ProfilePage;
