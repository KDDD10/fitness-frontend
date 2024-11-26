import React from "react";
import { Row, Col, Input, Button, Form, Select, Radio, Divider } from "antd";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const { Option } = Select;

const CheckOut = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Navigation />
      <PageHeader heading="Checkout" />
      <div className="px-4 py-6 md:px-16">
        <Form
          name="checkoutForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            {/* Shipping Address Section */}
            <Col xs={24} md={12}>
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input placeholder="123 Main Street" />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input placeholder="New York" />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  { required: true, message: "Please enter your postal code" },
                ]}
              >
                <Input placeholder="10001" />
              </Form.Item>
            </Col>

            {/* Payment Information Section */}
            <Col xs={24} md={12}>
              <h2 className="text-xl font-semibold">Payment Information</h2>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[
                  { required: true, message: "Please enter your card number" },
                ]}
              >
                <Input placeholder="xxxx xxxx xxxx xxxx" />
              </Form.Item>

              <Form.Item
                label="Cardholder Name"
                name="cardHolderName"
                rules={[
                  {
                    required: true,
                    message: "Please enter the cardholder name",
                  },
                ]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Expiry Date"
                    name="expiryDate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the expiry date",
                      },
                    ]}
                  >
                    <Input placeholder="MM/YY" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                      { required: true, message: "Please enter your CVV" },
                    ]}
                  >
                    <Input.Password placeholder="123" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Payment Method Section */}
              <Form.Item
                label="Payment Method"
                name="paymentMethod"
                rules={[
                  { required: true, message: "Please select a payment method" },
                ]}
              >
                <Radio.Group>
                  <Radio value="creditCard">Credit Card</Radio>
                  <Radio value="paypal">PayPal</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Order Summary Section */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="flex justify-between items-center">
                <p>Product 1</p>
                <p>$100</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Product 2</p>
                <p>$50</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Shipping</p>
                <p>$10</p>
              </div>
              <Divider />
              <div className="flex justify-between items-center font-bold">
                <p>Total</p>
                <p>$160</p>
              </div>
            </Col>

            {/* Confirmation Button */}
            <Col xs={24} md={12} className="flex items-center justify-end">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full md:w-auto"
                size="large"
              >
                Confirm and Pay
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;
