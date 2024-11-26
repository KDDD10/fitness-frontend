import React from "react";
import { Form, Input, Button, message } from "antd";

const PasswordResetPage = () => {
  // Form submission handler
  const onFinish = (values) => {
    message.success(`Password reset link sent to: ${values.email}`);
    // Here you would typically handle the actual password reset logic with a backend API
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please enter a valid email address.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Form Title */}
        <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>

        {/* Password Reset Form */}
        <Form
          name="password_reset"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-6"
        >
          {/* Email Input */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email address",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 px-4 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Send Password Reset Link
            </Button>
          </Form.Item>
        </Form>

        {/* Go Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
