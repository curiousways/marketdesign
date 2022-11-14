import React from "react";

const CartPlus = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black w-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="6" cy="19" r="2"></circle>
      <circle cx="17" cy="19" r="2"></circle>
      <path d="M17 17h-11v-14h-2"></path>
      <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13"></path>
      <path d="M15 6h6m-3 -3v6"></path>
    </svg>
  );
};

export default CartPlus;