import React, { useState } from "react";
import { Button, Form, Input, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import LoginImg from "../images/login2.jpg";
import { registerUser } from "../backend-api/Auth";
const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      const response = await registerUser(values);
      console.log(response.data);
      if (response.data) {
        notification.success({
          message: "Registration Successful",
          description: "Your account has been created successfully.",
        });
        navigate("/login");
      }
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description: error?.email[0] || "There was an issue Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src={`${LoginImg}`}
          alt="Fitness"
          className="h-full object-cover"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create a New Account
          </h1>

          <Form className="space-y-6" layout="vertical" onFinish={onFinish}>
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
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone_no"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full flex justify-center py-2 px-4"
                loading={isLoading}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          {/* Link to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
