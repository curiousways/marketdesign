import React from "react";

const BalanceIcon = () => {
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
      <line x1="7" y1="20" x2="17" y2="20"></line>
      <path d="M6 6l6 -1l6 1"></path>
      <line x1="12" y1="3" x2="12" y2="20"></line>
      <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0"></path>
      <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0"></path>
    </svg>
  );
};

export default BalanceIcon;
