import React from "react";

const CartIcon = (props) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
      stroke={props.color}
      strokeWidth="1.5"
    />
    <path
      d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
      stroke={props.color}
      strokeWidth="1.5"
    />
    <path
      d="M2.75 3.5H5.25L7.03361 14.2338C7.10534 14.6734 7.35743 15.0645 7.73213 15.3315C8.10682 15.5985 8.57952 15.7242 9.05361 15.6779H17.4603C17.9344 15.7242 18.4071 15.5985 18.7818 15.3315C19.1565 15.0645 19.4086 14.6734 19.4803 14.2338L20.75 6.5H5.25"
      stroke={props.color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CartIcon;
