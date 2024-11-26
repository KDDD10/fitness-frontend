import React, { useState, useEffect } from "react";
import Logo from "../images/logo.png";
import CartIcon from "../images/svg/CartIcon";
import ProfileCircleIcon from "../images/svg/ProfileCircleIcon";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { fetchCartItems } from "../backend-api/CartApi";
import { Badge } from "antd";

const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    loadCart();
  }, []);

  return (
    <div className="w-full bg-[#3b60ff] cursor-pointer">
      <div className="flex justify-between items-center h-16 flex-wrap text-white px-4 md:px-4 lg:px-16">
        {/* Logo Section */}
        <div onClick={() => navigate("/")} className="flex items-center">
          <img src={Logo} alt="logo" className="h-[60px]" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <Icon icon="mdi:menu" className="text-3xl" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex justify-center items-center">
          <div className="px-5">
            <p
              onClick={() => navigate("/exercise")}
              className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
            >
              Exercise
            </p>
          </div>
          <div className="px-5">
            <p
              onClick={() => navigate("/nutrition")}
              className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
            >
              Nutrition
            </p>
          </div>
          <div className="px-5">
            <p
              onClick={() => navigate("/shop")}
              className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
            >
              Shop
            </p>
          </div>
          <div className="px-5">
            <p
              onClick={() => navigate("/subscriptions")}
              className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
            >
              Subscriptions
            </p>
          </div>
          <div className="px-5">
            <p
              onClick={() => navigate("/community")}
              className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
            >
              Community
            </p>
          </div>
        </div>

        {/* Cart and Profile Icons */}
        <div className="flex items-center gap-4">
          <div onClick={() => navigate("/profile")} className="hover:scale-75">
            <ProfileCircleIcon />
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <Badge count={cartItems.length} offset={[8, 10]} showZero={false}>
              <CartIcon color="white" />
            </Badge>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#3b60ff] text-white py-4 px-4 flex flex-col items-start space-y-4">
          <p
            onClick={() => {
              navigate("/exercise");
              toggleMobileMenu();
            }}
            className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
          >
            Exercise
          </p>
          <p
            onClick={() => {
              navigate("/nutrition");
              toggleMobileMenu();
            }}
            className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
          >
            Nutrition
          </p>
          <p
            onClick={() => {
              navigate("/shop");
              toggleMobileMenu();
            }}
            className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
          >
            Shop
          </p>
          <p
            onClick={() => {
              navigate("/subscriptions");
              toggleMobileMenu();
            }}
            className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
          >
            Subscriptions
          </p>
          <p
            onClick={() => {
              navigate("/community");
              toggleMobileMenu();
            }}
            className="text-base font-semibold tracking-wide uppercase hover:text-black mb-0"
          >
            Community
          </p>
        </div>
      )}
    </div>
  );
};

export default Navigation;
