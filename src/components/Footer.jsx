import React from "react";
import { Row, Col, Input, Button } from "antd";

const Footer = () => {
  return (
    <div className="relative bottom-0 left-0 w-full bg-[#3b60ff] mb-0">
      <div className="h-auto px-6 md:px-16 py-6">
        <Row gutter={[20, 20]}>
          {/* Stay Connected Section */}
          <Col xs={24} md={8}>
            <div>
              <p className="text-white text-xl md:text-2xl font-semibold uppercase">
                Stay Connected!
              </p>
              <p className="text-white">
                Subscribe to get special offers, News and more.
              </p>
              <div className="flex flex-col md:flex-row md:justify-between gap-3 pt-3">
                <Input placeholder="example@mail.com" className="flex-1" />
                <Button className="text-[#3b60ff] uppercase font-bold">
                  Subscribe
                </Button>
              </div>
            </div>
          </Col>

          {/* Company Section */}
          <Col xs={12} md={8}>
            <p className="text-white text-lg font-semibold uppercase px-2">
              Company
            </p>
            <div className="px-2 pt-2">
              <p className="text-base text-white uppercase hover:text-black cursor-pointer">
                Exercise
              </p>
              <p className="text-base text-white uppercase hover:text-black cursor-pointer">
                Nutrition
              </p>
              <p className="text-base text-white uppercase hover:text-black cursor-pointer">
                Shop
              </p>
              <p className="text-base text-white uppercase hover:text-black cursor-pointer mb-0">
                Community
              </p>
            </div>
          </Col>

          {/* Useful Links Section */}
          <Col xs={12} md={8}>
            <h2 className="text-white text-lg font-semibold uppercase px-2">
              Useful Links
            </h2>
            <div className="px-2 pt-3">
              <p className="text-base text-white uppercase hover:text-black cursor-pointer">
                Privacy Policy
              </p>
              <p className="text-base text-white uppercase hover:text-black cursor-pointer">
                Return and Change
              </p>
              <p className="text-base text-white uppercase hover:text-black cursor-pointer">
                Help Center
              </p>
              <p className="text-base text-white uppercase hover:text-black cursor-pointer mb-0">
                Accessibility
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* Footer Bottom Text */}
      <div>
        <p className="text-center text-white font-normal mb-0 py-4">
          © 2024 All Rights Reserved - Fitness
        </p>
      </div>
    </div>
  );
};

export default Footer;
