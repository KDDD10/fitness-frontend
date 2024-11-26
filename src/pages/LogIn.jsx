import React, { useState } from "react";
import LoginImg from "../images/login1.jpg";
import { Button, Form, notification, Input } from "antd";
import { loginUser } from "../backend-api/Auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (data) => {
    console.log("Form data:", data);
    setIsLoading(true);

    try {
      const result = await loginUser(data);
      if (result?.data?.token) {
        localStorage.setItem("token", result.data.token);
      }
      console.log("Login result:", result.data.token);
      notification.success({
        message: "Login Successful",
        description: "Logged in successfully.",
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description:
          error?.non_field_errors[0] || "There was an issue. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img src={LoginImg} alt="Fitness" className="h-full object-cover" />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Login to Your Account
          </h1>

          <Form className="space-y-6" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="Enter Your Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter Your Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full flex justify-center py-2 px-4"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Link to Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
